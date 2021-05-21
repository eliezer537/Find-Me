const Requester = {
	async requestData() {
		const apiKey = 'a8f797f1d83e4368b3357e12926da47d';
		try {
			const response = await fetch(
				`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`
			);

			if (response.status === 401) {
				throw 'Invalid API key';
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Failed Request!');
		}
	},
};

export { Requester };
