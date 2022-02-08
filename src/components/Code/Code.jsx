import React from 'react';
import { useMountEffect } from '../../hooks';
import { Pre, Line, LineNo, LineContent } from './styles';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import Prism from 'prism-react-renderer/prism';
import { useSubject } from '../../hooks';

//

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-java');

function Code(props) {
	const taskId = props.taskId;
	const codeSnippets = props.codeSnippets;
	const [code, setCode] = React.useState('');
	const [subject] = useSubject();

	useMountEffect(() => {
		if (!codeSnippets.hasOwnProperty(taskId)) {
			setCode('');
			return;
		}
		setCode(codeSnippets[taskId]['code']);
		const lineNo = codeSnippets[taskId]['code'].split('\n').length;

		const codeSection = document.getElementById('codeSection');

		if (props.pretest) {
			codeSection.style.gridColumnEnd = '2';
		} else {
			if (
				(subject.helpType === 3 && codeSnippets[taskId]['help']) ||
				subject.helpType === 1
			) {
				codeSection.style.gridColumnEnd = '2';
				document.getElementById('videoBg').style.display = 'block';
			}
		}

		if (subject.helpType === 4) {
			// codeSection.style.fontSize = '1.15rem';
			codeSection.style.minHeight = '100%';
			codeSection.style.gridRowStart = '1';
			codeSection.style.gridRowEnd = '3';
			codeSection.style.overflow = 'visible';
		}

		if (lineNo < 40) {
			codeSection.style.fontSize = '1.2rem';
		}
	}, [subject]);

	return (
		<Highlight {...defaultProps} theme={theme} code={code} language="java">
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Pre className={className} style={style} id="codeSection">
					{tokens.map((line, i) => (
						<Line key={i} {...getLineProps({ line, key: i })}>
							<LineNo>{i + 1}</LineNo>
							<LineContent>
								{line.map((token, key) => (
									<span
										key={key}
										{...getTokenProps({ token, key })}
									/>
								))}
							</LineContent>
						</Line>
					))}
				</Pre>
			)}
		</Highlight>
	);
}

export default Code;
