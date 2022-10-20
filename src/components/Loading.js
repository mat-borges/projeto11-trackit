import { MagnifyingGlass } from 'react-loader-spinner';
import { baseColor } from '../constants/colors';
import styled from 'styled-components';

export default function Loading() {
	return (
		<LoadingContainer>
			<MagnifyingGlass width="120" color={baseColor} />
		</LoadingContainer>
	);
}

const LoadingContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;
