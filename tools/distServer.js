import express from 'express'
import open from 'open'
import path from 'path'
import cors from 'cors'

/* eslint-disable no-console */

const port = process.env.PORT || 8080
const app = express()

app.use(cors())

app.use('/api', express.static(path.join(__dirname, '../api')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(port, (err) => {
	if (err) {
		console.log(err)
	} else {
		open(`http://localhost:${port}`)
	}
})
