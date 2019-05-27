require("dotenv").config()

const axios = require('axios')
var unirest = require('unirest')



class ApiHandler {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  getFilms(codeCountry, typeMedia, currentPage) {

    // TODO: rellenar esta url cuando se sepa cual es el request exacto
    return axios.get(`https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?I%20Don&t=ns&cl=270&st=adv&ob=Relevance&p=${currentPage}&l=100&inc=&ao=and`
      , {
        headers: {
          "X-RapidAPI-Host": `${process.env.RapidAPIHost}`,
          "X-RapidAPI-Key": `${process.env.RapidAPIKey}`
        }
      })

      .then(response => {
        return response.data.ITEMS
      })
  }

  getImdbInfo(imbdId) {
    // TODO: rellenar esta url cuando se sepa cual es el request exacto
    console.log(typeof imbdId)
    return axios.get(`https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi/?t=imdb&q=${imbdId}`, {
      headers: {
        "X-RapidAPI-Host": `${process.env.RapidAPIHost}`,
        "X-RapidAPI-Key": `${process.env.RapidAPIKey}`
      }
    })
      .then(response => {
        return response.data.imdbinfo
      })

  }

}

module.exports = ApiHandler