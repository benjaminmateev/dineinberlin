import Router from "next/router";
import withGA from "next-ga";
import '../css/globals.css'
import { LanguageProvider } from '../components/LanguageSelector'

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}

// pass your GA code as first argument
export default withGA("UA-1137676-12", Router)(MyApp);