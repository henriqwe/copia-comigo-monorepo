import { FloatingCard, MainNavigation} from "@comigo/ui-shared-components";
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect } from 'react';
import MainMenuItens from "../../components/domains/MainMenuItens";
import * as localizations from '../../components/domains/monitoring/Localization'


export default function Localizacao() {
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
      .then((google) => {
        
        const map = new google.maps.Map(
          document.getElementById('googleMaps') as HTMLElement,
          {
            center: {
              lat: -12.100100128939063,
              lng: -49.24919742233473
            },
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
        )
        map.setOptions({ styles })
        console.log(map)
        
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="flex">
      <div className="h-screen sticky top-0 z-50">
       <MainNavigation mainMenuItens={MainMenuItens}/>
      </div>
      
    </div>
  );
}

