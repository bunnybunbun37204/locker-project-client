"use client";

// app/providers.tsx
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react";
import { Global, css } from "@emotion/react"; // Import Global and css from @emotion/react
import "@fontsource/kanit/thai-300.css"; // Import the Kanit font
import "@fontsource/inter/latin-600.css"; // Import the Inter font


const customTheme = extendTheme(theme, {
  fonts: {
    heading: `'Inter', sans-serif`,
    body: "Kanit, sans-serif",
  },
});

// Define global styles to set the body font-family
const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: "Kanit", sans-serif;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    `}
  />
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <CacheProvider>
        <ChakraProvider theme={customTheme}>
          <GlobalStyles /> {/* Add the GlobalStyles component here */}
          {children}
        </ChakraProvider>
      </CacheProvider>
  );
}
