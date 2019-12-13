const { tickerCreater, slugify } = require('./util')
const fs = require('fs')
const { formatJson } = require('./format')
const loadData = path => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}
let rawData = loadData('data.json')
let jsonData = JSON.parse(rawData)
const mapping = {
  name: 'title',
  genre: 'genre',
  trailers: 'trailers',
  posterImg: 'poster',
  imdbid: 'id',
  actors: 'stars',
  director: 'director',
  writer: 'writers',
  shortDescription: 'story',
  year: 'year',
  runtime: 'runtime',
  awards: 'awards',
}
let result = formatJson(jsonData, mapping).map(data => ({
  ...data,
  trailer: data['trailers'][0]['trailer'],
  heroImg: data['trailers'][0]['thumbnail'],
  movieSlug: data['name'] ? slugify(data['name']) : '',
  ticker: tickerCreater(data['name']),
}))

console.log(result)

let output = JSON.stringify(result)

fs.writeFileSync('output.json', output)

// after retrieving jsonData for all ids from tmdb would run code below
// and concat using {...prevData, ...newData}

// const mapping2 = {
//   tagline: 'tagline',
//   releaseDate: 'release_date',
//   website: 'homepage',
//   highResPoster: 'poster_path', // host: 'https://image.tmdb.org/t/p/original'
//   highResBackdrop: 'backdrop_path', // host: 'https://image.tmdb.org/t/p/original'
// }

// result = formatJson(jsonData, mapping2).map(data => ({
//   ...data,
//   highResPoster: `https://image.tmdb.org/t/p/original${data['highResPoster']}`,
//   highResBackdrop: `https://image.tmdb.org/t/p/original${data['highResBackdrop']}`,
// }))
