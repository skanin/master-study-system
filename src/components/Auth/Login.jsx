import { React, useEffect, useState } from 'react';
import { Form, Label, FormGroup, Input } from 'reactstrap';
import { useSubject, useMountEffect, useLogger } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, fetch } from './AuthHelperMethods';
import './Login.css';

const Login = () => {
	const [setLogs] = useLogger();
	const [subject, setSubject] = useSubject();
	const [username, setUsername] = useState();
	const [invalid, setInvalid] = useState(false);
	const [responseMsg, setResponseMsg] = useState();
	const navigate = useNavigate();

	const checkAccess = async () => {
		await isAuthenticated(subject)
			.then((res) => {
				if (subject.helpType !== 4) {
					navigate('/master-study-system');
				} else {
					navigate('/master-study-system/info');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useMountEffect(() => {
		checkAccess();
	});

	const setSubjectAsyc = async (subject) => {
		return Promise.resolve(setSubject(subject));
	};

	const onButtonClick = () => {
		fetch('post', '/login', { ...subject, username: username })
			.then((res) => {
				if (res.status === 200) {
					setLogs('login', res.data.subject);
					setInvalid(false);
					setSubjectAsyc({
						...subject,
						username: res.data.username,
						helpType: res.data.helpType,
						subject: res.data.subject,
					}).then(() => {
						if (res.data.helpType !== 4) {
							navigate('/master-study-system');
						} else {
							navigate('/master-study-system/info');
						}
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
