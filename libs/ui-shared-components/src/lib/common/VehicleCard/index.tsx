import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

type coordsToCenterMap = {
  latitude?: number;
  longitude?: number;
  carro_id?: number;
}
type vehicle = {
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
type VehicleCardProps = {
  description?: ReactNode
  vehicle: vehicle
  setCoordsToCenterPointInMap:Dispatch<SetStateAction<coordsToCenterMap>>
  addressData:string
}

export default function VehicleCard({
  description,
  vehicle,
  setCoordsToCenterPointInMap,
  addressData
}: VehicleCardProps) {
  // TODO: Refatorar estilo dos before's para não sobrepor a imagem
  let borderColor = 'border-black'
  let title = 'Ligado'
  if (Number(vehicle.speed) > 80) {
    borderColor = 'border-red-500'
    title = 'Evento de velocidade'
  } else if (Number(vehicle.speed).toFixed() === '0' && vehicle.ligado === 0) {
    borderColor = 'border-gray-500'
    title = 'Desligado'
  } else if (Number(vehicle.speed).toFixed() === '0' && vehicle.ligado === 1) {
    borderColor = 'border-blue-500'
    title = 'Parado'
  }

  return (
    <div className="relative flex items-center mb-3 intro-x">
      <div className="report-timeline__image flex align-center flex-col">
        <div
          className={` flex justify-center items-center w-10 h-10 overflow-hidden rounded-full image-fit border-4 bg-white text-dark-7 font-black ${borderColor}`}
        >
          {Number(vehicle.speed).toFixed()}
        </div>
        <div className="w-full flex justify-center">
          <span>Km/h</span>
        </div>
      </div>
      <div
        className="flex-1 px-5 py-3 ml-4 box bg-gray-300 dark:bg-dark-2 zoom-in rounded-sm hover:cursor-pointer dark:hover:bg-dark-4 hover:bg-gray-400"
        onClick={() =>
          {
            setCoordsToCenterPointInMap({
              latitude: Number(vehicle.latitude),
              longitude: Number(vehicle.longitude)
          })
          }
        }
      >
        <div className="flex items-center">
          <div className="font-medium">{title}</div>
          <div className="ml-auto text-xs text-gray-500">
            {new Date(vehicle.data).toLocaleDateString('pt-br', {
              dateStyle: 'short'
            })}{' '}
            {new Date(vehicle.data).toLocaleTimeString('pt-br', {
              timeStyle: 'medium'
            })}
          </div>
        </div>
        <div className="mt-1 text-gray-600">
          {addressData ? (
            <span>{addressData}</span>
          ) : (
            <button
              className="underline"
              onClick={() => {
                // getStreetName(vehicle)
              }}
            >
              Clique aqui para consultar o endereço
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
