/* eslint-disable-next-line */
import { ChevronLeftIcon, ClockIcon, ExclamationIcon, LocationMarkerIcon, MapIcon, MinusIcon, PlusIcon, TruckIcon, UserIcon} from "@heroicons/react/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {common,SeparatorWithTitleAndNumber, CardVehicle} from '@comigo/ui-shared-components'

type vehicle={
  crs: string
  data: string
  dist: string
  latitude: string
  ligado: number
  longitude: string
  speed: string
  carro_id?: number
  placa?: string
  chassis?: string
  renavan?: string
  ano_modelo?: string
  cor?: string
  veiculo?: string
  carro_fabricante?: string
  carro_categoria?: string
  carro_tipo?: string
  combustivel?: string
  ano?: string
  frota?: string
  imei?: string
  date_rastreador?: string
}
type pagAllVehiclesProps ={
  inputSearchValue: string
  setInputSearchValue: Dispatch<SetStateAction<string>>
  titleFilter: string
  setTitleFilter:Dispatch<SetStateAction<string>>
  vehiclesInTransit: vehicle[]
  vehiclesStopped: vehicle[]
  vehiclesOff: vehicle[]
  setPageCard: Dispatch<SetStateAction<string>>
  setSelectedVehicle: Dispatch<SetStateAction<vehicle | undefined>>
}
type pagVehiclesDetailsProps ={
  setInputSearchValue: Dispatch<SetStateAction<string>>
  setPageCard: Dispatch<SetStateAction<string>>
  selectedVehicle:  vehicle | undefined
  consultVehicleHistoric: (carro_id: string, inicio: string, fim: string) => void
  vehicleConsultData: vehicle
  getStreetNameByLatLng: Promise<unknown>
  dadosEnd:string
}
export interface FloatingCardProps {
  allUserVehicle:vehicle[]
  schemaYup: any
  consultVehicleHistoric: (carro_id: string, inicio: string, fim: string) => void
  vehicleConsultData: vehicle
  getStreetNameByLatLng: Promise<unknown>
  selectedVehicle: vehicle | undefined
  setSelectedVehicle: Dispatch<SetStateAction<vehicle | undefined>>
}

export function FloatingCard({allUserVehicle,schemaYup,consultVehicleHistoric,vehicleConsultData,getStreetNameByLatLng,selectedVehicle,setSelectedVehicle }:FloatingCardProps) {
  const [open,setOpen] = useState(true)
  const [titleFilter, setTitleFilter] = useState('Em trânsito')

  const  [vehiclesInTransit,setVehiclesInTransit] = useState<vehicle[]>([])
  const  [vehiclesStopped,setVehiclesStopped] = useState<vehicle[]>([])
  const  [vehiclesOff,setVehiclesOff] = useState<vehicle[]>([])
  const  [shearchVehicle,setShearchVehicle] = useState<vehicle[]>([...allUserVehicle])
  const  [inputSearchValue,setInputSearchValue] = useState('')
  const  [pageCard,setPageCard] = useState('pagAllVehicles')
  const  [dadosEnd, setDadosEnd] = useState('')

  useEffect(() => {
    setShearchVehicle([...allUserVehicle])
  },[allUserVehicle])

  useEffect(() => {
    const vehiclesInTransitFilter:vehicle[] = []
    const vehiclesStoppedFilter:vehicle[] = []
    const vehiclesOffFilter:vehicle[] = []

    shearchVehicle.forEach((vehicle)=>{
      if(vehicle.ligado === 1 && Number(vehicle.speed) >0){
        vehiclesInTransitFilter.push(vehicle) 
      }else if(vehicle.ligado === 1 && Number(vehicle.speed) < 1){
        vehiclesStoppedFilter.push(vehicle)
      }else if(vehicle.ligado === 0 ){
        vehiclesOffFilter.push(vehicle)
         
      }
      
    })
    setVehiclesInTransit(vehiclesInTransitFilter)
    setVehiclesStopped(vehiclesStoppedFilter)
    setVehiclesOff(vehiclesOffFilter)

  },[shearchVehicle])

  useEffect(() => {
    if(inputSearchValue===''){
      setShearchVehicle([...allUserVehicle])
      return
    }
    const filter = allUserVehicle.filter((vehicle) => 
    {if(vehicle.placa?.toUpperCase()
      .includes(inputSearchValue.toUpperCase()) ){
        return vehicle
      }
      return
  })
  console.log(filter)
    setShearchVehicle(filter)
  },[inputSearchValue])

  useEffect(() => {},[selectedVehicle])
  async function getStreetName(vehicle: vehicle) {
    const response = await getStreetNameByLatLng(
      vehicle.latitude,
      vehicle.longitude
    )

    setDadosEnd(response.results[0].formatted_address)
  }
 
  useEffect(() => {
    if (selectedVehicle) {
      getStreetName(selectedVehicle)
      setPageCard('pagVehiclesDeatils')
    }
  }, [selectedVehicle])

  return (
    <aside className={`flex flex-col w-full ${open?'h-full':'h-10'} bg-white rounded-sm`}>
      <div className={`flex bg-gray-900 h-10 w-full p-4 items-center  ${open?'rounded-t-sm':'rounded-sm'}  text-gray-100 justify-between`}>
        <LocationMarkerIcon className="w-5 h-5 text-gray-100 " />
        <span className="text-sm">Veículos em tempo real</span>
        <span className="text-sm bg-gray-800 px-2 rounded-full">{allUserVehicle ? allUserVehicle.length : 0 }</span>
        <button onClick={()=>{setOpen(!open)}}>
          {open ?
          <MinusIcon className="w-5 h-5 text-gray-100 " />
          : 
          <PlusIcon className="w-5 h-5 text-gray-100 " />}
        </button>
      </div>
      {open && (
        pageCard === 'pagAllVehicles'?
          (
            pagAllVehicles({inputSearchValue,setInputSearchValue,titleFilter,setTitleFilter,vehiclesInTransit,vehiclesStopped,vehiclesOff,setPageCard,setSelectedVehicle})
            
          ):
          pageCard === 'pagVehiclesDeatils'?
          (
            pagVehiclesDetails({setInputSearchValue,setPageCard,selectedVehicle,consultVehicleHistoric,vehicleConsultData,getStreetNameByLatLng,dadosEnd})
          ):''
          
        )
      }
    </aside>
  );
}

