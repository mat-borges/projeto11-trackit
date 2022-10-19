import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../../constants/urls';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import styled from 'styled-components';
import { useState } from 'react';

export default function RegisterPage() {
	const [registering, setRegistering] = useState(false);
	const [user, setUser] = useState({ email: '', name: '', image: '', password: '' });
	const navigate = useNavigate();

	function register(e) {
		e.preventDefault();
		setRegistering(true);
		axios
			.post(`${BASE_URL}/auth/sign-up`, user)
			.then((res) => {
				console.log(res.data);
				navigate('/');
			})
			.catch((err) => {
				console.log(err.response.data);
				alert(err.response.data.message);
				setRegistering(false);
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
	function nome(value) {
		const newUser = { ...user };
		newUser.name = value;
		setUser(newUser);
	}
	function image(value) {
		const newUser = { ...user };
		newUser.image = value;
		setUser(newUser);
	}
	console.log(user);

	return (
		<RegisterContainer color={registering === true ? '#f2f2f2' : '#ffffff'}>
			<img src={logo} alt="logo" />
			<form onSubmit={register}>
				<input
					type="email"
					placeholder="email"
					required
					value={user.email}
					onChange={(e) => email(e.target.value)}
				/>
				<input
					type="password"
					placeholder="senha"
					required
					value={user.password}
					onChange={(e) => password(e.target.value)}
				/>
				<input
					placeholder="nome"
					required
					value={user.name}
					onChange={(e) => nome(e.target.value)}
				/>
				<input
					type="url"
					placeholder="foto"
					required
					value={user.image}
					onChange={(e) => image(e.target.value)}
				/>
				<button type="submit">
					{registering === true ? (
						<ThreeDots
							height="80"
							width="80"
							radius="9"
							color="#ffffff"
							ariaLabel="three-dots-loading"
							wrapperStyle={{}}
							wrapperClassName=""
							visible={true}
						/>
					) : (
						'Cadastrar'
					)}
				</button>
			</form>
			<Link to="/">
				<p>Já tem uma conta? Faça Login!</p>
			</Link>
		</RegisterContainer>
	);
}

const RegisterContainer = styled.div`
	background-color: #ffffff;
	box-sizing: border-box;
	height: 100vh;
	padding: 70px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
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
			font-size: 20px;
			margin-bottom: 25px;
		}
	}
`;
