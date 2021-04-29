const Requester = {
	async requestData() {
		const apiKey = '1be9a6884abd4c3ea143b59ca317c6b2';
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
