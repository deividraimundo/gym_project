import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121214",
        element: "#202024",
        divider: "#323238",
        placeHolder: "#7C7C8A",
        label: "#8D8D99",
        text: "#C4C4CC",
        title: "#E1E1E6",
        white: "#FFFFFF",
        details: {
          primary: "#8234E9",
          disabled: "#5719A6",
          hover: "#B088F2",
        },
        errors: {
          primary: "#AB222E",
          disabled: "#7A1921",
          hover: "#D46672",
        },
        button: {
          default: {
            color: "#E1E1E6",
            background: "#8234E9",
            hover: {
              color: "#E1E1E6",
              background: "#B088F2",
            },
          },
          primary: {
            color: "#8234E9",
            background: "transparent",
            border: "#8234E9",
            hover: {
              color: "#E1E1E6",
              background: "#8234E9",
            },
          },
          disabled: {
            color: "#E1E1E6",
            background: "#5719A6",
          },
        },
        input: {
          default: {
            color: "#7C7C8A",
            border: "#323238",
            background: "#121214",
          },
          active: {
            color: "#C4C4CC",
            border: "#8234E9",
            background: "#121214",
          },
          hover: {
            color: "#C4C4CC",
            border: "#B088F2",
            background: "#121214",
          },
          error: {
            color: "#B088F2",
            border: "#AB222E",
            background: "#121214",
          },
          disabled: {
            color: "#7C7C8A",
            border: "#323238",
            background: "#121214",
          },
        },
        card: {
          default: {
            color: "#8D8D99",
            border: "#323238",
            background: "#202024",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
