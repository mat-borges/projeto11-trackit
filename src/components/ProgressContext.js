import { createContext, useState } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
	const [progress, setProgress] = useState({});
	const [percentage, setPercentage] = useState(0);
	const [progressBar, setProgressBar] = useState(false);

	return (
		<ProgressContext.Provider
			value={{ progress, setProgress, percentage, setPercentage, setProgressBar, progressBar }}>
			{children}
		</ProgressContext.Provider>
	);
}

export default ProgressContext;
