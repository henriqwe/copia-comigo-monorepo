/* eslint-disable-next-line */
import { LocationMarkerIcon, MinusIcon, PlusIcon, TruckIcon, UserIcon} from "@heroicons/react/outline";
import { useState } from "react";
import {common,SeparatorWithTitleAndNumber, CardVehicle} from '@comigo/ui-shared-components'
import { Controller } from "react-hook-form";

export interface FloatingCardProps {
  allUserVehicleProps?:{
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
  }[]
}

export function FloatingCard({allUserVehicleProps}:FloatingCardProps) {
  const [open,setOpen] = useState(true)
  const allUserVehicle = [{carro_id:'1',placa:'ABC-123'},{carro_id:'2',placa:'EDC-123'},{carro_id:'3',placa:'SAD-123'}]
  const [titleFilter, setTitleFilter] = useState('Em trânsito')
  return (
    <aside className={`w-full ${open?'h-full':'h-10'} bg-white rounded-sm`}>
      <div className={`flex bg-gray-900 h-10 w-full p-4 items-center  ${open?'rounded-t-sm':'rounded-sm'}  text-gray-100 justify-between`}>
        <LocationMarkerIcon className="w-5 h-5 text-gray-100 " />
        <span className="text-sm">Veículos em tempo real</span>
        <span className="text-sm bg-gray-800 px-2 rounded-full">64</span>
        <button onClick={()=>{setOpen(!open)}}>
          {open ?
          <MinusIcon className="w-5 h-5 text-gray-100 " />
          : 
          <PlusIcon className="w-5 h-5 text-gray-100 " />}
        </button>
      </div>
      {open && 
      (<>
          <div>
            <div className="px-3 py-2 bg-gray-100">
              {/* <Controller
                control={control}
                name="Veiculos"
                render={({ field: { onChange, value } }) => ( */}
                  <div className='ring-1 ring-gray-300 rounded-sm'>
                    <common.Form.Select
                      itens={
                        allUserVehicle
                          ? allUserVehicle
                              .filter((item) => {
                                if (item.placa != null) return item
                              })
                              .map((item) => {
                                return {
                                  key: item.carro_id,
                                  title: item.placa as string
                                }
                              })
                          : []
                      }
                      value={{key:'',title:''}}
                      onChange={(value) => {
                        // onChange(value)
                        // showVehicleInfo(value)
                        // centerVehicleInMap(Number(value.key))
                        // setDadosEnd('')
                        // setVehicleOnFocusId(Number(value.key))
                      }}
                      // error={errors}
                      label="Pesquise aqui"
                    />
                  </div>
                {/* )}
              /> */}
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
          <div className="px-3 py-2 overflow-y-scroll flex-1 h-5/6">
            <SeparatorWithTitleAndNumber title={'Em trânsito'} number={'32'}/>
              <CardVehicle 
                placa="ABC121" 
                addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Ligado" 
                driverName='Cladio H. A. A.' 
                velocity={13} 
                travelTime="1h 13min"/>

                <common.Card className="hover:bg-gray-200 bg-gray-100 my-4 p-2 text-gray-600">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 flex items-center justify-center">
                      <span className='w-3 h-3 bg-green-500 rounded-full absolute -ml-14'/>
                      <TruckIcon className="w-5 h-5 " />
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center  flex-col">
                      <span className="text-sm">Placa</span>
                      <span className="font-medium text-gray-900">ABC1234</span>
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center flex-col">
                      <span className="text-sm">Em trânsito há</span>
                      <span className="font-medium text-gray-900">1h 30min</span>
                    </div>
                  </div>
                  <common.Separator className=""/>
                  <div className="">
                    <div className="flex items-start justify-self-center ">
                      <LocationMarkerIcon className="w-8 h-8 mx-2" />
                      <span className="text-sm" >Nome Completo da rua nº, Bairro, Cidade - ES  </span>
                    </div>
                    <div className='flex justify-between mt-2'>
                      <div className="flex items-center justify-center">
                        <UserIcon className="w-5 h-5 mx-2" />
                        <span className="text-sm">Cladio H. A. A.</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-sm ring-1 text-blue-500 ring-blue-500 px-2 rounded-sm bg-blue-100 font-semibold"> 80 km/h</span>
                      </div>
                    </div>
                  </div>
                </common.Card>
                <common.Card className="hover:bg-gray-200 bg-gray-100 my-4 p-2 text-gray-600">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 flex items-center justify-center">
                      <span className='w-3 h-3 bg-green-500 rounded-full absolute -ml-14'/>
                      <TruckIcon className="w-5 h-5 " />
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center  flex-col">
                      <span className="text-sm">Placa</span>
                      <span className="font-medium text-gray-900">CFE5123</span>
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center flex-col">
                      <span className="text-sm">Em trânsito há</span>
                      <span className="font-medium text-gray-900 ">2h 21min</span>
                    </div>
                  </div>
                  <common.Separator className=""/>
                  <div className="">
                    <div className="flex items-start justify-self-center ">
                      <LocationMarkerIcon className="w-8 h-8 mx-2" />
                      <span className="text-sm" >Nome Completo da rua nº, Bairro, Cidade - ES  </span>
                    </div>
                    <div className='flex justify-between mt-2'>
                      <div className="flex items-center justify-center">
                        <UserIcon className="w-5 h-5 mx-2" />
                        <span className="text-sm">Cladio H. A. A.</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-sm ring-1 text-red-500 ring-red-500 px-2 rounded-sm bg-red-100 font-semibold"> 121 km/h</span>
                      </div>
                    </div>
                  </div>
                </common.Card>
            <SeparatorWithTitleAndNumber title={'Parado'} number={'3'}/>
                <common.Card className="hover:bg-gray-200 bg-gray-100 my-4 p-2 text-gray-600">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 flex items-center justify-center">
                      <span className='w-3 h-3 bg-red-500 rounded-full absolute -ml-14'/>
                      <TruckIcon className="w-5 h-5 " />
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center  flex-col">
                      <span className="text-sm">Placa</span>
                      <span className="font-medium text-gray-900">CFE5123</span>
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center flex-col">
                      <span className="text-sm">Em trânsito há</span>
                      <span className="font-medium text-gray-900 ">0h 34min</span>
                    </div>
                  </div>
                  <common.Separator className=""/>
                  <div className="">
                    <div className="flex items-start justify-self-center ">
                      <LocationMarkerIcon className="w-8 h-8 mx-2" />
                      <span className="text-sm" >Nome Completo da rua nº, Bairro, Cidade - ES  </span>
                    </div>
                    <div className='flex justify-between mt-2'>
                      <div className="flex items-center justify-center">
                        <UserIcon className="w-5 h-5 mx-2" />
                        <span className="text-sm">Cladio H. A. A.</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-sm ring-1 text-gray-500 ring-gray-500 px-2 rounded-sm bg-gray-100 font-semibold"> 0 km/h</span>
                      </div>
                    </div>
                  </div>
                </common.Card>
            <SeparatorWithTitleAndNumber title={'Desligado'} number={'29'}/>
            <common.Card className="hover:bg-gray-200 bg-gray-100 my-4 p-2 text-gray-600">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 flex items-center justify-center">
                      <span className='w-3 h-3 bg-gray-500 rounded-full absolute -ml-14'/>
                      <TruckIcon className="w-5 h-5 " />
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center  flex-col">
                      <span className="text-sm">Placa</span>
                      <span className="font-medium text-gray-900">CFE5123</span>
                    </div>
                    <div className="col-span-5 flex items-start justify-self-center flex-col">
                      <span className="text-sm">Em trânsito há</span>
                      <span className="font-medium text-gray-900 ">0h 3min</span>
                    </div>
                  </div>
                  <common.Separator className=""/>
                  <div className="">
                    <div className="flex items-start justify-self-center ">
                      <LocationMarkerIcon className="w-8 h-8 mx-2" />
                      <span className="text-sm" >Nome Completo da rua nº, Bairro, Cidade - ES  </span>
                    </div>
                    <div className='flex justify-between mt-2'>
                      <div className="flex items-center justify-center">
                        <UserIcon className="w-5 h-5 mx-2" />
                        <span className="text-sm">Cladio H. A. A.</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-sm ring-1 text-gray-500 ring-gray-500 px-2 rounded-sm bg-gray-100 font-semibold"> 0 km/h</span>
                      </div>
                    </div>
                  </div>
                </common.Card>
                
          </div>
      </>)
      }
      
      <div>

      </div>
    </aside>
  );
}

export default FloatingCard;
