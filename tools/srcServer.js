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
	publicPath: config.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler))
app.use('/api', express.static(path.join(process.cwd(), 'api')))
app.get('/', (req, res, next) => {
	const filename = path.join(compiler.outputPath, 'index.html')
	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if (err) {
			return next(err)
		}
		res.set('content-type', 'text/html')
		res.send(result)
		res.end()
	})
})

app.listen(port, (err) => {
	if (err) {
		console.log(err)
	} else {
		open(`http://localhost:${port}`)
	}
})
