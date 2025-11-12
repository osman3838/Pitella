/**
 * Tek bir satırı (row) temsil eder.
 * Örneğin: "Profilimi Görüntüle", "Bakiyem", "Puanlar" vb.
 */
export type ProfileListRow = {
  key: string;          // benzersiz anahtar
  label: string;        // görünen metin
  icon: string;         // icon ismi ('User', 'Star', 'Info' gibi)
  color?: string;       // isteğe bağlı özel renk
  onPress?: () => void; // tıklama handler
};

/**
 * Birden fazla row içeren kart modelidir.
 * Başlığı (title) ve rows dizisini taşır.
 */
export type QuickActionsModel = {
  title: string;             // kart başlığı (örnek: "Hızlı İşlemler")
  rows: ProfileListRow[];    // kart içindeki satırlar
};

/**
 * QuickActionsCard component'i için prop tipi.
 */
export type QuickActionsCardProps = {
  card: QuickActionsModel;   // kart modeli
  width?: number;            // genişlik (varsayılan 230)
  align?: 'left' | 'right';  // hizalama
};
