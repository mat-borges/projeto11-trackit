import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { BASE_URL } from '../../constants/urls.js';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../components/UserContext.js';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import styled from 'styled-components';

export default function LoginPage() {
	const navigate = useNavigate();
	const [logginIn, setLoggingIn] = useState(false);
	const [user, setUser] = useState({ email: '', password: '' });
	const { setUserInfo } = useContext(UserContext);

	function logIn(e) {
		e.preventDefault();
		setLoggingIn(true);
		axios
			.post(`${BASE_URL}/auth/login`, user)
			.then((res) => {
				setUserInfo(res.data);
				navigate('/hoje');
			})
			.catch((err) => {
				console.log(err.response.data);
				alert(`${err.response.data.message}`);
				setLoggingIn(false);
			});
	}

	function email(value) {
		const newUser = { ...user };
		newUser.email = value;
		setUser(newUser);
	}
	function password(value) {
		const newUser = { ...user };
		newUser.password = value;
		setUser(newUser);
	}

	return (
		<LoginContainer color={logginIn === true ? '#f2f2f2' : '#ffffff'}>
			<img src={logo} alt="logo" />
			<form onSubmit={logIn}>
				<input
					type="email"
					placeholder="email"
					required
					disabled={logginIn === true ? 'disabled' : ''}
					value={user.email}
					onChange={(e) => email(e.target.value)}
					data-identifier="input-email"
				/>
				<input
					type="password"
					placeholder="senha"
					required
					disabled={logginIn === true ? 'disabled' : ''}
					value={user.password}
					onChange={(e) => password(e.target.value)}
					data-identifier="input-password"
				/>
				<button
					type="submit"
					disabled={logginIn === true ? 'disabled' : ''}
					data-identifier="login-btn">
					{logginIn === true ? <ThreeDots color="#ffffff" /> : 'Entrar'}
				</button>
			</form>
			<Link to="/cadastro">
				<p data-identifier="sign-up-action">Não tem uma conta? Cadastre-se!</p>
			</Link>
		</LoginContainer>
	);
}

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	height: 100vh;
	padding: 70px 0;
	background-color: #ffffff;
	margin: 0 auto;
	img {
		width: 180px;
		height: 180px;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 303px;
		input {
			background-color: ${(props) => props.color};
			width: 95%;
			margin-bottom: 7px;
		}
		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 35px;
			margin-bottom: 25px;
			font-size: 20px;
		}
	}
`;
