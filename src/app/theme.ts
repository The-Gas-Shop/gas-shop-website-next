import { createTheme } from "@mantine/core";

const theme = createTheme({
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },
  colors: {
    brand: [
      "#3e4954",
      "#343d46",
      "#505e6c",
      "#8b9299",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    text: [
      "#000000",
      "#1A1B1E",
      "#2C2D30",
      "#3E3F42",
      "#505153",
      "#626365",
      "#747577",
      "#868788",
      "#989A9B",
      "#AAAAAB",
    ],
  },
});

export default theme;
