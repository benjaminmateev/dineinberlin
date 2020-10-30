import Promise from 'promise-polyfill'
import fetch from 'isomorphic-unfetch'

import Head from '../components/Head'
import Nav from '../components/Nav'
import Map from '../components/Map'

export default ({ restaurants }) => {
  return (
    <>
      <Head />
      <div className="h-screen flex flex-col">
        <Nav />
        <main className="flex-auto">
          <Map restaurants={restaurants} />
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const airtableApiKey = process.env.AIRTABLE_API_KEY
  const airtableBaseKey = process.env.AIRTABLE_BASE_KEY
  // Reducing number of requests to Maps API
  const googleMapsApiKey =
    process.env.NODE_ENV === 'production'
      ? process.env.GOOGLE_MAPS_API_KEY
      : undefined

  const Airtable = require('airtable')
  const airtable = new Airtable({
    apiKey: airtableApiKey,
  }).base(airtableBaseKey)
  const base = await airtable('Restaurants')
  const records = await base
    .select({
      maxRecords: 999999, // don't want to paginate...
      view: 'Grid view', // NOTE: changing the view name will break things
      fields: ['name', 'address', 'description', 'categories', 'delivery', 'phone', 'url', 'neighbourhood', 'email', 'location'],
      filterByFormula: "display = '1'",
    })
    .all()
  const restaurants = await Promise.all(records.map(record => {
    const info = record.fields
    info.id = record.id
    return info
  }
  ))
  
  // Dont need this anymore as locaation encoding happens in Airtable but 
  // keeping for future reference and could build to do geolcation and store in Airtable here

  // if(process.env.NODE_ENV === 'production') {
  //   let i = -1
  //   for await (let restaurant of restaurants) {
  //     i++
  //     await fetch(
  //       'https://maps.googleapis.com/maps/api/geocode/json?address=' +
  //         encodeURI(restaurant.address) +
  //         '&key=' +
  //         googleMapsApiKey
  //     ).catch(err => {
  //       console.log(err)
  //     }).then(res => {
  //       return res.json()
  //     }).then(json => {
  //       const positionData = json
  //       if (positionData) restaurants[i].positionData = positionData
  //     })
  //   }
  // }
  
  return { props: { restaurants } }
}
