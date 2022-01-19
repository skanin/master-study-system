import React from 'react';
import { useParams } from 'react-router-dom';

import Code from '../Code/Code';

import './Main.css';

function Main(props) {
	const { taskId } = useParams();

	const addPropsToChild = (child, props) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, props);
		} else {
			console.log('Invalid element: ', child);
			return child;
		}
	};

	return (
		<div className="main">
			<Code taskId={taskId} codeSnippets={props.codeSnippets} />
			{props.children instanceof Array
				? props.children.map((child, i) => {
						if (child.type.name === 'HelpVideo') {
							return addPropsToChild(child, {
								key: i,
								taskId: taskId,
								...child.props,
							});
						}
						return addPropsToChild(child, {
							key: i,
							taskId: taskId,
							...child.props,
						});
				  })
				: addPropsToChild(props.children, {})}
			{/* <PretestQuestions className="right" pretestId={taskId} /> */}
		</div>
	);
}

export default Main;
