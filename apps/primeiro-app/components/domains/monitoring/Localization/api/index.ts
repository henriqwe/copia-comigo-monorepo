import axios from 'axios'
// import { showError } from 'utils/showError'
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

export async function getVehicleLocationRealTime(carro_id: string) {
  try {
    const { data } = await axios.post(
      'https://integration.chaser.com.br/mobile/api/veiculo/localizacao/temporeal',
      {
        carro_id
      }
    )
    return data
  } catch (err: any) {
    // showError(err)
    console.log(err)
  }
}

export async function getAllUserVehicles(email: string):Promise<vehicle[]> {
  try {
    const { data }:{data:vehicle[]} = await axios.post(
      'https://integration.chaser.com.br/mobile/api/veiculo/usuario',
      {
        email
      }
    )
    return data
  } catch (err: any) {
    console.log(err)
    // showError(err)
  }
}

export async function getVehicleHistoric(
  carro_id: string,
  inicio: string,
  fim: string
) {
  try {
    const { data } = await axios.post(
      'https://integration.chaser.com.br/mobile/api/veiculo/localizacao',
      {
        carro_id,
        inicio,
        fim
      }
    )
    return data
  } catch (err: any) {
    showError(err)
  }
}

export async function getStreetNameByLatLng(
  lat: number | string,
  lng: number | string
) {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA13XBWKpv6lktbNrPjhGD_2W7euKEZY1I`
    )

    return data
  } catch (err: any) {
    showError(err)
  }
}

