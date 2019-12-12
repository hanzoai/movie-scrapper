const { getFull } = require('imdb-scrapper')
const fetch = require('node-fetch')

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

const scrapeIMDB = async (id) => {
  let data = await getFull(id)
  data.id = id

  return data
}

const scrapeTrailer = async (movie) => {
  const id = movie.id
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3d21dd5a85c8af8af928b387d111ccbe&append_to_response=videos`)
  const data = await res.json()
  const videos = data.videos.results

  // let trailer = videos[0].key
  // let isOfficial = false

  // // for (let v of videos) {
  // //   let name = v.name.toLowerCase()
  // //   if (name.indexOf('official') > -1 || name.indexOf('trailer') > -1 || name.indexOf('main') > -1) {
  // //     trailer = v.key
  // //     break
  // //   }
  // // }

  // movie.trailer = {
  //   trailer: `https://www.youtube.com/watch?v=${trailer}`,
  //   thumbnail: `https://img.youtube.com/vi/${trailer}/maxresdefault.jpg`,
  // }

  movie.trailers = videos.map((v) => ({
    trailer:   `https://www.youtube.com/watch?v=${v.key}`,
    thumbnail: `https://img.youtube.com/vi/${v.key}/maxresdefault.jpg`,
  }))

  return movie
}

Promise
  .all(ids.map((id) => scrapeIMDB(id)))
  .then((res) => {
    let ps = res.map((movie) => scrapeTrailer(movie))

    return Promise.all(ps)
  })
  .then((res) => {
    console.log(JSON.stringify(res))
  })
  .then(() => process.exit(0))
