# SilverSelect-node-express

## Instructions
Start node server with:
`npm run start`

Server runs on port 8080 as default, but can be changed with process.env.PORT

Current routes available:
```
GET /travel/hotels
GET /travel/hotels/[slug|id]
GET /travel/transportation
GET /travel/transportation/[slug|id]
GET /dining
GET /dining/[slug|id]
GET /activities
GET /activities/[slug|id]
GET /nightlife
GET /nightlife/[slug|id]
```

Meet Select API only accepts id for details endpoints but simple logic for URL slugs has been included. Caching slugs can be done with Redis or other in-memory store. Currently done in a simple `class`
```
http://localhost:8080/dining/928761
http://localhost:8080/dining/pennsylvania-6
```

## Silver Select Overview:

### The product:
Silver Select is a exclusive membership program for discerning travelers and diners of the older demographic. The product features similar offerings to its sister product, Meet Select. There are 3 types of memberships:
  * Full membership
  * Travel membership
  * $5 promotional trial

The Full membership grants access to:
  * Travel benefits, including secret hotel deals, transportation services, and lounge access
  * VIP Dining perks at fine establishments across multiple cities
  * Special deals on entertainment, lifestyle/shopping, and activities

The Travel and $5 trial only grant access to the travel benefits.

### The API:
These product offerings are supplied through the Meet Select API. All product categories have List and Detail endpoint, such as ‘hotels/:id’

User signup and payments are also processed through the Meet Select API, although, Silver Select must have its own user session store to enable log-in / log-out and authenticated access.

Secret deals are powered by Meet Select’s Priceline partnership. Meet Select has provided a special form for the booking search. Users that submit the form will be redirected to Meet Select domain. On this domain, users will encounter blurred out prices and be prompted with a $5 trial modal if they are not logged in-- a parameter that will be passed from Silver Select’s end.

Since the Priceline search results come from a proxied webpage, a special technique must be implemented to allow post-AJAX DOM manipulation, i.e. blur pricing and engage the modal.

All users (logged in or logged out) will be able to see the features, such as hotel partner, dining, travel search (except prices), entertainment, lifestyle offers, but only logged in users with a membership will be able to actually perform an action, such as redeem the offer.

### What has been accomplished:

The major initial step of the project was to define and research Meet Select’s capability to supply Silver Select with an API. At the start of scoping, Meet Select did not have an external API. Additionally, they had no way to modifying the Priceline search results page, nor an portable external form that could be used to redirect users to that page from their search.

Over the past month, I have worked diligently with the Meet Select dev team to address spec requirements for the API and other access points required to enable Silver Select.

The completed assets are listed below:
  * Wireframes converted to high fidelity mock-ups by the designer, Karolina
  * The Meet Select API (hosted by Meet Select, docs by Meet Select)
  * The Meet Select Travel Search form
  * Custom modals and effects on the Meet Select proxied Priceline search result page, though some styling may be required on their end. The HTML+CSS modals are complete and ready to be delivered for assistance.
  * A Node-Express server with hookups to Meet Select API, and slug mapping for SEO purposes
  * A tutorial for the solution to implementing the custom modals and effects on the proxied Priceline search results page.
  * HTML+CSS assets for all signup steps for all memberships (6 slide-down modals)

What is remaining:

Front-end assets:
  * HTML+CSS must be written for the front-end views. In total there actually only 4 or 5 views:
    * Homepage
    * Product offer category template (they look the same for all categories, just different data is loaded)
    * Product offer detail (they look the same for all offers, just different data is loaded)
    * Travel form (the form is supplied by Meet Select, it may need to be styled)
    * User account management page
    * All views are supplied data from the API or middleware server.

Front-end Hookups to API:
A middleware server is necessary in order to provide caching for the data from Meet Select API, as well as handle user session. The Node-Express server currently provides the data pulling from Meet Select API, caching logic but no caching (can be done by integrating Redis), nor user session (can easily be done with Express Sessions). However, front-end routing is entirely up to whomever picks up the project. Currently, the Node-Express server performs server-side routing, although a single page app is entirely appropriate as well if that is the direction taken.

As the Meet Select API is external facing, it is appropriate to interact with the API directly from the front-end as well. Request body validation has been implemented on their end for endpoints that require it, such as sign-up/log-in and payments.

### User sessions:
A simple user store can be implemented easily with the Express Sessions middleware, or a PaaS of your choice, e.g. Firebase.

### Rough Outline of Work:

Create HTML+CSS views and connect to API endpoints for product offerings
Add user session and caching to server
Connect modals to sign-up API
Add specific elements to appear if logged in and have membership

## Custom Modals on the Priceline Search Results Page
Meet Select implements a special reverse proxied search result page for the Priceline secret deals. Because all assets are served from Priceline, and they are minimized, and results appear via AJAX, it's hard to change the actual behavior of this page. However, there is a browser API that allows us to detect when AJAX elements have been loaded.

The [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) allows us to bind an event handler that triggers on any mutation of an element, as well as its children. With this browser API, we are able to detect when AJAX elements are modified, and modify them post render.

Xiaonin was able to implement the use of this browser method to perform custom changes to the Priceline results page, such as blurring of search results, and triggering custom modals. The current session state (logged in, not logged in) must be passed to the page via the search form, as the results page is on Meet Select's domain.

As we do not have access to Meet Select code (and I am unsure if they'd be comfortable with us mussing around with their core product's code), all requests to changes in logic and behavior are delegated through Janney.

## Modals
HTML+CSS modals are provided (with some animation flair for presentation purposes) in the `/modals` folder. These modals can simply be bound to a form that submits to the Node server for middleware validation before interface with Meet Select's API.