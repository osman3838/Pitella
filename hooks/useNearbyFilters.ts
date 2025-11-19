import {
    applyNearbyFilter,
    Automat,
    NEARBY_FILTERS,
    NearbyFilter,
    NearbyFilterId,
} from '@/config/nearbyFilters';
import { useMemo, useState } from 'react';

type Params = {
  data?: Automat[];
  initialFilter?: NearbyFilterId;
};

export const useNearbyFilters = ({ data, initialFilter = 'nearby' }: Params) => {
  const [activeFilter, setActiveFilter] = useState<NearbyFilterId>(initialFilter);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => applyNearbyFilter(item, activeFilter));
  }, [data, activeFilter]);

  const filters: NearbyFilter[] = NEARBY_FILTERS;

  return {
    filters,
    activeFilter,
    setActiveFilter,
    filteredData,
  };
};
