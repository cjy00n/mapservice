import Map from './Map';
import Markers from './Markers';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '../../hooks/useMap';
import useCurrentStore from '../../hooks/useCurrentStore';
import type { NaverMap } from '../../types/map';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Coordinates } from '@/types/store';

const MapSection = () => {
  const router = useRouter();

  const query = useMemo(() => {
    return new URLSearchParams(router.asPath.slice(1));
  }, []);

  const initialZoom = useMemo(() => {
    return query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM;
  }, [query]);

  const initialCenter = useMemo<Coordinates>(() => {
    return query.get('lat') && query.get('lng')
      ? [Number(query.get('lat')), Number(query.get('lng'))]
      : INITIAL_CENTER;
  }, [query]);

  /** onLoadMap */
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  };

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
      <Markers />
    </>
  );
};
export default MapSection;
