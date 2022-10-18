import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styled from 'styled-components';

export default function RegisterPage() {
	return (
		<RegisterContainer>
			<img src={logo} alt="logo" />
			<form>
				<input type="email" placeholder="email" />
				<input type="password" placeholder="senha" />
				<input placeholder="nome" />
				<input type="url" placeholder="foto" />
				<button type="submit">Cadastrar</button>
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
		input {
			margin-bottom: 7px;
		}
		button {
			height: 35px;
			font-size: 20px;
			margin-bottom: 25px;
		}
	}
`;
