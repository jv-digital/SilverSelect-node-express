// Replace with whatever cache utility as desired, e.g. Redis.

module.exports = class Cache {
	constructor() {
		this.store = {};
	}

	get(key) {
		return this.store[key] || null;
	}

	set(key, val) {
		this.store[key] = val;
		return [key, this.store[key]];
	}
}
