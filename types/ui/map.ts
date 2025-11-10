export type LatLng = { latitude: number; longitude: number };

export type MapPin = LatLng & {
  id: string;
  title?: string;
  color?: string;   
};

export interface MapCardProps {
  title?: string;                 
  center: LatLng;                 
  radiusMeters?: number;          
  pins?: MapPin[];                
  useRealMap?: boolean;           
  onPressPin?: (pin: MapPin) => void;

  onPressLocate?: () => void;
  onPressAction?: () => void;     
  style?: any;
}
