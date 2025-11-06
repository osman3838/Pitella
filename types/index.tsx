/*************************************************
 * FORM TIPLERI
 * ------------------------------------------------
 * Uygulama içi FORM STATE yapıları ve
 * form bileşenlerinin prop tipleri burada tutulur.
 *************************************************/
export * from './forms/auth';
export * from './forms/inputTypes';

/*************************************************
 * UI / COMPONENT TIPLERI
 * ------------------------------------------------
 * Buton, ikon, checkbox gibi UI bileşenlerine ait
 * prop tipleri burada tutulur.
 *************************************************/
export * from './ui/backButtonTypes';
export * from './ui/buttonTypes';
export * from './ui/checkboxTypes';
export * from './ui/iconButtonTypes';
export * from './ui/textTypes';
export * from './ui/otpTypes';

/*************************************************
 * ICON TIPLERI
 * ------------------------------------------------
 * SVG veya custom icon set'lerine ait tipler.
 *************************************************/
export * from './icons/iconTypes';

/*************************************************
 * LAYOUT TIPLERI
 * ------------------------------------------------
 * Ekran, container, nav yapısında kullanılan
 * layout tabanlı tipler.
 *************************************************/
export * from './layout/layout';

/*************************************************
 * DOMAIN MODEL TIPLERI
 * ------------------------------------------------
 * Uygulamanın "gerçek" veri modelleri.
 * Store, slice ve tüm app bu tipleri kullanır.
 *************************************************/
export * from './domain/session';
export * from './domain/user';

/*************************************************
 * DTO (API) TIPLERI
 * ------------------------------------------------
 * Backend ile konuşulan istek/yanıt formatları.
 * Domain’den farklıdır; API değişirse sadece burası değişir.
 *************************************************/
export * from './dto/auth';



