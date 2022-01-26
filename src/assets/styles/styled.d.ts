import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    basicWidth: string;
    header:{
      color: string;
    },
    color: {
      main: string;
      sub: string;
    };
  }
}