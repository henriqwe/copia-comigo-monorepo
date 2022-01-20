import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MainNavigation, FloatingCard} from "@comigo/ui-shared-components";
import { Loader } from '@googlemaps/js-api-loader'
import MainMenuItens from "../components/domains/MainMenuItens";
import * as localizations from '../components/domains/monitoring/Localization'
import {getStreetNameByLatLng} from '../components/domains/monitoring/Localization/api'
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

export default function Index() {
  return (
    <localizations.LocalizationProvider>
      <Page />
    </localizations.LocalizationProvider>
  )
}

export function Page() {
  const {
    localizationsRefetch,
    localizationsLoading,
    allUserVehicle,
    coordsToCenterMap,
    vehicleConsultData,
    setVehicleConsultData,
    setSlidePanelState,
    vehicleOnFocusId,
    setVehicleOnFocusId,
    localizationSchema,
    consultVehicleHistoric,
    coordsToCenterPointInMap,
    setCoordsToCenterPointInMap
  } = localizations.useLocalization()
  const [google, setGoogle] = useState<google>()
  const allMarkerVehiclesStep: google.maps.Marker[] = []
  const [allMarkerVehicles, setAllMarkerVehicles] = useState<
    google.maps.Marker[]
  >([])
  const [mapa, setMapa] = useState<google.maps.Map>()
  const  [selectedVehicle,setSelectedVehicle] = useState<vehicle>()
  const [pointMarker, setPointMarker] = useState<
    google.maps.Marker | undefined
  >()
  const infoWindowToRemoveLocation: google.maps.Marker[] = []
  const infoWindowToRemovePath: google.maps.InfoWindow[] = []
  const [markersAndLine, setMarkersAndLine] = useState<{
    markers: google.maps.Marker[]
    line: google.maps.Polyline
  }>()
  const [panorama,setPanorama]=useState<google.maps.StreetViewPanorama>()
  
  function initMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyA13XBWKpv6lktbNrPjhGD_2W7euKEZY1I',
      version: 'weekly',
      libraries: ['geometry']
    })
    const styles = [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }
    ]
    loader
      .load()
      .then((response) => {
        setGoogle(response)
        const map = new response.maps.Map(
          document.getElementById('googleMaps') as HTMLElement,
          {
            center: {
              lat: -12.100100128939063,
              lng: -49.24919742233473
            },
            zoom: 5,
            mapTypeId: response.maps.MapTypeId.ROADMAP
          }
        )
        map.setOptions({ styles })  
        let pano = map.getStreetView()
        pano.setPov(
          {
            heading: 265,
            pitch: 0,
          }
        );
        setPanorama(pano)
        setMapa(map)  
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  function showAllVehiclesInMap(){
    allMarkerVehicles.forEach((vehicle=> vehicle.setMap(mapa)))
    if (markersAndLine) {
      markersAndLine.markers.forEach((marker) => marker.setMap(null))
      markersAndLine.line.getPath().clear()
    }
  }

  useEffect(() => {
    initMap()
  }, [])

  useEffect(() => {
    allUserVehicle
      ?.filter((vehicle) => {
        if (vehicle.latitude && vehicle.longitude) return vehicle
      })
      .forEach((vehicle) => {
        if (vehicle.carro_id === vehicleOnFocusId && mapa) {
          // mapa.setCenter({
          //   lat: Number(vehicle.latitude),
          //   lng: Number(vehicle.longitude)
          // })
        }
        const marker = allMarkerVehicles.find((elem) => {
          if (elem.id === vehicle.carro_id) return elem
        })
        if (marker) {
          updateVehicleMarker(
            marker,
            vehicle,
            mapa!,
            setSelectedVehicle,
            setSlidePanelState,
            setVehicleOnFocusId,
            infoWindowToRemoveLocation,
            panorama
          )
          return
        }

        createNewVehicleMarker(
          mapa,
          vehicle,
          allMarkerVehiclesStep,
          setSelectedVehicle,
          setSlidePanelState,
          setVehicleOnFocusId,
          infoWindowToRemoveLocation,
          panorama
        )
      })
    const markersToAdd = allMarkerVehiclesStep.filter((markerStep) => {
      const validationMarker = allMarkerVehicles.find((elem) => {
        if (elem.id === markerStep.id) {
          return elem
        }
      })
      if (validationMarker) return
      return markerStep
    })

    setAllMarkerVehicles([...allMarkerVehicles, ...markersToAdd])
  }, [allUserVehicle])

  useEffect(() => {
    if (selectedVehicle && google){
      centerMapInVehicle({
        lat:Number(selectedVehicle.latitude),
        lng:Number(selectedVehicle.longitude),
        carro_id:selectedVehicle.carro_id}, mapa)
    }
  }, [selectedVehicle])

  useEffect(() => {
    if (coordsToCenterPointInMap && mapa){
      centerPointInMap(
        coordsToCenterPointInMap,
        mapa,
        google,
        pointMarker,
        setPointMarker
      )
    } 
  }, [coordsToCenterPointInMap])

  useEffect(() => {
    if (vehicleConsultData?.length > 0) {
      allMarkerVehicles.forEach((vehicle=> vehicle.setMap(null)))
      createNewVehiclePathMarker(
        infoWindowToRemovePath,
        selectedVehicle,
        mapa!,
        google,
        vehicleConsultData,
        markersAndLine,
        setMarkersAndLine
      )
    }
  }, [vehicleConsultData])

  return (
    <div className="flex max-h-screen">
      <div className="h-screen sticky top-0 z-50">
       <MainNavigation mainMenuItens={MainMenuItens}/>
      </div>
   
      <div className="absolute z-50 right-0 flex mr-16 mt-2.5" style={{ height: "95%"}}>
        <div className="w-80">
    
          <FloatingCard 
          allUserVehicle={allUserVehicle} 
          schemaYup={localizationSchema} 
          consultVehicleHistoric={consultVehicleHistoric} 
          vehicleConsultData={vehicleConsultData}
          getStreetNameByLatLng={getStreetNameByLatLng}
          showAllVehiclesInMap={showAllVehiclesInMap}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          setCoordsToCenterPointInMap={setCoordsToCenterPointInMap}/>
        </div>
      </div>
      
      <div className="w-full h-screen" id="googleMaps" />
      
    </div>
  );
}

function createNewVehicleMarker(
  map: google.maps.Map | undefined,
  vehicle: vehicle,
  allMarkerVehiclesStep: google.maps.Marker[] | any[],
  setVehicleConsultData,
  setSlidePanelState,
  setVehicleOnFocusId: number,
  infoWindowToRemoveLocation: google.maps.Marker[],
  panorama
) {
  const marker = new google.maps.Marker({
    map,
    zIndex: 2,
    id: vehicle.carro_id,
    position: { lat: Number(vehicle.latitude), lng: Number(vehicle.longitude) },
    icon: {
      path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
      scale: 0.5,
      strokeWeight: 0.7,
      fillColor: setVehicleColor(vehicle),
      fillOpacity: 1,
      anchor: new google.maps.Point(10, 25),
      rotation: Number(vehicle.crs)
    }
  })
  
  marker.infowindow = new google.maps.InfoWindow()

  marker.infowindow.setContent(createContentInfoWindow(vehicle,panorama))
  
  marker.addListener('click', async () => {
    if (infoWindowToRemoveLocation) {
      infoWindowToRemoveLocation.forEach((marker) => marker.infowindow.close())
    }
    setVehicleConsultData(vehicle)
    setSlidePanelState({ open: true })
    // setVehicleOnFocusId(Number(vehicle.carro_id))
    marker.infowindow.open({
      anchor:marker,
      map,
      shouldFocus: false
    })
  })
  infoWindowToRemoveLocation.push(marker)
  allMarkerVehiclesStep.push(marker)
}

function setVehicleColor(vehicle: vehicle) {
  const dataHora = new Date()
  dataHora.setHours(dataHora.getHours() - 1)

  if (new Date(vehicle.date_rastreador) < dataHora) return '#ff0000'

  if (vehicle.ligado) {
    if (Number(vehicle.speed).toFixed() === '0') return '#22ade4'

    return '#009933'
  }

  return '#818181'
}

function centerMapInVehicle(
  coords: { lat: number; lng: number; carro_id: number } | undefined,
  map: google.maps.Map | undefined
) {
  if (map && coords) {
    map.setCenter(coords)
    map.setZoom(10)
  }
  

  const circleMarker = new google.maps.Marker({
    map,
    zIndex: 1,
    position: coords,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 20,
      strokeWeight: 1,
      strokeColor: 'red',
      fillColor: 'yellow',
      fillOpacity: 1
    }
  })
  const intervalColor = setInterval(() => {
    const icon = circleMarker.getIcon()
    if (icon.fillOpacity <= 0.01) {
      circleMarker.setMap(null)
      clearInterval(intervalColor)
    }
    icon.fillOpacity -= 0.01
    icon.strokeOpacity -= 0.01

    circleMarker.setIcon(icon)
  }, 30)
}

