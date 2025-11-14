
import type { NearbySiteDTO } from '@/types/dto/otomat';

export type Coords = {
  lat: number;
  lng: number;
};

export type RadiusMarker = {
  id: string | number;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  isActive?: boolean;
};


export type NearbyListProps = {
  sites: NearbySiteDTO[];
  onPressRoute?: (item: NearbySiteDTO) => void;
  onPressItem?: (item: NearbySiteDTO) => void;
  highlightFirst?: boolean;
};

export type LocationPermissionEmptyStateProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onRequestPermission?: () => void;
};
