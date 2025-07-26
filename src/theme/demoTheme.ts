import { lightTheme, darkTheme } from 'amazon-chime-sdk-component-library-react';

// Your React Native Paper colors
const reactNativeColors = {
  light: {
    primary: '#7D45FF',
    lightPrimary: '#E0D0EE',
    onPrimary: '#ffffff',
    background: '#ffffff',
    onBackground: '#000000',
    secondary: '#f4f4f4',
    onSecondary: '#111111',
    tertiary: '#008200',
    onTertiary: '#ffffff',
    gray: '#666666',
    lightGray: '#cccccc',
    darkGray: '#6C6C6C',
    error: '#f44336',
    onError: '#ffffff',
    warning: '#FF9800',
    onWarning: '#FF9800',
    blue: '#4F46E5',
    yellow: '#EB9800',
    lightYellow: '#ffffff',
    onLightYellow: '#ff9800',
    lightRed: '#ffebee',
    lightGreen: '#e8f5e9',
    semiTransparentBlack: '#00000080',
    whiteSmoke: '#f5f5f5',
    darkerGray: '#333333',
    OnLightGreen: '#4caf50',
    lightBlue: '#e6eeff',
    orange: '#FF9800',
  },
  dark: {
    primary: '#7D45FF',
    lightPrimary: '#E0D0EE',
    onPrimary: '#ffffff',
    background: '#121212',
    onBackground: '#ffffff',
    secondary: '#1f1f1f',
    onSecondary: '#ffffff',
    tertiary: '#00b100',
    onTertiary: '#ffffff',
    gray: '#999999',
    lightGray: '#cccccc',
    darkGray: '#AAAAAA',
    error: '#f44336',
    onError: '#ffffff',
    warning: '#FFB300',
    onWarning: '#ffffff',
    blue: '#5C6BC0',
    yellow: '#FFEB3B',
    lightYellow: '#fff8e1',
    onLightYellow: '#ffb300',
    lightRed: '#ffcdd2',
    lightGreen: '#c8e6c9',
    semiTransparentBlack: '#ffffff20',
    whiteSmoke: '#eeeeee',
    darkerGray: '#bbbbbb',
    OnLightGreen: '#81c784',
    lightBlue: '#90caf9',
    orange: '#FFA726',
  }
};

// Update light theme colors with React Native Paper colors
const updatedLightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      ...lightTheme.colors.primary,
      main: reactNativeColors.light.primary,
      light: reactNativeColors.light.lightPrimary,
      dark: reactNativeColors.light.darkerGray,
    },
    secondary: {
      ...lightTheme.colors.secondary,
      main: reactNativeColors.light.secondary,
      light: reactNativeColors.light.lightGray,
      dark: reactNativeColors.light.gray,
    },
    error: {
      ...lightTheme.colors.error,
      primary: reactNativeColors.light.error,
      light: reactNativeColors.light.lightRed,
      lightest: reactNativeColors.light.lightRed,
    },
    success: {
      ...lightTheme.colors.success,
      primary: reactNativeColors.light.tertiary,
      light: reactNativeColors.light.lightGreen,
      lightest: reactNativeColors.light.lightGreen,
    },
    info: {
      ...lightTheme.colors.info,
      primary: reactNativeColors.light.blue,
      light: reactNativeColors.light.lightBlue,
      lightest: reactNativeColors.light.lightBlue,
    },
    warning: {
      ...lightTheme.colors.warning,
      primary: reactNativeColors.light.warning,
      light: reactNativeColors.light.lightYellow,
      lightest: reactNativeColors.light.lightYellow,
    },
    greys: {
      ...lightTheme.colors.greys,
      black: reactNativeColors.light.onBackground,
      white: reactNativeColors.light.background,
      grey10: reactNativeColors.light.whiteSmoke,
      grey20: reactNativeColors.light.lightGray,
      grey30: reactNativeColors.light.lightGray,
      grey40: reactNativeColors.light.gray,
      grey50: reactNativeColors.light.gray,
      grey60: reactNativeColors.light.darkGray,
      grey70: reactNativeColors.light.darkGray,
      grey80: reactNativeColors.light.darkerGray,
      grey90: reactNativeColors.light.darkerGray,
      grey100: reactNativeColors.light.onBackground,
    },
  },
  globalStyle: {
    ...lightTheme.globalStyle,
    bgd: reactNativeColors.light.background,
    text: reactNativeColors.light.onBackground,
  },
  buttons: {
    ...lightTheme.buttons,
    primary: {
      ...lightTheme.buttons.primary,
      static: {
        ...lightTheme.buttons.primary.static,
        bgd: reactNativeColors.light.primary,
        text: reactNativeColors.light.onPrimary,
      },
      hover: {
        ...lightTheme.buttons.primary.hover,
        bgd: reactNativeColors.light.lightPrimary,
        text: reactNativeColors.light.primary,
      },
    },
    secondary: {
      ...lightTheme.buttons.secondary,
      static: {
        ...lightTheme.buttons.secondary.static,
        bgd: reactNativeColors.light.secondary,
        text: reactNativeColors.light.onSecondary,
      },
    },
  },
};

