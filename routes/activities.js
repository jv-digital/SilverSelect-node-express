const express = require('express');
const router = express.Router();

// Require services.
const { activities } = require('../services');

router.get('/:slug?', (req, res) => {
	if (req.params.slug) {
		id = activities.slugs.slugOrId(req.params.slug);
		if (!id) {
			throw new Error('No id can be found for that slug alias.');
		}
		activities.get([id])
			.then(data => {
				res.render('product', { data });
			})
			.catch(err => {
				res.render('product', { err });
			});
	} else {
		activities.get()
			.then(data => {
				res.render('category', { data });
			})
			.catch(err => {
				res.render('category', { err });
			});
	}
});

module.exports = router;