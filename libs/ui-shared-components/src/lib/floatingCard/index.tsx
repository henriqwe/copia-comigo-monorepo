/* eslint-disable-next-line */
import { LocationMarkerIcon, MinusIcon, PlusIcon, ChevronDownIcon} from "@heroicons/react/outline";
import { useState } from "react";
import {common} from '@comigo/ui-shared-components'
import { Controller } from "react-hook-form";

export interface FloatingCardProps {
  allUserVehicle2:{
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

export function FloatingCard({allUserVehicle2}:FloatingCardProps) {
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
                  'Eventos de velocidade',
                  'Parado',
                  'Desligado'
                ]}
              />
              
            </div>
          </div>
          <div className="px-3 py-2">
            <div className='flex items-center text-sm'>
              <span className='nowrap'>Em trânsito</span>
              <common.Separator className='flex-1 mx-1'/>
              <span className="text-sm bg-gray-500 px-2 rounded-full text-white">22</span>

            </div>
          </div>
      </>)
      }
      
      <div>

      </div>
    </aside>
  );
}

export default FloatingCard;
