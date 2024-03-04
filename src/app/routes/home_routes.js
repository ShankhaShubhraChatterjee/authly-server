const { Router } = require('express')
const { client } = require('./../utils/db')
const router = Router();


router.get('/', async (req, res) => {
	res.json({status: "OK"})
	res.end()
})
router.post('/', (req, res) => {
	const data = client.query('SELECT * FROM users WHERE uid=1', (err, data) => {
		if(err) {console.log(err.message)}
		else {
			res.json(data.rows[0])
		}
	})
})
module.exports = router;