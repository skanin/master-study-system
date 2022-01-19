import { React, useEffect } from 'react';

import Home from './components/Home/Home';
import Main from './components/Main/Main';
import InformationPage from './components/InformationPage/InformationPage';
import Login from './components/Auth/Login';
import PretestQuestions from './components/Pretest/PretestQuestions';

import pretestCodesnippets from './data/code_snippets_pretest.json';
import studyQuestions from './data/questions_study.json';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import { Route, Routes, useLocation } from 'react-router-dom';
import HelpVideo from './components/Study/HelpVideo';
import StudyQuestion from './components/Study/StudyQuestion';

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
				<Main codeSnippets={pretestCodesnippets}>
					<PretestQuestions className="right pretestRight" />
				</Main>
			</PrivateRoute>
		),
	},
	{
		path: '/master-study-system/task/:taskId',
		element: (
			<PrivateRoute>
				<Main codeSnippets={pretestCodesnippets}>
					<HelpVideo className="right studyRight" />
					<StudyQuestion
						questions={studyQuestions}
						className="bottom"
					/>
				</Main>
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

function CustomRouter() {
	const theLocation = useLocation();

	const pathArr = theLocation.pathname.split('/');

	const currentLocation =
		pathArr.length === 2 ? pathArr[1] : pathArr.slice(2).join(' ');

	useEffect(() => {
		document.title = `
        ${currentLocation[0].toUpperCase()}${currentLocation.slice(1)}`;
	}, [currentLocation]);

	return (
		<Routes>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={route.element} />
			))}
		</Routes>
	);
}

export default CustomRouter;
