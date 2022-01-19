import { React } from 'react';

import { useSubject } from '../../hooks';

import ReactPlayer from 'react-player';

const HelpVideo = (props) => {
	const [subject] = useSubject();

	return (
		<div className={props.className}>
			<h1>HelpType: {subject.helpType}</h1>
			{/* <ReactPlayer
				url={{ src: '../../data/Videos/task1.mp4', type: 'video/mp4' }}
				controls={true}
			/> */}
		</div>
	);
};

export default HelpVideo;
