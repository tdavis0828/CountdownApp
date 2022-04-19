import React, { useState, useEffect } from 'react';
import './App.css';

import UserInput from './components/UserInput';
import CountDown from './components/CountDown';

function App() {
	const [showUserInput, setShowUserInput] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem('name')) {
			setShowUserInput(true);
		}
	});
	return (
		<div className='App'>
			{showUserInput && <UserInput />}

			{!showUserInput && <CountDown />}
		</div>
	);
}

export default App;
