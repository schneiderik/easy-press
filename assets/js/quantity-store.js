function get (key, callback) {
	let url;

	if (typeof key === 'function') {
		url = '/stock';
		callback = key;
	} else {
		url = `/stock/${key}`;
	}

	fetch(url)
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			callback(null, json);
		}).catch(function(ex) {
			callback(ex);
		});
}

function set (obj, callback) {
	fetch('/stock', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	}).then(function(response) {
			return response.json()
		}).then(function(json) {
			callback(null, json);
		}).catch(function(ex) {
			callback(ex);
		});
}

export default { get, set };
