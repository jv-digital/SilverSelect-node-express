const express = require('express');
const router = express.Router();

// Require services.
const { dining } = require('../services');

router.get('/:slug?', (req, res) => {
	if (req.params.slug) {
		id = dining.slugs.slugOrId(req.params.slug);
		if (!id) {
			throw new Error('No id can be found for that slug alias.');
		}
		dining.get([id])
			.then(data => {
				res.render('product', { data });
			})
			.catch(err => {
				res.render('product', { err });
			});
	} else {
		dining.get()
			.then(data => {
				res.render('category', { data });
			})
			.catch(err => {
				res.render('category', { err });
			});
	}
});

module.exports = router;