import { React, useEffect, useState } from 'react';
import { Form, Label, FormGroup, Input } from 'reactstrap';
import { useSubject } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, fetch } from './AuthHelperMethods';
import './Login.css';

const Login = () => {
	const [subject, setSubject] = useSubject();
	const [username, setUsername] = useState();
	const [invalid, setInvalid] = useState(false);
	const [responseMsg, setResponseMsg] = useState();
	const navigate = useNavigate();

	const checkAccess = async () => {
		await isAuthenticated(subject)
			.then((res) => {
				navigate('/master-study-system');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		checkAccess();
	});

	const setSubjectAsyc = async (subject) => {
		return Promise.resolve(setSubject(subject));
	};

	const onButtonClick = () => {
		fetch('post', '/login', { ...subject, username: username })
			.then((res) => {
				if (res.status === 200) {
					setInvalid(false);
					setSubjectAsyc({
						...subject,
						username: username,
						helpType: res.data.helpType,
						subject: res.data.subject,
					}).then(() => {
						navigate('/master-study-system');
					});
				}
			})
			.catch((err) => {
				if (err.response.status === 403) {
					setResponseMsg(err.response.data);
					setInvalid(true);
				}
			});
	};

	return (
		<div>
			<div id="loginForm">
				<Form
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<FormGroup>
						<Label for="username">Username</Label>
						<Input
							name="username"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</FormGroup>
					<button onClick={onButtonClick}>Submit</button>
				</Form>
				{invalid && (
					<p style={{ color: 'red', marginTop: '2%' }}>
						{responseMsg}
					</p>
				)}
			</div>
		</div>
	);
};

export default Login;
