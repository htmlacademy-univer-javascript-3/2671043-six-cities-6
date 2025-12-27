import { useEffect, useRef, useState } from 'react';
import { City } from '../types/offer';
import { Map, TileLayer } from 'leaflet';
import { MapConfig } from '../const';

type MapProps = {
  renderRef: React.RefObject<HTMLDivElement>;
  city: City;
};

export const useMap = ({ renderRef, city }: MapProps) => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    let instance: Map | null = null;

    if (renderRef.current && !isRenderedRef.current) {
      instance = new Map(renderRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(MapConfig.MapUrlTemplate, {
        attribution: MapConfig.MapAttribution,
      });

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }

    return () => {
      if (instance) {
        instance.remove();
        setMap(null);
        isRenderedRef.current = false;
      }
    };
    //в зависимости не добавлен city, для корретной работы (чтобы не удалял экземпляр карты при смене города)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderRef]);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );
    }
  }, [map, city]);

  return map;
};