// Update dark theme colors with React Native Paper colors
const updatedDarkTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    primary: {
      ...darkTheme.colors.primary,
      main: reactNativeColors.dark.primary,
      light: reactNativeColors.dark.lightPrimary,
      dark: reactNativeColors.dark.darkerGray,
    },
    secondary: {
      ...darkTheme.colors.secondary,
      main: reactNativeColors.dark.secondary,
      light: reactNativeColors.dark.lightGray,
      dark: reactNativeColors.dark.gray,
    },
    error: {
      ...darkTheme.colors.error,
      primary: reactNativeColors.dark.error,
      light: reactNativeColors.dark.lightRed,
      lightest: reactNativeColors.dark.lightRed,
    },
    success: {
      ...darkTheme.colors.success,
      primary: reactNativeColors.dark.tertiary,
      light: reactNativeColors.dark.lightGreen,
      lightest: reactNativeColors.dark.lightGreen,
    },
    info: {
      ...darkTheme.colors.info,
      primary: reactNativeColors.dark.blue,
      light: reactNativeColors.dark.lightBlue,
      lightest: reactNativeColors.dark.lightBlue,
    },
    warning: {
      ...darkTheme.colors.warning,
      primary: reactNativeColors.dark.warning,
      light: reactNativeColors.dark.lightYellow,
      lightest: reactNativeColors.dark.lightYellow,
    },
    greys: {
      ...darkTheme.colors.greys,
      black: reactNativeColors.dark.onBackground,
      white: reactNativeColors.dark.background,
      grey10: reactNativeColors.dark.secondary,
      grey20: reactNativeColors.dark.gray,
      grey30: reactNativeColors.dark.gray,
      grey40: reactNativeColors.dark.lightGray,
      grey50: reactNativeColors.dark.lightGray,
      grey60: reactNativeColors.dark.darkGray,
      grey70: reactNativeColors.dark.darkGray,
      grey80: reactNativeColors.dark.darkerGray,
      grey90: reactNativeColors.dark.darkerGray,
      grey100: reactNativeColors.dark.onBackground,
    },
  },
  globalStyle: {
    ...darkTheme.globalStyle,
    bgd: reactNativeColors.dark.background,
    text: reactNativeColors.dark.onBackground,
  },
  buttons: {
    ...darkTheme.buttons,
    primary: {
      ...darkTheme.buttons.primary,
      static: {
        ...darkTheme.buttons.primary.static,
        bgd: reactNativeColors.dark.primary,
        text: reactNativeColors.dark.onPrimary,
      },
      hover: {
        ...darkTheme.buttons.primary.hover,
        bgd: reactNativeColors.dark.lightPrimary,
        text: reactNativeColors.dark.primary,
      },
    },
    secondary: {
      ...darkTheme.buttons.secondary,
      static: {
        ...darkTheme.buttons.secondary.static,
        bgd: reactNativeColors.dark.secondary,
        text: reactNativeColors.dark.onSecondary,
      },
    },
  },
};

const chatLightTheme = {
  title: reactNativeColors.light.onBackground,
  primaryText: reactNativeColors.light.darkGray,
  secondaryText: reactNativeColors.light.gray,
  headerBorder: reactNativeColors.light.lightGray,
  containerBorder: reactNativeColors.light.lightGray,
  bgd: reactNativeColors.light.whiteSmoke,
  fgd: reactNativeColors.light.background,
  shadow: updatedLightTheme.shadows.large,
  maxWidth: '18.5rem',
};

const chatDarkTheme = {
  title: reactNativeColors.dark.onBackground,
  primaryText: reactNativeColors.dark.onBackground,
  secondaryText: reactNativeColors.dark.gray,
  headerBorder: reactNativeColors.dark.secondary,
  containerBorder: reactNativeColors.dark.secondary,
  bgd: reactNativeColors.dark.background,
  fgd: reactNativeColors.dark.secondary,
  shadow: updatedDarkTheme.shadows.large,
  maxWidth: '18.5rem',
};

export const demoLightTheme = {
  ...updatedLightTheme,
  chat: chatLightTheme,
};

export const demoDarkTheme = {
  ...updatedDarkTheme,
  chat: chatDarkTheme,
};