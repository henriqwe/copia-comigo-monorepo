/* eslint-disable-next-line */
import { LocationMarkerIcon, MinusIcon, PlusIcon, TruckIcon, UserIcon} from "@heroicons/react/outline";
import { useState } from "react";
import {common,SeparatorWithTitleAndNumber, CardVehicle} from '@comigo/ui-shared-components'
import { Controller } from "react-hook-form";

export interface FloatingCardProps {
  allUserVehicle?:{
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

export function FloatingCard({allUserVehicle}:FloatingCardProps) {
  const [open,setOpen] = useState(true)
  
  const [titleFilter, setTitleFilter] = useState('Em trânsito')
  return (
    <aside className={`flex flex-col w-full ${open?'h-full':'h-10'} bg-white rounded-sm`}>
      <div className={`flex bg-gray-900 h-10 w-full p-4 items-center  ${open?'rounded-t-sm':'rounded-sm'}  text-gray-100 justify-between`}>
        <LocationMarkerIcon className="w-5 h-5 text-gray-100 " />
        <span className="text-sm">Veículos em tempo real</span>
        <span className="text-sm bg-gray-800 px-2 rounded-full">{allUserVehicle?.length}</span>
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
          <div className="flex-1 px-3 py-2 overflow-y-scroll">
            <SeparatorWithTitleAndNumber title={'Em trânsito'} number={'32'}/>
              <CardVehicle 
                placa="ABC121" 
                addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Ligado" 
                driverName='Cladio H. A. A.' 
                velocity={13} 
                travelTime="1h 13min"/>
              <CardVehicle 
                placa="ABC121" 
                addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Ligado" 
                driverName='Cladio H. A. A.' 
                velocity={70} 
                travelTime="1h 13min"/>

              <CardVehicle 
                placa="ABC121" 
                addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Ligado" 
                driverName='Cladio H. A. A.' 
                velocity={130} 
                travelTime="1h 13min"/>

            <SeparatorWithTitleAndNumber title={'Parado'} number={'3'}/>
                <CardVehicle 
                placa="ABC121" 
                addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Parado" 
                driverName='Cladio H. A. A.' 
                velocity={0} 
                travelTime="1h 13min"/>
            <SeparatorWithTitleAndNumber title={'Desligado'} number={'29'}/>
            <CardVehicle 
                placa="ABC121" 
                addressName="Nome Completo da rua nº, Bairro, Cidade - ES" statusVehicle="Desligado" 
                driverName='Cladio H. A. A.' 
                velocity={0} 
                travelTime="1h 13min"/>
                
          </div>
      </>)
      }
      
      <div>

      </div>
    </aside>
  );
}

export default FloatingCard;
