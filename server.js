const express = require('express')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use('/api', express.static(path.join(__dirname, 'api')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port, (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log(`http://localhost:${port}`)
	}
})
