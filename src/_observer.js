// NOT USED

const handler = function () {
	return {
		get: function (obj, prop) {
			// Recursive handler for nested state
			if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1) {
				return new Proxy(obj[prop], handler());
			}
			return obj[prop];
		},
		set: function (obj, prop, value) {
			console.log('set');
			obj[prop] = value;
			return true;
		}
	};
};

export const observable = (obj) => {
	console.log(this);
	return new Proxy(obj, handler())
}