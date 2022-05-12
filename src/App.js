import React, { useState, useEffect } from 'react';
import UserInput from './components/UserInput';
import CountDown from './components/CountDown';
import styled from 'styled-components';

const AppWrapper = styled.main`
	height: 100vh;
	width: 100vw;
`

function App() {
	const [showUserInput, setShowUserInput] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem('name')) {
			setShowUserInput(true);
		}
	});
	return (
		<AppWrapper>
			{showUserInput && <UserInput />}
			{!showUserInput && <CountDown />}
		</AppWrapper>
	);
}

export default App;
