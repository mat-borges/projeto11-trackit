import { baseColor, textColor } from '../../constants/colors';

import styled from 'styled-components';

export default function HistoryPage() {
	return (
		<HistoryContainer>
			<HistoryHeader>
				<h1>Histórico</h1>
				<h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
			</HistoryHeader>
		</HistoryContainer>
	);
}

const HistoryContainer = styled.div`
	margin: 70px 18px;
`;

const HistoryHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 25px;
	padding-top: 23px;
	h1 {
		color: ${baseColor};
		font-size: 23px;
		line-height: 29px;
		margin-bottom: 20px;
	}
	h2 {
		color: ${textColor};
		font-size: 18px;
		line-height: 22px;
	}
`;