function updateVehicleMarker(
  marker: google.maps.Marker,
  vehicle: vehicle,
  map: google.maps.Map,
  setVehicleConsultData,
  setSlidePanelState,
  setVehicleOnFocusId,
  infoWindowToRemoveLocation: google.maps.Marker[],
  panorama
) {
  const currentMarkerPos = new google.maps.LatLng(
    Number(vehicle.latitude),
    Number(vehicle.longitude)
  )
  marker.setPosition(currentMarkerPos)

  const icon = marker.getIcon()
  icon.fillColor = setVehicleColor(vehicle)
  icon.rotation = Number(vehicle.crs)
  marker.setIcon(icon)

  google.maps.event.clearListeners(marker, 'click')
  
  marker.infowindow.setContent(createContentInfoWindow(vehicle,panorama))
  
  marker.addListener('click', async () => {
    if (infoWindowToRemoveLocation) {
      infoWindowToRemoveLocation.forEach((marker) => marker.infowindow.close())
    }
    setVehicleConsultData(vehicle)
    setSlidePanelState({ open: true })
    setVehicleOnFocusId(vehicle.carro_id)
    marker.infowindow.open({
      anchor:marker,
      map,
      shouldFocus: false
    })
  })
  infoWindowToRemoveLocation.push(marker)

}

