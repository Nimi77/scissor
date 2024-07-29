import { extendTheme } from "@chakra-ui/react";
import { Harmattan} from "next/font/google";

const harmattan = Harmattan({
  subsets: ['latin'],
  weight:['400', '500','600', '700']
})

const theme = extendTheme({
  fonts: {
    heading: `${harmattan.style.fontFamily}, sans-serif`,
    body: `${harmattan.style.fontFamily}, sans-serif`,
  },
});

export default theme;