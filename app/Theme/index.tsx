import { extendTheme } from "@chakra-ui/react";
import { Inter} from "next/font/google";

// Regular Inter font for body text
 const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-inter'
});

// Inter Tight for headings
 const interTight = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-inter-tight',

});

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#1a1a1a", 
        color: "white" 
      },
    },
  },
  fonts: {
    heading: `${interTight.style.fontFamily}, sans-serif`,
    body: `${inter.style.fontFamily}, sans-serif`,
  },
});

export default theme;
