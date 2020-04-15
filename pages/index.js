import Link from 'next/link'
import { useContext } from 'react'
import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <>
      <Head />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-auto pt-8 lg:pt-0 pb-16">
          <div className="max-w-6xl flex items-center md:overflow-hidden mx-auto">
            <div className="flex-auto w-128 md:flex-shrink-0 px-3 md:pr-16 md:mt-10">
              <h1 className="max-w-xl text-3xl sm:text-5xl leading-none mb-6">
                {content.titleBlue} <br className="hidden sm:inline" />
                <span className="text-pink">{content.titlePink}</span>
              </h1>
              <p className="max-w-xl text-navy-light text-base sm:text-lg md:text-xl mb-8">
                {content.description}
              </p>
              <div className="pr-3 sm:pr-0 sm:-m-2">
                <Link href="/map">
                  <a className="w-full sm:w-auto h-12 btn btn-primary inline-flex items-center mb-3 sm:m-2">
                    {content.find}
                    <span className="inline sm:hidden flex-auto text-right">
                      ⟶
                    </span>
                  </a>
                </Link>
                <Link href="/submit">
                  <a className="w-full sm:w-auto h-12 btn btn-secondary inline-flex items-center sm:m-2">
                    {content.add}
                    <span className="inline sm:hidden flex-auto text-right">
                      ⟶
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            <img
              src="/assets/bicycle1_dineberlin.png"
              alt="Vin og sjov"
              className="hidden md:block w-128"
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const pageContent = {
  'de-DE': {
    titleBlue: 'Unterstütze deine Restaurants in Berlin',
    titlePink: 'Bestell zu dir nach hause',
    description: `Deine geliebten Food Spots kämpfen gerade um ihre Existenz in der Krise - aber sie kochen weiter. Hilf ihnen weiter zu bestehen, in dem du Essen zum Abholen oder Liefern bestellst.`,
    find: 'Finde Restaurants',
    add: 'Füg dein Restaurant hinzu',
  },
  'en-GB': {
    titleBlue: 'Support restaurants in Berlin during the lockdown by',
    titlePink: 'getting take-out',
    description: `Your local food joints are struggling during the current crisis — but they're still cooking! Help them keep the lights on, by getting take-out from the best restaurants in Berlin.`,
    find: 'Find restaurants',
    add: 'Add your restaurant',
  },
}
