export interface NearbySitesRequestDTO {
  lat: number;
  lng: number;
  min_distance?: number;
  max_distance?: number;
}

export interface NearbySiteDTO {
  id: number;
  name?: string | null;
  address?: string | null;
  city?: string | null;
  latitude?: number;
  longitude?: number;
  distance_km?: number;
  [key: string]: any;
}
