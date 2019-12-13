const { getFull } = require('imdb-scrapper')
const fetch = require('node-fetch')
const { formatJson } = require('./format')
const fs = require('fs')

const ids = [
  'tt2527338',
  'tt5697572',
  'tt8579674',
  'tt1502397',
  'tt5814534',
  'tt3281548',
  'tt4916630',
  'tt5577494',
  'tt3612126',
  'tt1833116',
  'tt7126948',
  'tt4513678',
  'tt3480822',
  'tt7286456',
  'tt0448115',
  'tt1979376',
  'tt7131622',
  'tt1302006',
  'tt6146586',
  'tt0437086',
]

const scrapeIMDB = async id => {
  let data = await getFull(id)
  data.id = id

  return data
}

const scrapeTrailer = async movie => {
  const id = movie.id
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=3d21dd5a85c8af8af928b387d111ccbe&append_to_response=videos`,
  )
  const data = await res.json()
  const videos = data.videos.results

  movie.trailers = videos.map(v => ({
    trailer: `https://www.youtube.com/watch?v=${v.key}`,
    thumbnail: `https://img.youtube.com/vi/${v.key}/maxresdefault.jpg`,
  }))

  return movie
}

const scrape = async movie => {
  const { id } = movie
  const host = 'http://www.omdbapi.com'
  const apiKey = `8c68a543&`
  const path = `?apikey=${apiKey}i=${id}`
  const res = await fetch(host + path)
  const data = await res.json()
  const mapping = {
    rated: 'rated',
  }
  const result = formatJson(data, mapping)
  return { movie, ...result }
}

Promise.all(ids.map(id => scrapeIMDB(id)))
  .then(res => {
    let ps = res.map(movie => scrapeTrailer(movie))

    return Promise.all(ps)
  })
  .then(res => {
    let ps = res.map(movie => scrape(movie))

    return Promise.all(ps)
  })
  .then(res => {
    console.log(res)
    let output = JSON.stringify(res)
    fs.writeFileSync('output.json', output)
    // console.log(JSON.stringify(res))
  })
  .then(() => process.exit(0))
