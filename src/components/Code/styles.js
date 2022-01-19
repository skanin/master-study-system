import styled from 'styled-components';

export const Wrapper = styled.div`
	font-family: sans-serif;
	text-align: center;
`;

export const Pre = styled.pre`
	text-align: left;
	//   margin: 1em 0;
	padding: 0.5em;
	overflow: hidden;
	min-height: 80%;
	& .token-line {
		line-height: 1.3em;
		height: 1.3em;
	}
	margin: 0;
	grid-column: 1;
`;

export const Line = styled.div`
	display: table-row;
	font-size: 70%;
`;

export const LineNo = styled.span`
	display: table-cell;
	text-align: right;
	padding-right: 1em;
	user-select: none;
	opacity: 0.5;
`;

export const LineContent = styled.span`
	display: table-cell;
`;