function pagAllVehicles({inputSearchValue,setInputSearchValue,titleFilter,setTitleFilter,vehiclesInTransit,vehiclesStopped,vehiclesOff,setPageCard,setSelectedVehicle} :pagAllVehiclesProps){
  return(
    <>
          <div className=''>
            <div className="px-3 py-2 bg-gray-100">
              <div className='ring-1 ring-gray-300 rounded-sm'>
                <common.Form.Input
                  fieldName='Veículos'
                  title="Pesquise o veiculo aqui"
                  onChange={(e)=>{setInputSearchValue(e.target.value)}}
                  value={inputSearchValue}
                />
              </div>  
            </div>
            <div className="flex items-center justify-between px-3 py-1 bg-gray-100">
              <span className="text-sm text-gray-600" >Ordenar por</span>
              <common.Dropdown
                title={titleFilter}
                titleClassName="text-sm"
                handler={(e)=>{setTitleFilter(e)}}
                items={[
                  'Em trânsito',
                  'Parado',
                  'Desligado'
                ]}
              />
              
            </div>
          </div>
          <div className="flex-1 px-3 py-2 overflow-y-scroll">
            <SeparatorWithTitleAndNumber className='my-2' title={'Em trânsito'} number={vehiclesInTransit.length}/>
              {vehiclesInTransit.length > 0 && 
                vehiclesInTransit.map(vehicle => {
                  return(
                    <div onClick={()=>{
                      setPageCard('pagVehiclesDeatils')
                      setSelectedVehicle(vehicle)
                      }}>
                      <CardVehicle 
                          placa={vehicle.placa!} 
                          addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Ligado" 
                          driverName='Claudio H. A. A.' 
                          velocity={Math.floor(Number(vehicle.speed))}  
                          travelTime="1h 13min"
                          className='cursor-pointer'/>
                    </div>
                  )
                })}
            <SeparatorWithTitleAndNumber className='my-2' title={'Parado'} number={vehiclesStopped.length}/>
              {vehiclesStopped.length > 0 && 
                vehiclesStopped.map(vehicle => {
                  return(
                    <div onClick={()=>{setPageCard('pagVehiclesDeatils')
                    setSelectedVehicle(vehicle)}}>
                      <CardVehicle 
                          placa={vehicle.placa!} 
                          addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Parado" 
                          driverName='Claudio H. A. A.' 
                          velocity={Math.floor(Number(vehicle.speed))}  
                          travelTime="1h 13min"
                          className='cursor-pointer'/>
                    </div>
                  )
                })}
            <SeparatorWithTitleAndNumber className='my-2' title={'Desligado'} number={vehiclesOff.length}/>
              {vehiclesOff.length > 0 && 
                vehiclesOff.map(vehicle => {
                  return(
                    <div onClick={()=>{setPageCard('pagVehiclesDeatils')
                    setSelectedVehicle(vehicle)}}>
                      <CardVehicle 
                          placa={vehicle.placa!} 
                          addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Desligado" 
                          driverName='Claudio H. A. A.' 
                          velocity={Math.floor(Number(vehicle.speed))}  
                          travelTime="1h 13min"
                          className='cursor-pointer'/>
                    </div>
                  )
                })}
                 
          </div>
      </>
  )
}

