function findStorageItems(query) {
	var i;
	let results = {};
	for (i in window.sessionStorage) {
		if (window.sessionStorage.hasOwnProperty(i)) {
			if (i.match(query) || (!query && typeof i === 'string')) {
				const value = JSON.parse(window.sessionStorage.getItem(i));
				// results.push({ key: i, val: value });
				results[i] = value;
			}
		}
	}
	return results;
}

export const useStudyAnswers = () => {
	const getStudyAnswers = (taskId = -1) => {
		if (taskId === -1) {
			console.log(
				'useStudyAnswers: taskId is -1: ',
				findStorageItems(/^studyTask\d+/)
			);
			return findStorageItems(/^studyTask\d+/);
		}

		if (taskId instanceof Array) {
			let items = findStorageItems(/^studyTask\d+/);
			let keys = Object.keys(items).map((key) =>
				parseInt(key.match(/\d+/)[0])
			);
			for (let id of taskId) {
				if (!keys.includes(id)) {
					// items.push({ key: `studyTask${id}`, val: '' });
					items[`studyTask${id}`] = null;
				}
			}
			console.log(items);
			return items;
		}

		const session = window.sessionStorage.getItem(`studyTask${taskId}`);
		return JSON.parse(session);
	};

	const setStudyAnswers = (taskId, studyAnswers) => {
		window.sessionStorage.setItem(
			`studyTask${taskId}`,
			JSON.stringify(studyAnswers)
		);
	};

	return [getStudyAnswers, setStudyAnswers];
};
