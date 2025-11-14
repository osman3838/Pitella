// src/hooks/useLocationLabels.ts
import { useEffect, useState } from 'react';
import type { Coords } from '@/types/';
type Options = {
  apiKey: string;
  language?: string;
  fallbackLabel?: string;
};

export function useLocationLabels(
  coords: Coords | null,
  { apiKey, language = 'tr', fallbackLabel = 'Konumun çevresi' }: Options
) {
  const [regionLabel, setRegionLabel] = useState(fallbackLabel);
  const [subRegionLabel, setSubRegionLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!coords) return;

    let cancelled = false;

    const run = async () => {
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${apiKey}&language=${language}`;
        const res = await fetch(url);
        const json = await res.json();
        if (cancelled) return;

        const first = json.results?.[0];
        if (!first) return;

        const comps = first.address_components || [];
        const get = (types: string[]) =>
          comps.find((c: any) => c.types?.some((t: string) => types.includes(t)));

        const city =
          get(['administrative_area_level_1'])?.long_name ||
          get(['administrative_area_level_2'])?.long_name ||
          get(['locality'])?.long_name ||
          '';

        const district =
          get(['locality'])?.long_name ||
          get(['sublocality_level_1'])?.long_name ||
          '';

        const neighborhood =
          get(['neighborhood'])?.long_name ||
          get(['sublocality_level_2'])?.long_name ||
          get(['route'])?.long_name ||
          '';

        if (city && district && city !== district) {
          setRegionLabel(`${city} / ${district}`);
        } else if (city) {
          setRegionLabel(city);
        } else {
          setRegionLabel(fallbackLabel);
        }

        setSubRegionLabel(neighborhood || null);
      } catch {
        if (!cancelled) {
          setRegionLabel(fallbackLabel);
          setSubRegionLabel(null);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [coords, apiKey, language, fallbackLabel]);

  return { regionLabel, subRegionLabel };
}
