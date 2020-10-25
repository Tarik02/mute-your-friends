export const waitForProcessInterrupt = () => new Promise(resolve => {
	const callback = () => {
		process.removeListener('SIGINT', callback);
		resolve();
	};

	process.addListener('SIGINT', callback);
});