async function getVehicleAddress(lat: string, lng: string) {
  const response = await getStreetNameByLatLng(lat, lng)
  return response.results[0].formatted_address
}

function centerPointInMap(coords, map, google, pointMarker, setPointMarker) {
  if (pointMarker) pointMarker.setMap(null)

  map.setCenter({
    lat: Number(coords.latitude),
    lng: Number(coords.longitude)
  })
  map.setZoom(13)
  const markerPoint = new google.maps.Marker({
    map,
    animation: google.maps.Animation.BOUNCE,
    icon: {
      path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
      fillColor: '#FF0000',
      fillOpacity: 1,
      anchor: new google.maps.Point(0, 0),
      scale: 0.5
    },
    position: {
      lat: Number(coords.latitude),
      lng: Number(coords.longitude)
    },
    zIndex: 2
  })
  setPointMarker(markerPoint)
  setTimeout(() => {
    markerPoint.setMap(null)
  }, 3000)
}

function createNewVehiclePathMarker(
  infoWindowToRemovePath: google.maps.InfoWindow[],
  selectedVehicle: vehicle,
  map: google.maps.Map,
  google: any,
  pathCoords: vehicle[],
  markersAndLine:
    | {
        markers: google.maps.Marker[]
        line: google.maps.Polyline
      }
    | undefined,
  setMarkersAndLine: Dispatch<
    SetStateAction<
      | {
          markers: google.maps.Marker[]
          line: google.maps.Polyline
        }
      | undefined
    >
  >
) {
  if (markersAndLine) {
    markersAndLine.markers.forEach((marker) => marker.setMap(null))

    markersAndLine.line.getPath().clear()
  }

  map.setCenter({
    lat: Number(pathCoords[pathCoords.length - 1].latitude),
    lng: Number(pathCoords[pathCoords.length - 1].longitude)
  })
  map.setZoom(10)
  const markers = []
  const marker = new google.maps.Marker({
    map,
    position: {
      lat: Number(pathCoords[pathCoords.length - 1].latitude),
      lng: Number(pathCoords[pathCoords.length - 1].longitude)
    },
    zIndex: 2,
    icon: {
      path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
      scale: 0.5,
      strokeWeight: 0.7,
      fillColor: '#009933',
      fillOpacity: 1,
      anchor: new google.maps.Point(10, 25),
      rotation: Number(pathCoords[pathCoords.length - 1].crs)
    }
  })
  marker.addListener('click', async () => {
    if (infoWindowToRemovePath) {
      infoWindowToRemovePath.forEach((info) => info.close())
      infoWindowToRemovePath.length = 0
    }
    const addres = await getVehicleAddress(
      pathCoords[pathCoords.length - 1].latitude,
      pathCoords[pathCoords.length - 1].longitude
    )
    const infowindow = new google.maps.InfoWindow({
      content: `<div class='text-dark-7 w-80 m-0'>
      <img
        src="https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${selectedVehicle.latitude},${selectedVehicle.longitude}&fov=80&heading=70&pitch=0&key=AIzaSyA13XBWKpv6lktbNrPjhGD_2W7euKEZY1I">
      </img>
      <div class='grid grid-cols-3'>
      <div class='grid-span-1 flex bg-theme-22  justify-center font-semibold rounded-l-md py-2 border-2 !border-white '> ${
        selectedVehicle.placa
      }</div>
      <div class='grid-span-1  flex bg-theme-22  justify-center items-center font-semibold border-2  py-2 !border-white' >
      <div class='mr-1 ${
        pathCoords[pathCoords.length - 1].ligado
          ? Number(pathCoords[pathCoords.length - 1].speed).toFixed() === '0'
            ? 'text-theme-10'
            : 'text-theme-9'
          : 'text-theme-13'
      }'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-3 h-3"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
      </div><span>${
        pathCoords[pathCoords.length - 1].ligado
          ? Number(pathCoords[pathCoords.length - 1].speed).toFixed() === '0'
            ? ' Parado'
            : ' Ligado'
          : ' Desligado'
      }</span>
      </div>
      <div class='grid-span-1 flex bg-theme-22  justify-center font-semibold border-2 !border-white rounded-r-md py-2'>${Math.floor(
        Number(pathCoords[pathCoords.length - 1].speed)
      )} km/h</div> 
      </div>
      
      <div class="my-2">
      <p><b>Última atualização: ${new Date(
        pathCoords[pathCoords.length - 1].data
      ).toLocaleDateString('pt-br', {
        dateStyle: 'short'
      })}
      ${new Date(pathCoords[pathCoords.length - 1].data).toLocaleTimeString(
        'pt-br',
        {
          timeStyle: 'medium'
        }
      )}</b> </p>
      <p><b>${selectedVehicle.veiculo}</b> </p>
      <p><b>${'NOME DO MOTORISTA'}</b> </p>
      <p><b>${addres}</b> </p>
      </div>
    </div>`
    })
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    })
    infoWindowToRemovePath.push(infowindow)
  })

  const markerStart = new google.maps.Marker({
    map,
    label: {
      text: 'Início',
      color: 'black',
      fontSize: '16px',
      fontWeight: 'bold',
      className: 'mb-5 ml-4'
    },
    icon: {
      path: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z',
      fillColor: 'green',
      fillOpacity: 1,
      anchor: new google.maps.Point(10, 0),
      scale: 1.5
    },
    position: {
      lat: Number(pathCoords[0].latitude),
      lng: Number(pathCoords[0].longitude)
    },
    zIndex: 2
  })

  const line = new google.maps.Polyline({
    path: [],
    strokeColor: '#223D90',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    geodesic: true,
    map
  })
  const lineForeground = new google.maps.Polyline({
    path: [],
    strokeColor: '#09ff00',
    strokeOpacity: 1,
    strokeWeight: 2,
    geodesic: true,
    map
  })

  renderPolyline()

  function renderPolyline() {
    line.getPath().clear()
    lineForeground.getPath().clear()
    let statusVehicle = pathCoords[0].ligado
    let timeLastStop = new Date(pathCoords[0].data)

    pathCoords.forEach((vehicle, index) => {
      let stop = false
      let durationMs = 0
      if (statusVehicle !== vehicle.ligado) {
        statusVehicle = vehicle.ligado
        if (statusVehicle === 0) {
          durationMs += Math.abs(new Date(vehicle.data) - timeLastStop)
          stop = true
        }
        timeLastStop = new Date(vehicle.data)
      }
      if (durationMs > 0) {
        let seconds = Math.floor((durationMs / 1000) % 60)
        let minutes = Math.floor((durationMs / (1000 * 60)) % 60)
        let hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24)

        if (hours < 10) hours = '0' + hours
        if (minutes < 10) minutes = '0' + minutes
        if (seconds < 10) seconds = '0' + seconds

        durationMs = hours + ':' + minutes + ':' + seconds
      }
      createMarkerWhitInfo(
        vehicle,
        pathCoords[index - 1],
        stop,
        durationMs,
        selectedVehicle,
        infoWindowToRemovePath
      )

      const arrival = new google.maps.LatLng(
        Number(vehicle.latitude),
        Number(vehicle.longitude)
      )
      line.getPath().push(arrival)
    })
    // animateIconPolyline(line)
  }

  function createMarkerWhitInfo(
    vehicle: vehicle,
    previousPosition: vehicle,
    stop: boolean,
    downTime: number,
    selectedVehicle: vehicle,
    infoWindowToRemovePath: google.maps.InfoWindow[]
  ) {
    let events = ''

    if (downTime !== 0) {
      events += `
      ${downTime} <span>tempo parado</span>`
    } else if (Number(vehicle.speed) > 80) {
      events += `
      <span>Velocidade:</span> ${Math.floor(
        Number(vehicle.speed)
      )} <span>Km/H</span>
      `
    }
    if (events === '') events = '<span>Não há evento registrado.</span> '
    // if (true /*Number(vehicle.speed) > 80 || stop*/) {

    const markerlocal = new google.maps.Marker({
      position: {
        lat: Number(vehicle.latitude),
        lng: Number(vehicle.longitude)
      },
      map,
      zIndex: 1,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 2.8,
        strokeWeight: 1,
        fillColor:
          previousPosition === undefined
            ? '#000'
            : stop && Number(vehicle.speed) < 1
            ? '#00ffdd'
            : stop
            ? '#2600ff'
            : Number(vehicle.speed) > 80
            ? '#ff8800'
            : '#000',
        fillOpacity: 1,
        rotation: Number(vehicle.crs) - 180
      }
    })
    markerlocal.addListener('click', async () => {
      if (infoWindowToRemovePath) {
        infoWindowToRemovePath.forEach((info) => info.close())
        infoWindowToRemovePath.length = 0
      }
      const addres = await getVehicleAddress(
        vehicle.latitude,
        vehicle.longitude
      )
      const infowindow = new google.maps.InfoWindow({
        content: `<div class='text-dark-7 w-80 m-0'>
        <img
          src="https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${vehicle.latitude},${vehicle.longitude}&fov=80&heading=70&pitch=0&key=AIzaSyA13XBWKpv6lktbNrPjhGD_2W7euKEZY1I">
        </img>
        <div class='grid grid-cols-3'>
        <div class='grid-span-1 flex bg-theme-22  justify-center font-semibold rounded-l-md py-2 border-2 !border-white '> ${
          selectedVehicle.placa
        }</div>
        <div class='grid-span-1  flex bg-theme-22  justify-center items-center font-semibold border-2  py-2 !border-white' >
        <div class='mr-1 ${
          vehicle.ligado
            ? Number(vehicle.speed).toFixed() === '0'
              ? 'text-theme-10'
              : 'text-theme-9'
            : 'text-theme-13'
        }'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-3 h-3"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
        </div><span>${
          vehicle.ligado
            ? Number(vehicle.speed).toFixed() === '0'
              ? ' Parado'
              : ' Ligado'
            : ' Desligado'
        }</span>
        </div>
        <div class='grid-span-1 flex bg-theme-22  justify-center font-semibold border-2 !border-white rounded-r-md py-2'>${Math.floor(
          Number(vehicle.speed)
        )} km/h</div> 
        </div>
        
        <div class="my-2">
        <p><b>Última atualização: ${new Date(vehicle.data).toLocaleDateString(
          'pt-br',
          {
            dateStyle: 'short'
          }
        )}
        ${new Date(vehicle.data).toLocaleTimeString('pt-br', {
          timeStyle: 'medium'
        })}</b> </p>
        <p><b>${selectedVehicle.veiculo}</b> </p>
        <p><b>${'NOME DO MOTORISTA'}</b> </p>
        <p><b>${addres}</b> </p>
        </div>
        
      <div> <b>Eventos:</b> </br>
      ${events}</div>
      </div>`
      })
      infowindow.open({
        anchor: markerlocal,
        map,
        shouldFocus: false
      })
      infoWindowToRemovePath.push(infowindow)
    })
    
    markers.push(markerlocal)
    // }
  }

  markers.push(marker)
  markers.push(markerStart)
  setMarkersAndLine({ markers, line })
}

