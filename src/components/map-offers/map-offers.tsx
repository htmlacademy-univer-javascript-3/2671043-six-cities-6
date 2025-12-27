import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../types/offer';
import { useMap } from '../../hooks/use-map';
import { MapIcon } from '../../const';

const defaultCustomIcon = new Icon({
  iconUrl: MapIcon.Default,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: MapIcon.Active,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: string | null;
  className: string;
};

export const MapOffers = ({
  city,
  offers,
  selectedOffer,
  className,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap({ renderRef: mapRef, city });

  const markersRef = useRef<Map<string, Marker>>(new Map());

  const layerGroupRef = useRef(layerGroup());

  useEffect(() => {
    if (map) {
      layerGroupRef.current.clearLayers();
      markersRef.current.clear();

      layerGroupRef.current.addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(defaultCustomIcon).addTo(layerGroupRef.current);

        markersRef.current.set(offer.id, marker);
      });
    }
  }, [map, offers]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      marker.setIcon(
        id === selectedOffer ? currentCustomIcon : defaultCustomIcon
      );
    });
  }, [selectedOffer]);

  return <section className={`${className} map`} ref={mapRef} data-testid="map"></section>;
};
