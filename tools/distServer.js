import express from 'express'
import open from 'open'
import path from 'path'
import cors from 'cors'
import compression from 'compression'

/* eslint-disable no-console */

const port = process.env.PORT || 8080
const app = express()


app.use(cors())
app.use(compression())
app.use(express.static('dist'))
app.use('/api', express.static(path.join(process.cwd(), 'api')))
app.get('/', (req, res) => {
	res.sendFile(path.join(process.cwd(), 'dist/index.html'))
})

app.listen(port, (err) => {
	if (err) {
		console.log(err)
	} else {
		open(`http://localhost:${port}`)
	}
})