function createContentInfoWindow(vehicle:vehicle,panorama){
  
  const content =`<div class='text-dark-7 w-80 m-0'>
  <img
    src="https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${vehicle.latitude},${vehicle.longitude}&fov=80&heading=70&pitch=0&key=AIzaSyA13XBWKpv6lktbNrPjhGD_2W7euKEZY1I" >
  </img>
  <div class='grid grid-cols-3'>
  <div class='grid-span-1 flex bg-theme-22  justify-center font-semibold rounded-l-md py-2 border-2 !border-white '> ${
    vehicle.placa
  }</div>
  <div class='grid-span-1  flex bg-theme-22  justify-center items-center font-semibold border-2  py-2 !border-white' >
  <div class='mr-1 ${
    vehicle.ligado
      ? Number(vehicle.speed).toFixed() === '0'
        ? 'text-theme-10'
        : 'text-theme-9'
      : 'text-theme-13'
  }'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-3 h-3"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
  </div><span>${
    vehicle.ligado
      ? Number(vehicle.speed).toFixed() === '0'
        ? ' Parado'
        : ' Ligado'
      : ' Desligado'
  }</span>
  </div>
  <div class='grid-span-1 flex bg-theme-22  justify-center font-semibold border-2 !border-white rounded-r-md py-2'>${Math.floor(
    Number(vehicle.speed)
  )} km/h</div> 
  </div>
  
  <div class="my-2">
  <p><b>Última atualização: ${new Date(
    vehicle.date_rastreador
  ).toLocaleDateString('pt-br', {
    dateStyle: 'short'
  })}
  ${new Date(vehicle.date_rastreador).toLocaleTimeString('pt-br', {
    timeStyle: 'medium'
  })}</b> </p>
  <p><b>${vehicle.veiculo}</b> </p>
  <p><b>${'NOME DO MOTORISTA'}</b> </p>
  </div>
  </div>`
  
  return content
}

function toggleStreetView(lat:number,lng:number,panorama): void {
  panorama.setPosition({ lat, lng })
  const toggle = panorama.getVisible();

  if (toggle == false) {
    panorama.setVisible(true);
  } else {
    panorama.setVisible(false);
  }
}