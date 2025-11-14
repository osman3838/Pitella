import React from 'react';

import SectionHeader from '@/components/Section/SectionHeader/SectionHeader';
export default function Section({
  title,
  rightExtra,
  renderChips,
}: {
  title: string;
  rightExtra?: React.ReactNode;
  renderChips?: () => React.ReactNode;
}) {
  return (
    <SectionHeader
      title={title}
      rightExtra={rightExtra}
      renderChips={() => (renderChips ? renderChips() : null)}
    />
  );
}
