import { createTheme } from '@mui/material';

interface PaletteTypes {
  main: string;
  light: string;
  dark: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: PaletteTypes;
      secondary: PaletteTypes;
      warning: PaletteTypes;
      info: PaletteTypes;
    };
    mixins: {
      toolbar: {
        minHeight: number;
      };
    };
  }
  // allow configuration using `createTheme()`
  interface Theme {
    palette: {
      primary: PaletteTypes;
      secondary: PaletteTypes;
      warning: PaletteTypes;
      info: PaletteTypes;
    };
    mixins: {
      toolbar: {
        minHeight: number;
      };
    };
  }
}

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#c3cfd9',
      dark: '#9fabb5',
      light: '#dbebf8',
    },
    secondary: {
      main: '#FFF',
      light: '#FFF',
      dark: '#e5e5e5',
    },
    warning: {
      main: '#947979',
      light: '#bb9a9a',
      dark: '#846767',
    },
    info: {
      main: '#fff',
      light: '#fff',
      dark: '#605d5d',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 50,
    },
  },
  // components: {
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         boxShadow: '0px 4px 10px rgba(255, 0, 0, 0.5)', // Change only the color of the shadow
  //       },
  //     },
  //   },
  // },
});
