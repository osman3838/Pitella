// components/nearby/NearbyList.tsx

import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { NearbySiteDTO } from '@/types/dto/otomat';

export type NearbyListProps = {
  sites: NearbySiteDTO[];
  onPressRoute?: (item: NearbySiteDTO) => void;
  onPressItem?: (item: NearbySiteDTO) => void;
  highlightFirst?: boolean;
};

export default function NearbyList({
  sites,
  onPressRoute,
  onPressItem,
  highlightFirst = true,
}: NearbyListProps) {
  const t = useTheme();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  return (
    <View style={styles.wrapper}>
      {/* ÜST BAR ------------------------------------------------------ */}

      {/* ROTA / QR KOLON BAŞLIĞI (ikonlar) --------------------------- */}
      <View style={styles.headerRow}>
        {/* solda liste hücresine denk gelen boş alan */}
        <View style={styles.headerLeftSpacer} />
        {/* Harita / Liste pill butonları */}
        <View style={{flexDirection:"row",gap:5}}>
          <AppButton
            size="sm"
            variant="ghost"
            bgColor={viewMode === 'map' ? '#00D9FF' : '#CFF6FF'}
            borderColor="transparent"
            round
            onPress={() => setViewMode('map')}
            style={styles.segmentButton}
          >
            <AppText
              weight="semiBold"
              size={15}
              align="center"
              color="#000"
            >
              Harita
            </AppText>
          </AppButton>

          <AppButton
            size="md"
            variant="ghost"
            bgColor={viewMode === 'list' ? '#00D9FF' : '#CFF6FF'}
            borderColor="transparent"
            round
            onPress={() => setViewMode('list')}
            style={styles.segmentButton}
          >
            <AppText
              weight="semiBold"
              size={16}
              align="center"
              color="#000"
            >
              Liste
            </AppText>
          </AppButton>
        </View>


        {/* Rota ikon hücresi */}

        <View style={{flexDirection:"row",marginHorizontal:11,justifyContent:"space-between"}}>
        <View style={styles.headerIconCell}>
          <Icon name="Location" size={32} color={t.colors.mutedText ?? '#B8B8B8'} />
        </View>

        {/* QR ikon hücresi */}
        <View style={styles.headerIconCell}>
          <Icon name="Barcode" size={32} color={t.colors.mutedText ?? '#B8B8B8'} />
        </View>
          </View>
      </View>

      {/* LİSTE -------------------------------------------------------- */}
      <View style={{ gap: 8, marginTop: 8 }}>
        {sites.map((s, i) => {
          const isActive = highlightFirst && i === 0;

          const name =
            s.address?.startsWith('Koordinat') && s.city
              ? s.city
              : s.address || s.city || 'Otomat';

          return (
            <View key={s.site_id} style={styles.row}>
              {/* SOL BÜYÜK HÜCRE: İSİM + MESAFE */}
              <View style={{flex:1.5}}>
              <Pressable
                onPress={() => onPressItem?.(s)}
                style={[
                  styles.mainCell,
                  isActive ? styles.cellActive : styles.cellInactive,
                ]}
              >
                <AppText
                  weight="semibold"
                  size={14}
                  numberOfLines={1}
                  color={isActive ? '#FFFFFF' : '#666666'}
                >
                  {name}
                </AppText>

                {typeof s.distance_km === 'number' && (
                  <View
                    style={[
                      styles.distanceBadge,
                      isActive
                        ? styles.distanceBadgeActive
                        : styles.distanceBadgeInactive,
                    ]}
                  >
                    <AppText
                      weight="bold"
                      size={12}
                      color={isActive ? '#fff' : "black"}
                    >
                      {s.distance_km.toFixed(1)} km
                    </AppText>
                  </View>
                )}
              </Pressable>
</View>
              {/* ORTA: ROTA */}
              <View style={{flex:1}}>
              <AppButton
                size="md"
                variant="ghost"
                bgColor={isActive ? '#FF4D00' : '#D8D8D8'}
                borderColor="transparent"
                style={styles.actionBtn}
                onPress={() => onPressRoute?.(s)}
              >
                <AppText
                  weight="bold"
                  size={13}
                  align="center"
                  color={isActive ? '#FFFFFF' : '#F2A5A5'}
                >
                  Rota
                </AppText>
              </AppButton>

</View>
              {/* SAĞ: QR */}
              <View style={{flex:1}}>  
              <AppButton
                size="md"
                variant="ghost"
                bgColor={isActive ? '#FF4D00' : '#D8D8D8'}
                borderColor="transparent"
                style={styles.actionBtn}
                onPress={() => onPressItem?.(s)}
              >
                <AppText
                  weight="bold"
                  size={12}
                  align="center"
                  color={isActive ? '#FFFFFF' : '#F2A5A5'}
                >
                  QR
                </AppText>
              </AppButton>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const CELL_RADIUS = 10;
const ACTION_WIDTH =90;

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },

  /* ÜST BAR */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  segmentGroup: {
    flexDirection: 'row',
    flex:0,
    gap: 12,
  },

  segmentButton: {
    minWidth: 70,
  },

  /* İKONLARIN OLDUĞU HEADER ROW */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 8,
  },
  headerLeftSpacer: {
    flex: 1,
    borderRadius: CELL_RADIUS,
    flexDirection:"row",
    justifyContent:"space-around"

  },
  headerIconCell: {
    width: ACTION_WIDTH,
    justifyContent: 'flex-start',
  },

  /* LİSTE SATIRI */
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 8,
  },

  mainCell: {
    flex: 1,
    borderRadius: CELL_RADIUS,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cellActive: {
    backgroundColor: '#FF4D00',
  },
  cellInactive: {
    backgroundColor: '#D8D8D8',
  },

  distanceBadge: {
    borderRadius: 0,
  },
  distanceBadgeActive: {
    color:"white"
  },
  distanceBadgeInactive: {
    backgroundColor: '#F4F4F4',
  },

  actionBtn: {
    width: ACTION_WIDTH,
    borderRadius: 10,
    borderWidth: 0,
    paddingHorizontal: 0,
  },
});
