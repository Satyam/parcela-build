// Window.prototype.localStorage
Window.polyfill.push(function () {
	function Storage() {}

	Storage.prototype = {
		clear: function () {
			getKeys(this).forEach(this.removeItem, this);
		},
		constructor: Storage,
		getItem: function () {
			var key = String(arguments[0]);

			return key in this ? this[key] : null;
		},
		key: function () {
			var index = parseInt(arguments[0], 10) || 0;

			return getKeys(this)[index] || null;
		},
		removeItem: function () {
			var key = String(arguments[0]);

			for (key in this) {
				delete this[key];

				--this.length;
			}

			updateKeys();
		},
		setItem: function () {
			var key = String(arguments[0]), value = String(arguments[1]);

			if (!(key in this)) {
				++this.length;
			}

			this[key] = value;

			updateKeys();
		}
	};

	function getKeys(object) {
		var buffer = [], key;

		for (key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key) && key !== 'length') {
				buffer.push(key);
			}
		}

		return buffer;
	}

	function updateKeys() {
		var unloadkeys = keys;

		keys = getKeys(localStorage);

		unloadkeys.concat(keys).forEach(function (key) {
			if (key in localStorage) {
				element.setAttribute(userdata + key, localStorage[key]);
			} else {
				element.removeAttribute(userdata + key);
			}
		});

		element.setAttribute(userdata, keys.join(','));

		element.save(userdata);
	}

	if (!this.localStorage) {
		var
		// set window
		window = this,
		// set localStorage
		localStorage = window.localStorage = new Storage(),
		// set storage element
		element = window.document.lastChild.lastChild.appendChild(window.document.createElement('x-local-storage')),
		// set userdata key and prefix
		userdata = 'userdata',
		keys;

		// proprietary ie local storage
		try {
			element.addBehavior('#default#' + userdata);
			element.load(userdata);
		} catch (error) {}

		// get keys
		keys = element.getAttribute(userdata) ? element.getAttribute(userdata).split(',') : [];

		localStorage.length = keys.length;

		// assign keys to localStorage
		keys.forEach(function (key) {
			localStorage[key] = element.getAttribute(userdata + key);
		});

		window.attachEvent('onunload', updateKeys);
	}
});
