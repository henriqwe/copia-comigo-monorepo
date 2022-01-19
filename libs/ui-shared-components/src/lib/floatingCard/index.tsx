/* eslint-disable-next-line */
import { LocationMarkerIcon, MinusIcon, PlusIcon, TruckIcon, UserIcon} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
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
export interface FloatingCardProps {
  allUserVehicle:vehicle[]
  schemaYup: any
}

export function FloatingCard({allUserVehicle,schemaYup }:FloatingCardProps) {
  const [open,setOpen] = useState(true)
  const [titleFilter, setTitleFilter] = useState('Em trânsito')

  const  [vehiclesInTransit,setVehiclesInTransit] = useState<vehicle[]>([])
  const  [vehiclesStopped,setVehiclesStopped] = useState<vehicle[]>([])
  const  [vehiclesOff,setVehiclesOff] = useState<vehicle[]>([])
  const  [shearchVehicle,setShearchVehicle] = useState<vehicle[]>([...allUserVehicle])
  const  [inputSearchValue,setInputSearchValue] = useState('')

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
      .includes(inputSearchValue.toUpperCase()) )
     return vehicle
  })
    setShearchVehicle(filter)
  },[inputSearchValue])

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
      {open && 
      (<>
          <div className=''>
            <div className="px-3 py-2 bg-gray-100">
              <div className='ring-1 ring-gray-300 rounded-sm'>
                <common.Form.Input
                  fieldName='Veículos'
                  title="Pesquise o veiculo aqui"
                  onChange={(e)=>{setInputSearchValue(e.target.value)}}
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
            <SeparatorWithTitleAndNumber title={'Em trânsito'} number={vehiclesInTransit.length}/>

                {vehiclesInTransit.length > 0 && 
                vehiclesInTransit.map(vehicle => {
                  return(
                    <CardVehicle 
                        placa={vehicle.placa!} 
                        addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Ligado" 
                        driverName='Claudio H. A. A.' 
                        velocity={Math.floor(Number(vehicle.speed))}  
                        travelTime="1h 13min"/>
                  )
                })}
              
             
            <SeparatorWithTitleAndNumber title={'Parado'} number={vehiclesStopped.length}/>
            {vehiclesStopped.length > 0 && 
                vehiclesStopped.map(vehicle => {
                  return(
                    <CardVehicle 
                        placa={vehicle.placa!} 
                        addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Parado" 
                        driverName='Claudio H. A. A.' 
                        velocity={Math.floor(Number(vehicle.speed))}  
                        travelTime="1h 13min"/>
                  )
                })}
            <SeparatorWithTitleAndNumber title={'Desligado'} number={vehiclesOff.length}/>
            {vehiclesOff.length > 0 && 
                vehiclesOff.map(vehicle => {
                  return(
                    <CardVehicle 
                        placa={vehicle.placa!} 
                        addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Desligado" 
                        driverName='Claudio H. A. A.' 
                        velocity={Math.floor(Number(vehicle.speed))}  
                        travelTime="1h 13min"/>
                  )
                })}
                 
          </div>
      </>)
      }
      
      <div>

      </div>
    </aside>
  );
}

export default FloatingCard;
