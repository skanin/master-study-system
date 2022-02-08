import { React } from 'react';

import { useMountEffect, useSubject } from '../../hooks';
import Plotting from '../Plotting/Plotting';

import './HelpVideo.css';

const HelpVideo = (props) => {
	const [subject] = useSubject();

	return (
		<div className={props.className} id="videoBg">
			<Plotting taskId={props.taskId} fromStudy={true} />
		</div>
	);
};

export default HelpVideo;
