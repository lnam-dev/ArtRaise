import colors, { black } from 'tailwindcss/colors';

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx,jsx,js}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1344px',
      '2xl': '1600px',
    },
    spacing: {
      auto: 'auto',
      full: '100%',
      screenWidth: '100vw', //1920px
      screenHeight: '100vh', //1920px
      min: 'min-content',
      max: 'max-content',
      layout: '1600px',
      content: '1040px',
      container: '1400px',
      card: '730px',
    },
    fontSize: {
      0.5: '0.125rem', //2px
      1: '0.25rem', //4px
      1.5: '0.375rem', //6px
      2: '0.5rem', //8px
      2.5: '0.625rem', //10px
      3: '0.75rem', //12px
      3.5: '0.875rem', //14px
      4: '1rem', //16px
      5: '1.25rem', //20px
      6: '1.5rem', //24px
      7: '1.75rem', //28px
      8: '2rem', //32px
      9: '2.25rem', //36px
      10: '2.5rem', //40px
      11: '2.75rem', //44px
      12: '3rem', //48px
      14: '3.5rem', //56px
      16: '4rem', //64px
      20: '5rem', //80px
      24: '6rem', //96px
    },
    extend: {
      colors: {
        white: colors.white,
        black: colors.black,
        gray: {
          default: colors.gray,
          100: '#F0F0F4', //HOVER
          700: '#62636D', //SOLID
          500: '#B9BBC8', //BORDERS
          900: '#2D2D2D',
          950: '#131315',
          950.9: 'rgba(35, 35, 39, 0.9)', // HOVER 90%
        },
        focus: '#687CB0',
        error: '#FF2424',
      },
      backgroundImage: {
        'gradient-light':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 1) 100%)',
      },
      spacing: {
        0: '0px',
        0.5: '0.125rem', //2px
        1: '0.25rem', //4px
        1.5: '0.375rem', //6px
        2: '0.5rem', //8px
        2.5: '0.625rem', //10px
        3: '0.75rem', //12px
        3.5: '0.875rem', //14px
        4: '1rem', //16px
        5: '1.25rem', //20px
        6: '1.5rem', //24px
        7: '1.75rem', //28px
        8: '2rem', //32px
        9: '2.25rem', //36px
        10: '2.5rem', //40px
        11: '2.75rem', //44px
        12: '3rem', //48px
        14: '3.5rem', //56px
        16: '4rem', //64px
        18: '4.5rem', //72px
        20: '5rem', //80px
        24: '6rem', //96px
        28: '7rem', //112px
        32: '8rem', //128px
        36: '9rem', //144px
        40: '10rem', //160px
        44: '11rem', //176px
        48: '12rem', //192px
        52: '13rem', //208px
        56: '14rem', //224px
        60: '15rem', //240px
        64: '16rem', //256px
        72: '18rem', //288px
        80: '20rem', //320px
        96: '24rem', //384px
        106: '28rem',
        128: '32rem',
        144: '36rem',
        1660: '1600px',
      },
      borderRadius: {
        '4xl': '2rem',
        full: '1000px',
      },
    },
    borderWidth: {
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
    },
    boxShadow: {
      DEFAULT: '0 4px 8px rgba(0, 0, 0, 0.15)',
      sm: '0 4px 4px rgba(0, 0, 0, 0.25)',
    },
    colors: {
      ctaBlue: '#BEE1E6',
      black: '#0E0E0E',
      white: '#ffffff',
      grey: '#F5F5F5',
      grey2: '#F9F9F9',
      grey3: '#8F8F8F',
      grey4: '#DFDFDF',
      grey5: '#BBBBBB',
      grey6: '#565959',
      buttonBg1: '#FBDCCE',
      buttonBg2: '#FAD2E1',
      buttonText: '#9E8376',
      green: '#DAF5CB',
      green2: '#3C583F',
      textBlack: '#0E0E0E',
      pink: '#FCE8F0',
      red: '#ef233c',
      footerBg: '#17282B',
      grayCustom: '#D1D1D1',
      lightGrayCustom: '#F0F0F4',
    },
    fontFamily: {
      text: ['Raleway', 'sans-serif'],
      fixel: ['Fixel', 'sans-serif'],
      namu: ['Namu', 'sans-serif'],
      museo: ['"Museo Sans Cyr"', 'sans-serif'],
    },
  },
};
