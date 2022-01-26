import { DefaultTheme } from "styled-components";

const dark: DefaultTheme = {
  name: 'dark',
  basicWidth: "320px",
  header: {
    color: "#fff"
  },
  color: {
    main: "#000",
    sub: "#fff"
  }
};

const light: DefaultTheme = {
  name: 'light',
  basicWidth: "320px",
  header: {
    color: "#000"
  },
  color: {
    main: "#FFF",
    sub: "#000"
  }
};

export { dark, light };
