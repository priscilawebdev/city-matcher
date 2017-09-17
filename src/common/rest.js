import axios from 'axios'

class Rest {
	doGet(url) {
		return axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}

export default new Rest()
