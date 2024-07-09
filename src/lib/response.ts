export function handleJsonResponse(response: Response): Promise<Record<string, unknown>> {
	if (response.ok) {
		return response.json();
	}

	if (response.statusText) {
		return Promise.resolve({
			message: response.statusText,
			status: response.status
		});
	}

	return response.json().then(
		(err) => Promise.reject({ ...err, status: response.status }),
		() => Promise.reject({ message: 'response error', status: response.status })
	);
}
