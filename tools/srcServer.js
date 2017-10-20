import express from 'express'
import open from 'open'
import webpack from 'webpack'
import path from 'path'
import cors from 'cors'
import config from '../webpack.config.dev'

/* eslint-disable no-console */

const port = process.env.PORT || 3000
const app = express()
const compiler = webpack(config)

app.use(cors())

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	compress: true,
	publicPath: config.output.publicPath,
	contentBase: path.join(__dirname, 'public')
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static('public'))
app.use('/api', express.static(path.join(__dirname, '../api')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(port, (err) => {
	if (err) {
		console.log(err)
	} else {
		open(`http://localhost:${port}`)
	}
})

