/* eslint-disable-next-line */
import { ChevronLeftIcon, ClockIcon, ExclamationIcon, LocationMarkerIcon, MapIcon, MinusIcon, PlusIcon, SearchIcon, TruckIcon, UserIcon} from "@heroicons/react/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {common,SeparatorWithTitleAndNumber, CardVehicle} from '@comigo/ui-shared-components'

type coordsToCenterMap = {
  lat?: number;
  lng?: number;
  carro_id?: number;
}
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
  vehicleConsultData: vehicle[]
  getStreetNameByLatLng: Promise<unknown>
  dadosEnd:string
  setCoordsToCenterPointInMap: Dispatch<SetStateAction<coordsToCenterMap>>
  moreDetails: boolean
  setMoreDetails:Dispatch<SetStateAction<boolean>>
  showAllVehiclesInMap:()=>void
  dateStart: string
  setDateStart: Dispatch<SetStateAction<string>>
  dateEnd: string
  setDateEnd: Dispatch<SetStateAction<string>>
}
export interface FloatingCardProps {
  allUserVehicle:vehicle[]
  schemaYup: any
  consultVehicleHistoric: (carro_id: string, inicio: string, fim: string) => void
  vehicleConsultData: vehicle[]
  getStreetNameByLatLng: Promise<unknown>
  selectedVehicle: vehicle | undefined
  setSelectedVehicle: Dispatch<SetStateAction<vehicle | undefined>>
  setCoordsToCenterPointInMap: Dispatch<SetStateAction<coordsToCenterMap>>
  showAllVehiclesInMap: ()=>void
}

