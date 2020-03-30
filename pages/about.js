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
        <main className="flex-auto px-3 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-extrabold text-2xl sm:text-3xl leading-none mb-6">
              {content.title}
            </h2>
            <p className="max-w-xl text-navy-light text-lg mb-4">
              {content.description}
              <a href="https://dinecph.dk" target="_blank" rel="noopener">
                dinecph.dk
              </a>
              .
            </p>
            <p className="max-w-xl text-navy-light text-lg mb-4">
              {content.contact}
              <a href="mailto:benjamin.mateev@gmail.com">benjamin.mateev@gmail.com</a>.
              .
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const pageContent = {
  'de-DE': {
    title: 'Über uns',
    description: `Die COVID-19 Krise hat Berlin's restaurant szene hart getroffen. Viele Establissements bieten Lieferungen ihrer normalen oder neuer Gerichte an. Wir haben diese Seite gebaut um ihnen zu helfen mehr Leute zu erreichen - Inspierrert von`,
    contact: 'Anfragen zur Seite oder Technik an ',
  },
  'en-GB': {
    title: 'About',
    description: `The COVID-19 crisis has hit the Berlin restaurant scene hard. Many establishments have started offering take-out. We've made this site to help spread the word — inspired by `,
    contact: 'Most inquiries and site feedback to ',
  },
}
