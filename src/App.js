import { React, useEffect } from 'react';

import Home from './components/Home/Home';
import Main from './components/Main/Main';
import InformationPage from './components/InformationPage/InformationPage';
import Login from './components/Auth/Login';
import PretestQuestions from './components/Pretest/PretestQuestions';

import pretestCodesnippets from './data/code_snippets_pretest.json';
import studyQuestions from './data/questions_study.json';
import CustomRouter from './CustomRouter';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
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

function App() {
	return (
		<Router>
			<CustomRouter />;
		</Router>
	);

	// <Router>
	// 	<Routes>
	// 		<Route path="/master-study-system/login" element={<Login />} />
	// 		<Route
	// 			path="/master-study-system/Info"
	// 			element={
	// 				<PrivateRoute>
	// 					<InformationPage />
	// 				</PrivateRoute>
	// 			}
	// 		/>
	// 		<Route
	// 			path="/master-study-system/pretest/:taskId"
	// 			element={
	// 				<PrivateRoute>
	// 					<Main codeSnippets={pretestCodesnippets}>
	// 						<PretestQuestions className="right pretestRight" />
	// 					</Main>
	// 				</PrivateRoute>
	// 			}
	// 		/>
	// 		<Route
	// 			path="/master-study-system/task/:taskId"
	// 			element={
	// 				<PrivateRoute>
	// 					<Main codeSnippets={pretestCodesnippets}>
	// 						<HelpVideo className="right studyRight" />
	// 						<StudyQuestion
	// 							questions={studyQuestions}
	// 							className="bottom"
	// 						/>
	// 					</Main>
	// 				</PrivateRoute>
	// 			}
	// 		/>
	// 		<Route
	// 			path="/master-study-system"
	// 			element={
	// 				<PrivateRoute>
	// 					<Home />
	// 				</PrivateRoute>
	// 			}
	// 		/>
	// 	</Routes>
	// </Router>
}

export default App;