export function FloatingCard({allUserVehicle,schemaYup,consultVehicleHistoric,vehicleConsultData,getStreetNameByLatLng,selectedVehicle,setSelectedVehicle,setCoordsToCenterPointInMap,showAllVehiclesInMap}:FloatingCardProps) {
  const [open,setOpen] = useState(true)
  const [titleFilter, setTitleFilter] = useState('Em trânsito')

  const  [vehiclesInTransit,setVehiclesInTransit] = useState<vehicle[]>([])
  const  [vehiclesStopped,setVehiclesStopped] = useState<vehicle[]>([])
  const  [vehiclesOff,setVehiclesOff] = useState<vehicle[]>([])
  const  [shearchVehicle,setShearchVehicle] = useState<vehicle[]>([...allUserVehicle])
  const  [inputSearchValue,setInputSearchValue] = useState<string|undefined>(undefined)
  const  [pageCard,setPageCard] = useState('pagAllVehicles')
  const  [dadosEnd, setDadosEnd] = useState('')
  const  [moreDetails, setMoreDetails] = useState(false)
  const  [dateStart,setDateStart]= useState(currentDateAndTime('onlyDate'))
  const  [dateEnd,setDateEnd]= useState(currentDateAndTime(''))

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

  async function getStreetName(vehicle: vehicle) {
    const response = await getStreetNameByLatLng(
      vehicle.latitude,
      vehicle.longitude
    )

    setDadosEnd(response.results[0].formatted_address)
  }
  function filterVehicles(){
    if(inputSearchValue==='' ||inputSearchValue === undefined){
      setShearchVehicle([...allUserVehicle])
      return
    }
    const filter = allUserVehicle.filter((vehicle) => 
    {if(vehicle.placa?.toUpperCase()
      .includes(inputSearchValue?.toUpperCase()) ){
        return vehicle
      }
      return
    })
    setShearchVehicle(filter)
  }
  useEffect(() => {
    setShearchVehicle([...allUserVehicle])
    if(inputSearchValue != ''){
      filterVehicles()
    }
  },[allUserVehicle])

  useEffect(() => {
    const vehiclesInTransitFilter:vehicle[] = []
    const vehiclesStoppedFilter:vehicle[] = []
    const vehiclesOffFilter:vehicle[] = []

    shearchVehicle.forEach((vehicle)=>{
      if(vehicle.ligado === 1 && Number(vehicle.speed) >= 1){
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
    filterVehicles()
  },[inputSearchValue])
 
  useEffect(() => {
    if (selectedVehicle) {
      getStreetName(selectedVehicle)
      setPageCard('pagVehiclesDeatils')
      setMoreDetails(false)
    }
  }, [selectedVehicle])

  return (
    <aside className={`flex flex-col w-full ${open?'h-full':'h-10'} bg-white rounded-sm`}>
      <div className={`flex bg-gray-900 h-10 w-full p-4 items-center  ${open?'rounded-t-sm':'rounded-sm'}  text-gray-100 justify-between`}>
        <LocationMarkerIcon className="w-5 h-5 text-gray-100 " />
        <div>
          <span className="text-sm ">Veículos</span>
          <span className="text-sm ml-2 bg-gray-800 px-2 rounded-full">{allUserVehicle ? allUserVehicle.length : 0 }</span>
        </div>
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
            pagVehiclesDetails({setInputSearchValue,setPageCard,selectedVehicle,consultVehicleHistoric,vehicleConsultData,getStreetNameByLatLng,dadosEnd,setCoordsToCenterPointInMap,moreDetails, setMoreDetails,showAllVehiclesInMap,dateStart,setDateStart,dateEnd,setDateEnd})
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
            <div className="px-3 py-3 bg-gray-100">
              <div className='ring-1 ring-gray-300 rounded-sm'>
                <common.Form.Input
                  fieldName='Veículos'
                  title="Pesquise o veiculo aqui"
                  onChange={(e)=>{setInputSearchValue(e.target.value)}}
                />
              </div>  
            </div>
            {/* <div className="flex items-center justify-between px-3 py-1 bg-gray-100">
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
              
            </div> */}
          </div>
          <div className="flex-1 px-3 py-2 overflow-y-scroll">
              {vehiclesInTransit.length > 0 && 
                vehiclesInTransit.map((vehicle) => {
                  return(
                    <div key={vehicle.carro_id} onClick={()=>{
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
              {vehiclesStopped.length > 0 && 
                vehiclesStopped.map(vehicle => {
                  return(
                    <div key={vehicle.carro_id} onClick={()=>{setPageCard('pagVehiclesDeatils')
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
              {vehiclesOff.length > 0 && 
                vehiclesOff.map(vehicle => {
                  return(
                    <div key={vehicle.carro_id} onClick={()=>{setPageCard('pagVehiclesDeatils')
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
              {vehiclesOff.length === 0 && vehiclesStopped.length === 0 && vehiclesInTransit.length === 0 &&
                  <div className="w-full flex justify-center mt-4">
                   <common.EmptyContent />
                  </div>
              }
          </div>
      </>
  )
}

function pagVehiclesDetails({setInputSearchValue,setPageCard,selectedVehicle,consultVehicleHistoric,vehicleConsultData,getStreetNameByLatLng,dadosEnd,setCoordsToCenterPointInMap,moreDetails, setMoreDetails,showAllVehiclesInMap,dateStart,setDateStart,dateEnd,setDateEnd} :pagVehiclesDetailsProps){
  
  
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
  function filterConsult(item: string) {
    let result: vehicle[]
    switch (item) {
      case 'Visualizar todos':
        // setVehicleConsultDataFiltered(vehicleConsultData)
        break
      case 'Eventos de velocidade':
        result = vehicleConsultData?.filter((vehicle) => {
          if (Number(vehicle.speed) > 80) {
            return vehicle
          }
        })
        // setVehicleConsultDataFiltered(result)
        break
      case 'Ignição ligada e parado':
        result = vehicleConsultData?.filter((vehicle) => {
          if (Number(vehicle.speed) < 1 && vehicle.ligado === 1) {
            return vehicle
          }
        })
        // setVehicleConsultDataFiltered(result)

        break
    }
  }
  
  return(
    <>
          <div className=''>
            <div className="px-3 py-2 bg-gray-100 flex justify-between">
              <common.TitleWithSubTitleAtTheTop
                title={selectedVehicle?.placa!}
                subtitle="Placa"
              />
              <common.TitleWithSubTitleAtTheTop
                title={`${new Date(selectedVehicle.date_rastreador).toLocaleDateString(
                  'pt-br',
                  {
                    dateStyle: 'short'
                  }
                )} 
                ${new Date(selectedVehicle.date_rastreador).toLocaleTimeString(
                  'pt-br',
                  {
                    timeStyle: 'medium'
                  }
                )}`}
                subtitle="Última atualização"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-1 bg-gray-100">
              <div className="mb-1 w-full">
                <div className="grid grid-flow-col w-full gap-2 mb-2 ">
                <form
                    onSubmit={(e)=>{
                      onSubmit(e)
                      setMoreDetails(true)
                    }}
                    className="grid grid-cols-12"
                  >
              
                  <div className="flex col-span-12 my-1 ">
                    <p className=" flex items-center mr-2">De:</p>
                    <input
                      type="datetime-local"
                      name='dateStart'
                      className="bg-gray-200 col-span-10 dark:bg-gray-700 p-2 rounded-md w-full"
                      value={dateStart}
                      max={dateEnd}
                      onChange={(e)=>setDateStart(e.target.value)}
                    />
                  </div>
             
                  <div className="flex col-span-12 my-1">
                    <p className="flex items-center justify-end pr-1">Até:</p>
                    <input
                      type="datetime-local"
                      name='dateEnd'
                      className="col-span-10 bg-gray-200 dark:bg-gray-700 p-2 rounded-md w-full"
                      value={dateEnd}
                      max={dateEnd}
                      onChange={(e)=>setDateEnd(e.target.value)}
                    />
                  </div>
                
                  <div className='flex justify-between col-span-12 mt-4'>
                      <button
                        onClick={() => {
                          setPageCard('pagAllVehicles')
                          showAllVehiclesInMap()
                        }}
                        className=" justify-center items-center flex"
                      >
                        <ChevronLeftIcon
                          className="w-5 h-5  text-violet-200 hover:text-violet-100"
                          aria-hidden="true"
                        />{' '}
                        Voltar
                      </button>
                      <button
                      type='submit'
                      className="col-span-3 justify-center items-center flex bg-gray-700 rounded-sm text-gray-200 px-2 py-1"
                      // disabled={pathsLoading}
                      // loading={pathsLoading}
                    > <SearchIcon className="w-5 h-5 text-gray-200"/></button>
                  </div>
              
                  </form>
                
                </div>
              </div>
              
            </div>
          </div>
          <div className="flex-1 px-3 py-2 overflow-y-scroll">
          {!moreDetails ? (
              <div className="w-full mt-4">
                <div className="relative mt-5 report-timeline">
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
          ): 
          (<div>
              <div className='flex justify-between'>
             
                      <button
                        onClick={() => {
                          setMoreDetails(false)
                        }}
                        className=" justify-center flex bg-gray-700 rounded-sm text-gray-200 px-2 items-center"
                      >
                        <MinusIcon
                          className="w-3 h-3 text-violet-200 hover:text-violet-100 mr-2"
                          aria-hidden="true"
                        />{'  '}
                        <span className='text-xs'> Exibir menos</span>
                      </button>
                      <common.Dropdown
                          title={'Filtro'}
                          handler={filterConsult}
                          items={[
                            'Visualizar todos',
                            'Eventos de velocidade',
                            'Ignição ligada e parado'
                          ]}
                        />
                 
              </div>
              {vehicleConsultData?.length !== 0 ? (
                <div className="relative mt-5 report-timeline">
                  {vehicleConsultData?.map((vehicle, index) => {
                    return (
                      <common.VehicleCard
                        key={index}
                        vehicle={vehicle}
                        description={
                          <div>
                            <p>Situação: {vehicle.speed}</p>
                          </div>
                        }
                        setCoordsToCenterPointInMap={setCoordsToCenterPointInMap}
                        getStreetNameByLatLng={getStreetNameByLatLng}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="w-full flex justify-center mt-4">
                  <common.EmptyContent />
                </div>
              )}
            </div>)}
          </div>
    </>
  )
}

export default FloatingCard;
