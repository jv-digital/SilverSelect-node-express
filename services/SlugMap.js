// Maps entry id to slugs for use in URL SEO.
// E.g. instead of hotel id '68', slug is 'the-standard-hollywood'
// Some entries may not contain a slug data property, so we have to create one.

const Cache = require('../utils/Cache');

class SlugMap extends Cache {
	constructor(namespace) {
		super();
		this.namespace = namespace;
	}

	static createSlug(string) {
		function recursiveReplace(input) {
			let output = input.replace(/\s/g, '-').replace(/--/g, '-');
			if (output == input) {
				return output;
			} else {
				return recursiveReplace(output);
			}
		}
		return recursiveReplace(string).toLowerCase();
	}

	get(key) {
		const slugged = SlugMap.createSlug(key);
		return super.get(slugged);
	}

	set(key, val) {
		// slug might be in data object
		const slugged = (val.slug ? val.slug.toLowerCase() : null) || SlugMap.createSlug(key);
		super.set(slugged, val);
		return super.get(slugged);
	}

	process(arr, keyMap) {
		// arr: array of objects
		// keyMap: string that represents the property that contains the cache key. E.g. 'name'
		arr.forEach(entry => {
			const key = entry[keyMap];
			this.set(key, entry);
		});
		return true;
	}

	slugOrId(slug) {
		// If input slug is a number, return the id as a number;
		// If input slug is not a number, try to find the id in slugs and return the id as a number.
			// If id cannot be found in slugs, return false; 
		let result = false;

		const check = Number(slug);
		if (!Number.isNaN(check) && typeof check == 'number') {
			result = slug;
		} else if (this.get(slug) && this.get(slug).id) {
			result = Number(this.get(slug).id);
		} else {
			result = false;
		}
		return result;
	}
}

module.exports = SlugMap;