import React from 'react';
import useSWR from 'swr';
import { STORE_KEY } from 'hooks/useStores';
import { MAP_KEY } from 'hooks/useMap';
import { ImageIcon, NaverMap } from 'types/map';
import { Store } from 'types/store';
import Marker from './Marker';
import useCurrentStore, {
    CURRENT_STORE_KEY,
} from '../../hooks/useCurrentStore';

const Markers = () => {
    const { data: map } = useSWR<NaverMap>(MAP_KEY); //전역 상태로 관리되고 있는 map data 얻기
    const { data: stores } = useSWR<Store[]>(STORE_KEY); // 전역 상태로 관리되고 있는 store data 얻기
    const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
    const { setCurrentStore, clearCurrentStore } = useCurrentStore();

    if (!map || !stores) return null;

    // 둘 중 하나라도 없을경우 null 리턴
    return (
        <>
            {stores.map((store) => {
                return (
                    <Marker
                        map={map}
                        coordinates={store.coordinates}
                        icon={generateStoreMarkerIcon(store.episode, false)}
                        onClick={() => {
                            setCurrentStore(store);
                        }}
                        key={store.nid}
                    />
                );
            })}
            {currentStore && (
                <Marker
                    map={map}
                    coordinates={currentStore.coordinates}
                    icon={generateStoreMarkerIcon(currentStore.episode, true)}
                    onClick={clearCurrentStore}
                    key={currentStore.nid}
                />
            )}
        </>
    );
};

export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export const generateStoreMarkerIcon = (
    markerIndex: number,
    isSeleted: boolean
): ImageIcon => {
    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
    return {
        url: isSeleted ? 'imges/markers-selected.png' : 'imges/markers.png',
        size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
        origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
        scaledSize: new naver.maps.Size(
            SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
            SCALED_MARKER_HEIGHT
        ),
    };
};
