/*
LogEvent: {
    time: Date,
    type: String,
}
*/

export const useLogger = () => {
	const session = JSON.parse(window.sessionStorage.getItem('logs'));
	const subject = JSON.parse(window.sessionStorage.getItem('subject'));
	const startTime =
		JSON.parse(window.sessionStorage.getItem('startOfSession')) ||
		new Date().getTime();

	const setLogs = (type, rest = {}) => {
		const time = new Date();
		let logEvent = {};
		// switch (type) {
		// 	case 'dissapearValueChange' || 'playTimeValueChange':
		// 		logEvent = {
		// 			from: args[0],
		// 			to: args[1],
		// 		};
		// 		break;
		// 	case 'login':
		// 		logEvent = {
		// 			...args[0],
		// 		};
		// 		break;
		// 	case 'play' || 'pause':
		// 		logEvent = {
		// 			videoTime: args[0],
		// 		};
		// 		break;
		// 	default:
		// 		logEvent = {
		// 			time: time-startTime,
		// 			type: type,
		// 		};
		// }
		// if (
		// 	type.includes('disappearValueChange') ||
		// 	type.includes('playTimeValueChange')
		// ) {

		// } else if (type === 'play' || type === 'pause') {
		// 	logEvent = {
		// 		videoTime: args[0],
		// 	};
		// }

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
