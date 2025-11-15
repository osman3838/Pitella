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
export * from './ui/avatarTypes';
export * from './ui/backButtonTypes';
export * from './ui/buttonTypes';
export * from './ui/checkboxTypes';
export * from './ui/iconButtonTypes';
export * from './ui/otpTypes';
export * from './ui/section';
export * from './ui/textTypes';


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
export * from './domain/campaing';
export * from './domain/session';
export * from './domain/user';



/*************************************************
 * DTO (API) TIPLERI
 * ------------------------------------------------
 * Backend ile konuşulan istek/yanıt formatları.
 * Domain’den farklıdır; API değişirse sadece burası değişir.
 *************************************************/
export * from './dto/auth';
export * from './dto/otomat';


/*************************************************
 * NAVIGATION TIPLERI
 * ------------------------------------------------
 * Uygulama içi navigation yapıları ve
 * navigation bileşenlerinin prop tipleri burada tutulur.
 *************************************************/


export * from './navigation/app-header';
export * from './navigation/MenuTab';


export * from './navigation/TabItemProps';


/*************************************************
 * FEATURE TIPLERI
 * ------------------------------------------------
 * Uygulama içi feature yapıları ve
 * feature bileşenlerinin prop tipleri burada tutulur.
 *************************************************/
export * from './features/home/hero';
export * from './features/profile/quick';
export * from './features/home/Campaign';

/*************************************************
 * CATEGORY TIPLERI
 * ------------------------------------------------
 * Kategori yapıları ve
 * kategori bileşenlerinin prop tipleri burada tutulur.
 *************************************************/

export * from './category/categoryTypes';
export * from './ui/cardTypes';

/*************************************************
 * HOOK TIPLERI
 * ------------------------------------------------
 * Hook bileşenlerinin prop tipleri burada tutulur.
 *************************************************/
export * from './hooks/qrScannerTypes';



/*************************************************
 * COMPONENT TIPLERI
 * ------------------------------------------------
 * Component bileşenlerinin prop tipleri burada tutulur.
 *************************************************/
export * from './components/location';
export * from './components/qrScannerTypes';

/*************************************************
 * 
 * STORE TIPLERI
 * 
 * Store tipleri burada tutulur.
 *************************************************/
export * from './store/qrScanner';

/*************************************************
 * 
 * UI TIPLERI
 * 
 * UI bileşenlerinin prop tipleri burada tutulur.
 *************************************************/
export * from './ui/Campaign';

