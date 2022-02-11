import { React, useEffect } from 'react';

import Home from './components/Home/Home';
import Main from './components/Main/Main';
import InformationPage from './components/InformationPage/InformationPage';
import Login from './components/Auth/Login';
import Plotting from './components/Plotting/Plotting';

import PretestQuestions from './components/Pretest/PretestQuestions';

import pretestCodesnippets from './data/code_snippets_pretest.json';
import studyCodesnippets from './data/code_snippets_study.json';
import studyQuestions from './data/questions_study.json';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import { Route, Routes, useLocation } from 'react-router-dom';
import HelpVideo from './components/Study/HelpVideo';
import StudyQuestion from './components/Study/StudyQuestion';
import Summary from './components/Summary/Summary';

import { useSubject } from './hooks';

function CustomRouter() {
	const [subject] = useSubject();
	const routes = [
		{
			path: '/master-study-system/login',
			element: <Login />,
		},
		{
			path: '/master-study-system/Info',
			element: (
				<PrivateRoute>
					<InformationPage />
				</PrivateRoute>
			),
		},
		{
			path: '/master-study-system/pretest/:taskId',
			element: (
				<PrivateRoute>
					<Main codeSnippets={pretestCodesnippets} pretest={true}>
						<PretestQuestions className="right pretestRight" />
					</Main>
				</PrivateRoute>
			),
		},
		{
			path: '/master-study-system/task/:taskId',
			element: (
				<PrivateRoute>
					<Main codeSnippets={studyCodesnippets} pretest={false}>
						<HelpVideo
							codeSnippets={studyCodesnippets}
							className="right studyRight"
							id="helpSection"
						/>
						<StudyQuestion
							questions={studyQuestions}
							className="bottom"
							show={subject.helpType !== 4}
						/>
					</Main>
				</PrivateRoute>
			),
		},
		{
			path: '/master-study-system/plotting',
			element: <Plotting />,
		},
		{
			path: '/master-study-system/summary',
			element: (
				<PrivateRoute>
					<Summary questions={studyQuestions} />
				</PrivateRoute>
			),
		},
		{
			path: '/master-study-system/thanks',
			element: (
				<div style={{ padding: '2rem' }}>
					<h1>Thank you!</h1>
					<div>
						<p>
							You are now done. Please leave this page open when
							you leave the computer.
						</p>
					</div>
				</div>
			),
		},
		{
			path: '/master-study-system/plotting',
			element: (
				<Plotting
					codeSnippets={studyCodesnippets}
					pretest={false}
					taskId={3}
					fromStudy={false}
					test="Hallo"
				/>
			),
		},
		{
			path: '/master-study-system/',
			element: (
				<PrivateRoute>
					<Home />
				</PrivateRoute>
			),
		},
		{
			path: '/master-study-system',
			element: (
				<PrivateRoute>
					<Home />
				</PrivateRoute>
			),
		},
	];

	const theLocation = useLocation();

	let pathArr = theLocation.pathname.split('/');

	useEffect(() => {
		if (pathArr[pathArr.length - 1] == '-') {
			pathArr = pathArr.slice(0, pathArr.length - 1);
		}
		const currentLocation =
			pathArr.length === 2 ? pathArr[1] : pathArr.slice(2).join(' ');
		document.title = `
        ${currentLocation[0].toUpperCase()}${currentLocation.slice(1)}`;
	}, [pathArr]);

	return (
		<Routes>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={route.element} />
			))}
		</Routes>
	);
}

export default CustomRouter;
