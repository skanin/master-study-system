import { React } from 'react';

import Plotting from '../Plotting/Plotting';

import './HelpVideo.css';
const HelpVideo = (props) => {
	return (
		<div className={props.className} id="videoBg">
			<Plotting taskId={props.taskId} fromStudy={true} />
		</div>
	);
};

export default HelpVideo;
