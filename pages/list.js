import { useContext, useState } from 'react'
import Promise from 'promise-polyfill'
import fetch from 'isomorphic-unfetch'

import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const pageContent = {
  'de-DE': {
    title: 'Restaurants',
    offersLabel: 'Angebote',
    neighbourhoodLabel: 'Bezirke',
    searchRestaurant: 'Suche',
    delivery: 'Lieferung',
    orderLabel: 'Anschauen und Bestellen',
  },
  'en-GB': {
    title: 'Restaurants',
    offersLabel: 'Offers',
    neighbourhoodLabel: 'Neighbourhoods',
    searchRestaurant: 'Search', 
    delivery: 'Delivery',
    orderLabel: 'View and order',
  },
}

const ListItem = ({ restaurant, content }) => {
  const id = restaurant.id || undefined
  const name = restaurant.name || undefined
  const address = restaurant.address || undefined
  const description = restaurant.description || undefined
  const offers = restaurant.categories || undefined
  const delivery = restaurant.delivery || false
  const phone = restaurant.phone || undefined
  const url = restaurant.url || undefined
  const neighbourhood = restaurant.neighbourhood || undefined
  const email = restaurant.email || undefined

  return (
    <li key={id} className="w-full md:w-1/2 p-3">
      <div className="relative h-full flex flex-col items-start bg-white rounded-lg overflow-hidden p-4 sm:p-8 lg:px-12">
        <div className="flex-auto">
          {name && <h3 className="text-xl sm:text-2xl mb-2">{name}</h3>}
          {address && <p className="text-xs sm:text-sm mb-2">{address}<span className="inline-block font-medium text-xs sm:text-sm bg-teal px-2 py-1 m-1"> {neighbourhood} </span></p>}
          
          
          <p className="text-sm mb-4">
            {phone && <a href={"tel:" + phone}>{phone}</a> }
            {phone && email && <span> | </span>}
            {email && <a href={"mailto:" + email}>{email}</a> }
          </p>
          {description && (
            <p className="max-w-xl text-sm sm:text-base mb-4">{description}</p>
          )}
          {offers && !!offers.length && (
            <ul className="-m-1 mb-6">
              {offers.map(offer => (
                <li
                  key={offer}
                  className="inline-block font-medium text-xs sm:text-sm bg-teal px-2 py-1 m-1"
                >
                  {offer}
                </li>
              ))}
            </ul>
          )}
        </div>
        {url &&
          <a
            href={url.includes('http') ? url : 'https://' + url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm sm:text-base"
          >
            {content.orderLabel}&nbsp;&nbsp;&nbsp;⟶
          </a>
        }
        {delivery && (
          <div className="sm:absolute top-0 right-0 font-medium text-sm sm:bg-teal sm:border-b border-sand sm:px-2 sm:py-1 mt-4 sm:m-2">
            ✓ Delivery available
          </div>
        )}
      </div>
    </li>
  )
}

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = { restaurants: this.props.restaurants }
  }
  
  componentDidMount() {
    this.setState({restaurants: shuffle(this.state.restaurants)})
  }

  render () {
    let restaurants =this.state.restaurants
    return (
      <ul className="flex flex-wrap -m-3">
        {restaurants
          // Filter for necessary content
          .filter(
            restaurant =>
              restaurant.name &&
              restaurant.description &&
              restaurant.url
          )
          // Filter for delivery
          .filter(restaurant =>
            this.props.filterDelivery ? restaurant.delivery : true
          )
          // Filter for offers
          .filter(restaurant =>
            this.props.filterOffers && this.props.filterOffers.length
              ? this.props.filterOffers.every(offer =>
                  restaurant.categories.includes(offer)
                )
              : true
          )
          // Filter for neighbourhoods
          .filter(restaurant => {
            return this.props.filterNeighbourhoods && this.props.filterNeighbourhoods.length
            ? this.props.filterNeighbourhoods.every(neighbourhood =>
                restaurant.neighbourhood === neighbourhood
              )
            : true
          })
          .map(restaurant => (
            <ListItem
              key={restaurant.id}
              restaurant={restaurant}
              content={this.props.content}
            />
          ))}
      </ul>
    )
  }
}
export default ({ restaurants, neighbourhoods, offers }) => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  const [filterDelivery, setFilterDelivery] = useState(false)
  const [filterSearch, setFilterSearch] = useState("")
  const [filterOffers, setFilterOffers] = useState([])
  const [filterNeighbourhoods, setFilterNeighbourhoods] = useState([])

  if (restaurants && !!restaurants.length)
    return (
      <>
        <Head />
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-auto px-3 pt-8 sm:pt-16 pb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="flex-auto font-extrabold text-2xl sm:text-3xl leading-none mb-4 sm:mb-6">
                {content.title}
              </h2>
              <div className="flex flex-wrap sm:flex-no-wrap items-end -m-1 mb-6">
                
                <div className="w-full flex flex-wrap items-center mb-4 sm:mb-0">
                  <div className="w-full flex flex-wrap items-center mb-4 sm:mb-0 justify-between">
                    <p className="w-full sm:w-auto font-medium m-1 mr-2">
                      {content.offersLabel}
                    </p>
                    <label className="flex-shrink-0 inline-flex items-center font-medium cursor-pointer m-1">
                      <input
                        type="checkbox"
                        checked={filterDelivery}
                        onChange={() => setFilterDelivery(!filterDelivery)}
                        className="form-checkbox mr-2"
                      />
                      <span className="select-none">{content.delivery}</span>
                    </label>
                  </div>
                  <div className="w-full flex flex-wrap items-center mb-4 sm:mb-0">
                    {offers.sort().map(offer => {
                      const isChecked = filterOffers.includes(offer)
                      const handleChange = () => {
                        if (isChecked) {
                          const newOffers = [...filterOffers]
                          newOffers.splice(newOffers.indexOf(offer), 1)
                          setFilterOffers(newOffers)
                        } else {
                          setFilterOffers([...filterOffers, offer])
                        }
                      }
                      return (
                        <label
                          key={offer}
                          className={
                            'inline-block font-medium border-2 border-navy cursor-pointer px-2 py-1 m-1' +
                            (isChecked
                              ? ' text-sand-light bg-navy'
                              : ' text-navy')
                          }
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="select-none">
                            {offer}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap sm:flex-no-wrap items-end -m-1 mb-6">
                <div className="w-full items-center mb-4 sm:mb-0">
                  <p className="w-full sm:w-auto font-medium m-1 mr-2">
                    {content.neighbourhoodLabel}
                  </p>
                  <div className="w-full flex flex-wrap items-center mb-4 sm:mb-0 md:max-w-3xl max-w-xl">
                    {neighbourhoods.map(neighbourhood => {
                      const isChecked = filterNeighbourhoods.includes(neighbourhood)
                      const handleChangeN = () => {
                        if (isChecked) {
                          const newNeighbourhoods = [...filterNeighbourhoods]
                          newNeighbourhoods.splice(newNeighbourhoods.indexOf(neighbourhood), 1)
                          setFilterNeighbourhoods(newNeighbourhoods)
                        } else {
                          setFilterNeighbourhoods([...filterNeighbourhoods, neighbourhood])
                        }
                      }
                      return (
                        <label
                          key={neighbourhood}
                          className={
                            'inline-block font-small border-2 border-navy cursor-pointer px-2 py-1 m-1' +
                            (isChecked
                              ? ' text-sand-light bg-navy'
                              : ' text-navy')
                          }
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleChangeN}
                            className="sr-only"
                          />
                          <span className="select-none">{neighbourhood}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
              <List 
                restaurants={restaurants}
                filterDelivery={filterDelivery}
                filterOffers={filterOffers}
                filterNeighbourhoods={filterNeighbourhoods}
                content={content}
              />
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  return (
    <div className="w-full h-full flex items-center justify-center text-3xl text-pink">
      <LoadingSpinner />
    </div>
  )
}

export async function getStaticProps() {
  const airtableApiKey = process.env.AIRTABLE_API_KEY
  const airtableBaseKey = process.env.AIRTABLE_BASE_KEY

  const Airtable = require('airtable')
  const airtable = new Airtable({
    apiKey: airtableApiKey,
  }).base(airtableBaseKey)
  const base = await airtable('Restaurants')
  const records = await base
    .select({
      maxRecords: 999999, // don't want to paginate...
      view: 'Grid view', // NOTE: changing the view name will break things
      fields: ['name', 'address', 'description', 'categories', 'delivery', 'phone', 'url', 'neighbourhood', 'email'],
      filterByFormula: "display = '1'",
    })
    .all()
  
  const restaurants = await Promise.all(records.map(record => {
    const info = record.fields
    info.id = record.id
    return info
  }))

  const neighbourhoods = Array.from(
    new Set(
      restaurants.reduce( (hoods, restaurant) => {
        if(restaurant.neighbourhood != undefined) hoods.push(restaurant.neighbourhood)
        return hoods
      }, [])
    )
  )

  const offers = Array.from(
    new Set(
      restaurants.reduce( (o, restaurant) => {
        if(restaurant.categories != undefined) o.push(restaurant.categories)
        return o
      }, []).flat(Infinity)
    )
  )

  return { props: { restaurants, neighbourhoods, offers } }
}

export function shuffle(arr) {
  var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;  
}