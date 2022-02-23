/*
LogEvent: {
    time: Date,
    type: String,
}
*/

export const useLogger = () => {
	const subject = JSON.parse(window.sessionStorage.getItem('subject'));
	const startTime =
		JSON.parse(window.sessionStorage.getItem('startOfSession')) ||
		new Date().getTime();

	const setLogs = (type, rest = {}) => {
		const session = JSON.parse(window.sessionStorage.getItem('logs'));
		const time = new Date();
		let logEvent = {};

		logEvent = {
			...rest,
			time: time - startTime,
			type: type,
			...subject,
		};

		if (!session) {
			window.sessionStorage.setItem('logs', JSON.stringify([logEvent]));
		} else {
			session.push(logEvent);
			window.sessionStorage.setItem('logs', JSON.stringify(session));
		}
	};

	const getLogs = () => {
		return JSON.parse(window.sessionStorage.getItem('logs'));
	};

	return [setLogs, getLogs];
};
