import { useContext, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'react-feather'

import useBreakpoint from '../hooks/useBreakpoint'
import { LanguageContext } from './LanguageSelector'

const content = {
  restaurants: {
    'de-DE': {
      label: 'Restaurants',
      map: 'Kartenansicht',
      list: 'Listenansicht',
    },
    'en-GB': {
      label: 'Restaurants',
      map: 'Map view',
      list: 'List view',
    },
  },
  about: { 'de-DE': 'Über uns', 'en-GB': 'About' },
  submit: {
    'de-DE': {
      sm: 'Abschicken',
      else: 'Dein Restaurant hinzufügen',
    },
    'en-GB': {
      sm: 'Submit',
      else: 'Add your restaurant',
    },
  },
}

export default () => {
  const breakpoint = useBreakpoint()
  const { language } = useContext(LanguageContext)
  return (
    <nav className="px-3 py-6">
      <div className="max-w-6xl flex items-center mx-auto">
        <div className="flex-auto flex items-center -mx-3">
          <Link href="/">
            <a className="inline-flex items-center mx-3 sm:mr-6">
              <span
                role="img"
                aria-label="Bear"
                style={{ transform: 'rotate(15deg) translateY(-2px)' }}
                className="bear text-3xl sm:mr-3"
              >
              <img
                src="/assets/dineinbear.svg"
                alt="Dine In Bear"
                className="hidden md:block w-8 h-8"
              /> 
              </span>
              <h2 className="hidden sm:inline-block text-2xl">
                Dine in Berlin
              </h2>
            </a>
          </Link>
          <Dropdown language={language} />
          {breakpoint.sm && (
            <NavLink href="/about" label={content.about[language]} />
          )}
        </div>
        <div className="-mx-3">
          <NavLink
            href="/submit"
            label={content.submit[language][breakpoint.sm ? 'else' : 'sm']}
          />
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, label }) => (
  <Link href={href}>
    <a className="font-medium mx-3">{label}</a>
  </Link>
)

const Dropdown = ({ language }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <>
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          className="fixed inset-0 z-10"
        />
      )}
      <div className="flex flex-col mx-3">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center font-medium"
        >
          {content.restaurants[language].label}
          <ChevronDown
            style={{ transform: 'translateY(1px)' }}
            className="text-navy-light ml-2"
          />
        </button>
        <div className="relative">
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 8 }}
                exit={{ opacity: 0, y: 0 }}
                className="absolute left-0 top-0 z-20 w-48 bg-sand-light border border-sand"
              >
                <li className="w-full">
                  <Link href="/map">
                    <a className="group flex font-medium px-3 py-2 my-2">
                      {content.restaurants[language].map}
                      <span className="flex-auto text-right text-sand-light group-hover:text-navy-light transition-color duration-150 ease-in-out">
                        ⟶
                      </span>
                    </a>
                  </Link>
                </li>
                <li className="w-full">
                  <Link href="/list">
                    <a className="group flex font-medium px-3 py-2 my-2">
                      {content.restaurants[language].list}
                      <span className="flex-auto text-right text-sand-light group-hover:text-navy-light transition-color duration-150 ease-in-out">
                        ⟶
                      </span>
                    </a>
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
