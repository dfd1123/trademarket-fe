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

const blue: DefaultTheme = {
  name: 'blue',
  basicWidth: "320px",
  header: {
    color: "#fff"
  },
  color: {
    main: "#010b15",
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

export { dark, blue, light };

export default {dark, blue, light};
