const formatJson = (jsonData, mapping) => {
  let formattedData = jsonData.map(movie =>
    Object.fromEntries(
      Object.entries(mapping).map(([key, value]) => [key, movie[value]]),
    ),
  )

  return formattedData
}

exports.formatJson = formatJson
