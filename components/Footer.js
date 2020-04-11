import { useContext } from 'react'
import LanguageSelector, { LanguageContext } from './LanguageSelector'
import Link from 'next/link'
import useBreakpoint from '../hooks/useBreakpoint'

export default () => {
  const breakpoint = useBreakpoint()
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <footer className="px-3">
      <div className="flex flex-wrap md:flex-no-wrap items-baseline border-t-2 border-sand max-w-6xl py-12 mx-auto">
        <div className="w-full mb-6 md:mb-0">
          <p className="mb-3">
            {content.createdby}{' '}
           <a
             href="https://benmateev.com"
             target="_blank"
             rel="noopener"
            >
              Benjamin Mateev
            </a>
            {' '}and Martin Kaelble{' '}
            {content.for}{' '}
             Berlin
            {'. '}
          </p>
          <p className="mb-3">
            {content.inspired}{' '}
            
            <a
              href="https://dinecph.dk/"
              target="_blank"
              rel="noopener"
            >
              Dine CPH
            </a>

            ,
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener"
            > 
            Techværnet 
            </a>
            {' '}&{' '} 
            <a
              href="https://shop.empiricalspirits.co/"
              target="_blank"
              rel="noopener"
            > 
            Empirical Spirits
            </a>
            {'. '}
            {content.built}{' '}
            <a
              href="https://www.sebastianwinther.com"
              target="_blank"
              rel="noopener"
            >
              Sebastian Winther
            </a>
            .
          </p>
          <p>
            {content.os}
            {' ⟶ '}
            <a
              className="ml-1"
              href="https://github.com/covid19-group/dinecph"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </p>
        </div>
        <div className="flex-shrink-0 relativ">
          <LanguageSelector />
          <div className="text-left md:text-right mt-4">
            <a href="https://www.instagram.com/dineinberlin/" target="_blank" rel="noopener">
              <img src="/assets/instagram.svg" alt="Instagram" width="24"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const NavLink = ({ href, label }) => (
  <Link href={href}>
    <a className="font-medium mx-3">{label}</a>
  </Link>
)

const pageContent = {
  'de-DE': {
    createdby: 'Umgsetzt von',
    for: "für",
    inspired: 'Inspiriert von ',
    built: 'Im Original von',
    os: 'Es ist Open Source',
  },
  'en-GB': {
    createdby: 'Created by',
    for: "for",
    inspired: 'Inspired by',
    built: 'Originally built by',
    os: "It's open source",
  },
}
