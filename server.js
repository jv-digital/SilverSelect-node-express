// Require express.
const express = require('express');
const path = require('path');

// Instantiate a new web app.
const app = express();

// Configure web application.
app.set('view engine', 'pug');

// Set public path (assets, etc).
// app.use(express.static(path.join(__dirname, 'public')));

// Setup routes to watch. (npm run serve)
app.use('/travel', require('./routes/travel'));
app.use('/activities', require('./routes/activities'));
app.use('/dining', require('./routes/dining'));
app.use('/nightlife', require('./routes/nightlife'));

app.get('/', (req, res) => {
	res.render('index', {});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`App instantiated and listening at port: ${port}`);
});
