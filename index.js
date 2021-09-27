const PORT = 8000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()

const url = 'https://www.theguardian.com/uk'

axios(url)
	.then(response => {
		const html =response.data
		const $ = cheerio.load(html)
		const atricles = []

		$('.fc-item-title', html).each(function(){
			const title = $(this).text()
			const url = $(this).find('a').attr('href')
			atricles.push({
				title,
				url
			})
		})
		console.log(atricles)
	}).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on ${PORT}'))
