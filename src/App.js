import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyle from './assets/styles/GlobalStyle.js';
import HabitsPage from './pages/HabitsPage/HabitsPage.js';
import Header from './components/Header.js';
import HistoryPage from './pages/HistoryPage/HistoryPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import Menu from './components/Menu.js';
import { ProgressProvider } from './components/ProgressContext.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import TodayPage from './pages/TodayPage/TodayPage.js';
import { UserProvider } from './components/UserContext.js';

export default function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<UserProvider>
				<ProgressProvider>
					<Header />
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/cadastro" element={<RegisterPage />} />
						<Route path="/hoje" element={<TodayPage />} />
						<Route path="/habitos" element={<HabitsPage />} />
						<Route path="/historico" element={<HistoryPage />} />
					</Routes>
					<Menu />
				</ProgressProvider>
			</UserProvider>
		</BrowserRouter>
	);
}
