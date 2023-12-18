import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#fdfbff",
      black: "#000000",
      error: "#A80710",
      disabled: "#A8ABB4",
      primary: {
        low: "#000000",
        default: "#001B3B",
        high: "#004788",
      },
      secondary: {
        low: "#000000",
        default: "#080764",
        high: "#393D8F",
      },
      teritary: {
        low: "#000000",
        default: "#3D0026",
        high: "#782955",
      },
    },
  },
  plugins: [],
};
export default config;
