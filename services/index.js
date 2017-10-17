const Service = require('./Service');

module.exports = {
	hotels: new Service('hotels', 'https://www.meetselect.com/api/silver_select/hotels'),
	transportation: new Service('transportation', 'https://www.meetselect.com/api/silver_select/travels'),
	activities: new Service('activities', 'https://www.meetselect.com/api/silver_select/activities'),
	dining: new Service('dining', 'https://www.meetselect.com/api/silver_select/dinings'),
	nightlife: new Service('nightlife', 'https://www.meetselect.com/api/silver_select/nightlifes')
};