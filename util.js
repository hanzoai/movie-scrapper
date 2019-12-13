const isNumber = val => typeof val === 'number' && val === val
const checkDuplicates = {}
const tickerCreater = str => {
  if (!str) return ''
  const regex1 = /2019/g
  str = str.replace(regex1, '')
  const regex2 = /2020/g
  str = str.replace(regex2, '')
  const ticker = []
  let count = 0
  const regex3 = /^[A-Z]*$/
  Array.from(str).some(char => {
    if (isNumber(parseInt(char)) && count < 5) {
      ticker.push(char.toUpperCase())
      count++
    }
    if (regex3.test(char) && count < 5) {
      ticker.push(char.toUpperCase())
      count++
    }
    if (count === 5) {
      return true
    }
  })
  if (checkDuplicates[ticker]) return
  checkDuplicates[ticker] = true
  return ticker.join('')
}

const slugify = string => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

exports.slugify = slugify
exports.tickerCreater = tickerCreater