function pagVehiclesDetails({setInputSearchValue,setPageCard, selectedVehicle,consultVehicleHistoric, vehicleConsultData,getStreetNameByLatLng,dadosEnd} :pagVehiclesDetailsProps){
  
  function currentDateAndTime(type = '') {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()
    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    if (type === 'onlyDate') return year + '-' + month + '-' + day + 'T00:00:00'

    let hour = date.getHours()
    let minute = date.getMinutes()
    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute

    return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00'
  }
   const onSubmit = (formData: FormData) => {
    formData.preventDefault();
    try {
      
      consultVehicleHistoric(
        selectedVehicle.carro_id.toString(),
        formData.target.dateStart.value,
        formData.target.dateEnd.value
      )
    } catch (err: any) {
      // showError(err)
      console.log(err)
    }
  }
  return(
    <>
          <div className=''>
            <div className="px-3 py-2 bg-gray-100">
              <div className='ring-1 ring-gray-300 rounded-sm'>
                <common.Form.Input
                  fieldName='Veículos'
                  title="Pesquise o veiculo aqui"
                  onChange={(e)=>{setInputSearchValue(e.target.value)}}
                  disabled
                  value={selectedVehicle?.placa}
                />
              </div>  
            </div>
            <div className="flex items-center justify-between px-3 py-1 bg-gray-100">
              <div className="mb-4">
              <div className="grid grid-flow-col w-full gap-2 mb-2">
                <form
                    onSubmit={(e)=>onSubmit(e)}
                    className="grid grid-cols-12"
                  >
              
                  <div className="col-span-12 mt-2">
                    <p>De:</p>
                    <input
                      type="datetime-local"
                      name='dateStart'
                      className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md w-full"
                      value={currentDateAndTime('onlyDate')}
                      max={currentDateAndTime()}
                      onChange={()=>'onChange'}
                    />
                  </div>
             
                  <div className="col-span-12 my-2">
                    <p>Até:</p>
                    <input
                      type="datetime-local"
                      name='dateEnd'
                      className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md w-full"
                      value={currentDateAndTime()}
                      max={currentDateAndTime()}
                      onChange={()=>'onChange'}
                    />
                  </div>
                
                  <div className='flex justify-between col-span-12'>
                      <button
                        onClick={() => {
                          setPageCard('pagAllVehicles')
                        }}
                        className=" justify-center items-center flex"
                      >
                        <ChevronLeftIcon
                          className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                          aria-hidden="true"
                        />{' '}
                        Voltar
                      </button>
                      <button
                      type='submit'
                      className="col-span-3 justify-center flex bg-gray-700 rounded-sm text-gray-200 px-2"
                      // disabled={pathsLoading}
                      // loading={pathsLoading}
                    >Consultar</button>
                  </div>
              
                  </form>
                
                </div>
              </div>
              
            </div>
          </div>
          <div className="flex-1 px-3 py-2 overflow-y-scroll">
          {selectedVehicle && (
        <div className="w-full mt-4">
          <div className="flex justify-between items-center">
            <p className="font-black text-lg">Informações sobre o veículo</p>
            <button
              // href={`/erp/monitoramento/trajetos/${vehicleConsultData.carro_id}?placa=${vehicleConsultData.placa}`}
            >
              <button
                value="Ver trajeto"
                className="col-span-3 justify-center flex"
              />
            </button>
          </div>

          <p>
            <b className='text-sm'>Última atualização:</b>{' '}
            <span className='text-sm'>
            {new Date(selectedVehicle.date_rastreador).toLocaleDateString(
              'pt-br',
              {
                dateStyle: 'short'
              }
            )}{' '}
            {new Date(selectedVehicle.date_rastreador).toLocaleTimeString(
              'pt-br',
              {
                timeStyle: 'medium'
              }
            )}</span>
          </p>
          <div className="relative mt-5 report-timeline">
            <common.ListCard
              icon={<ExclamationIcon className="w-6 h-6" />}
              title={'Placa'}
              description={<p>{selectedVehicle.placa}</p>}
            />
            <common.ListCard
              icon={<LocationMarkerIcon className="w-6 h-6" />}
              title={'Velocidade'}
              description={
                <p>{Math.floor(Number(selectedVehicle.speed)) + ' Km/H'}</p>
              }
            />
            <common.ListCard
              icon={<ClockIcon className="w-6 h-6" />}
              title={'Ignição'}
              description={
                <div>
                  <p>{selectedVehicle.ligado ? 'Ligado' : 'Desligado'}</p>
                </div>
              }
            />
            <common.ListCard
              icon={<MapIcon className="w-6 h-6" />}
              title={'Endereço'}
              description={
                dadosEnd ? <span>{dadosEnd}</span> : <span>Buscando...</span>
              }             
            />
          </div>
        </div>
      )}
          </div>
      </>
  )
}

export default FloatingCard;
