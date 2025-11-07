export type TabItemProps = {
  /** Görünecek etiket (TR — JSON’dan gelir) */
  label: string;

  /** JSON’dan gelen ikon ismi */
  icon: string;

  /** Aktif sekme mi */
  focused: boolean;

  /** Orta buton — özel style */
  center?: boolean;

  /** Bildirim/rozet sayısı */
  badge?: number;

  /** Basınca tetiklenecek */
  onPress: () => void;

  /** Uzun basış opsiyonel */
  onLongPress?: () => void;

  /** Ekstil */
  style?: any;

  /** Test için id */
  testID?: string;
};
