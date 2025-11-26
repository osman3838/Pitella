export function useTheme() {
  return {
    colors: {
      primary: '#193370',     
      secondary: '#d25034',   

      background: '#ffffff',  
      surface: '#e8e4db',  
      gray: '#e6e6e6',        
      border: '#dddddd',      
      borderDark:"#f2f2f2",
      accent:"#C9986E",
      primaryDark:'#0a142f',
      success:"#2ecc71",
      gold:'#926f4d',
      text: '#111111',        
      mutedText: '#6b7280',   
      danger: '#e11d48',      
      inputBg: '#ffffff',     
    },

    radius: 12,
    spacing: {
      xs: 6,
      sm: 10,
      md: 12,
      lg: 16,
      xl: 24,
    },

    shadow: {
      light: 'rgba(0, 0, 0, 0.05)',
      medium: 'rgba(0, 0, 0, 0.1)',
      heavy: 'rgba(0, 0, 0, 0.2)',
    },

    font: {
      family: {
        regular: 'Biennale-Regular',
        book: 'Biennale-Book',
        medium: 'Biennale-Medium',
        semiBold: 'Biennale-SemiBold',
        bold: 'Biennale-Bold',
      },
      size: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 22,
      },
      weight: {
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      },
    },
  };
}
