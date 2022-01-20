import {common} from '@comigo/ui-shared-components'
import { LocationMarkerIcon, TruckIcon, UserIcon } from '@heroicons/react/outline';
import Switch from '../common/Form/Switch';

/* eslint-disable-next-line */
export interface CardVehicleProps {
  placa: string;
  travelTime: string
  statusVehicle: string;
  addressName: string;
  driverName: string;
  velocity: number ;
  className?: string
}

export function CardVehicle({placa,travelTime,statusVehicle, addressName,driverName,velocity,className}: CardVehicleProps) {
  let statsColor:string
  let velocityColor:string

  switch(statusVehicle){
    case 'Ligado':
      statsColor = 'bg-green-500'
      break
    case 'Parado':
      statsColor = 'bg-blue-500'
        break
    case 'Desligado':
      statsColor = 'bg-gray-500'
      break
    default: 
      statsColor = 'bg-gray-500'
      break
  }

  if(velocity === 0){
    velocityColor = 'gray'
  }else if(velocity >= 80){
    velocityColor = 'red'
  }else{
    velocityColor = 'blue'
  }

  return (
    <common.Card  className={`hover:bg-gray-200 bg-gray-100 my-4 p-2 text-gray-600 ${className}`}>
      <div className="grid grid-cols-12" >
        <div className="col-span-2 flex items-center justify-center relative">
          <span className={`w-3 h-3 ${statsColor} rounded-full absolute -ml-16`}/>
          <TruckIcon className="w-5 h-5 " />
        </div>
        <div className="col-span-5 flex items-start justify-self-center  flex-col">
          <span className="text-sm">Placa</span>
          <span className="font-medium text-gray-900">{placa}</span>
        </div>
        <div className="col-span-5 flex items-start justify-self-center flex-col">
          <span className="text-sm">Em trânsito há</span>
          <span className="font-medium text-gray-900">{travelTime}</span>
        </div>
      </div>
      <common.Separator className=""/>
      <div className="">
        <div className="flex items-start justify-self-center ">
          <LocationMarkerIcon className="w-8 h-8 mx-2" />
          <span className="text-sm" >{addressName}</span>
        </div>
        <div className='flex justify-between mt-2'>
          <div className="flex items-center justify-center">
            <UserIcon className="w-5 h-5 mx-2" />
            <span className="text-sm">{driverName}</span>
          </div>
          <div className="flex items-center justify-center">
            <span className={`text-sm ring-1 text-${velocityColor}-500 ring-${velocityColor}-500 px-2 rounded-sm bg-${velocityColor}-100 font-semibold`}> {velocity} km/h</span>
          </div>
        </div>
      </div>
    </common.Card>
  );
}

export default CardVehicle;
