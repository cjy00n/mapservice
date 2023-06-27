import { Coordinates } from './store';

export type NaverMap = naver.maps.Map;

export type Marker = {
    map: NaverMap;
    coordinates: Coordinates;
    icon: ImageIcon;
    onClick?: () => void;
};

export type ImageIcon = {
    url: string;
    size: naver.maps.Size;
    origin: naver.maps.Point; // 스프라이트 이미지에서 클리핑 위치
    scaledSize?: naver.maps.Size;
};
