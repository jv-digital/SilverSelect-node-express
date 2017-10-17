const EventEmitter = require('events');
const fetch = require('node-fetch');

const SlugMap = require('./SlugMap');
const key = require('./apiKey');

module.exports = class Service extends EventEmitter {
	constructor(name, endpoint) {
		super();
		this.name = name;
		this.slugs = new SlugMap(name);
		this.endpoint = (()=>{
			return endpoint[endpoint.length - 1] == '/' ? endpoint.slice(0, -1) : endpoint;
		})();
		this.ready = false;

		this.on('ready', () => (this.ready = true))

		this.instantiate().then(() => this.emit('ready')).catch(e => console.log(e));
	}

	buildUrl(params = [], queries = {}) {
		const url = `${this.endpoint}${params.map(i => i ? `/${i}` : '').toString().replace(',','')}/?api_key=${key}${Object.keys(queries).map(query => `&${query}=${queries[query]}`)}`;
		return url;
	}

	instantiate() {
		return fetch(this.buildUrl())
			.then(res => res.json())
			.then(res => {
				this.slugs.process(res.data, 'name');
				return res;
			})
			.catch(e => {throw e});
	}

	onReady(exec) {
		return new Promise((resolve, reject) => {
			this.on('ready', () => {
				return exec()
					.then(res => resolve(res))
					.catch(e => reject(e));
			})
		});
	}

	get() {
		const exec = () => {
			return fetch(this.buildUrl(...arguments))
				.then(res => {
					return res.json();
				})
				.catch(e => err);
		}

		if (this.ready) {
			return exec();
		} else {
			return this.onReady(exec);
		}
	}
}