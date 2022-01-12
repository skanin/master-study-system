const updateSubject = (value) => {
	if ('subject' in value && 'helpType' in value) {
		return {
			type: 'SET_SUBJECT_AND_HELP_TYPE',
			payload: value,
		};
	}

	if ('subject' in value) {
		return {
			type: 'SET_SUBJECT',
			payload: value,
		};
	}

	if ('helpType' in value) {
		return {
			type: 'SET_HELP_TYPE',
			payload: value,
		};
	}
};

export { updateSubject };
