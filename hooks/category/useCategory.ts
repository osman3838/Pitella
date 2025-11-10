import  {
    UseCategoryOptions,
    UseCategoryReturn
} from '@/types';
import type { SectionChip } from '@/types/ui/section';
import { useCallback, useMemo, useState } from 'react';

export function useCategory({
  chips = [],
  initialKey,
  items = [],
  query = '',
}: UseCategoryOptions): UseCategoryReturn {

  const [activeKey, setActiveKey] = useState<string>(
    initialKey ?? chips.find(c => c.active)?.key ?? chips[0]?.key ?? ''
  );

  const computedChips: SectionChip[] = useMemo(
    () =>
      chips.map(c => ({
        ...c,
        active: c.key === activeKey,
      })),
    [chips, activeKey]
  );

  const onChipChange = useCallback((key: string) => {
    setActiveKey(key);
  }, []);

  const filtered = useMemo(() => {
    const byChip = activeKey
      ? items.filter(it => !it.tags || it.tags.includes(activeKey))
      : items;

    if (!query) return byChip;

    const q = query.trim().toLowerCase();
    return byChip.filter(it => it.title?.toLowerCase().includes(q));
  }, [items, activeKey, query]);

  return {
    activeKey,
    setActiveKey,
    chips: computedChips,
    onChipChange,
    items: filtered,
    total: filtered.length,
  };
}
