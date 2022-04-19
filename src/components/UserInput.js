import React, { useState } from 'react';

import './UserInput.css';
export default function UserInput() {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [showForm, setShowForm] = useState(true);

	const nameHandler = (event) => {
		setName(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setDate(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		localStorage.setItem('name', name);
		localStorage.setItem('date', date);
		setShowForm(false);
		window.location.reload();
	};
	return (
		<div className='user-input'>
			{showForm && (
				<form onSubmit={submitHandler}>
					<input
						type='text'
						placeholder='Enter your name'
						onChange={nameHandler}
					/>

					<label>Enter the date when you joined</label>
					<input type='date' onChange={dateChangeHandler} />

					<input type='submit' value='Submit' />
				</form>
			)}
		</div>
	);
}
