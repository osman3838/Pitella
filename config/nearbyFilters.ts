export type NearbyFilterId = 'all' | 'nearby' | 'lentil' | 'mushroom';

export type NearbyFilter = {
  id: NearbyFilterId;
  label: string;
};

export const NEARBY_FILTERS: NearbyFilter[] = [
  { id: 'all', label: 'Tüm Otomatlar' },
  { id: 'nearby', label: 'Yakındaki Otomatlar' },
  { id: 'lentil', label: 'Sadece Mercimek Pizzası' },
  { id: 'mushroom', label: 'Sadece Mantar Pizzası' },
];

export type Automat = {
  id: string;
  distanceKm: number;
  soups: string[]; 
};

export const applyNearbyFilter = (
  automat: Automat,
  filter: NearbyFilterId,
): boolean => {
  switch (filter) {
    case 'nearby':
      return automat.distanceKm <= 5;
    case 'lentil':
      return automat.soups.includes('mercimek');
    case 'mushroom':
      return automat.soups.includes('mantar');
    case 'all':
    default:
      return true;
  }
};
