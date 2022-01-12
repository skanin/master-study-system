import React, { useEffect } from 'react';
import { Pre, Line, LineNo, LineContent } from './styles';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import Prism from 'prism-react-renderer/prism';

import codeSnippets from './code_snippets.json';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-java');

function PretestCode(props) {
	const pretestId = props.pretestId;

	const [code, setCode] = React.useState('');

	useEffect(() => {
		if (!codeSnippets.hasOwnProperty(pretestId)) {
			setCode('');
			return;
		}
		setCode(codeSnippets[pretestId]);
	}, [pretestId]);

	return (
		<Highlight {...defaultProps} theme={theme} code={code} language="java">
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Pre className={className} style={style}>
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

export default PretestCode;
