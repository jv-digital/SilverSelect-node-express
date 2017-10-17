const express = require('express');
const router = express.Router();

// Require services.
const { hotels, transportation } = require('../services');

router.get('/:subcategory?/:slug?', (req, res) => {
	let id;
	switch(req.params.subcategory) {
		case 'hotels':
			if (req.params.slug) {
				id = hotels.slugs.slugOrId(req.params.slug);
				if (!id) {
					throw new Error('No id can be found for that slug alias.');
				}
				hotels.get([id])
					.then(data => {
						res.render('product', { data });
					})
					.catch(err => {
						res.render('product', { err });
					});
			} else {
				hotels.get()
					.then(data => {
						res.render('travel', { data });
					})
					.catch(err => {
						res.render('travel', { err });
					});
			}
			break;
		case 'transportation':
			if (req.params.slug) {
				id = transportation.slugs.slugOrId(req.params.slug);
				if (!id) {
					throw new Error('No id can be found for that slug alias.');
				}
				transportation.get([id])
					.then(data => {
						res.render('product', { data });
					})
					.catch(err => {
						res.render('product', { err });
					});
			} else {
				transportation.get()
					.then(data => {
						res.render('category', { data });
					})
					.catch(err => {
						res.render('category', { err });
					});
			}
			break;
			// Missing: Experiences & Access
		default:
			res.redirect('/travel/hotels');
	}
	
});

module.exports = router;