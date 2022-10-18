import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styled from 'styled-components';

export default function LoginPage() {
	return (
		<LoginContainer>
			<img src={logo} alt="logo" />
			<form>
				<input type="email" placeholder="email" />
				<input type="password" placeholder="senha" />
				<button type="submit">Entrar</button>
			</form>
			<Link to="/cadastro">
				<p>Não tem uma conta? Cadastre-se!</p>
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
			width: 95%;
			margin-bottom: 7px;
		}
		button {
			width: 100%;
			height: 35px;
			margin-bottom: 25px;
			font-size: 20px;
		}
	}
`;
