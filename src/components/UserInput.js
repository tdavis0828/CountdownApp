import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import clock from '../img/clock.png'

const ImgWrapper = styled.div`
	height: 100%;
	width: 100%;
	background-image: url(${clock});
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: fixed;
	background-size: cover;
`

const UIWrapper = styled.div`
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	form{
		height: 100%;
		width: 80%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		text-align: left;
	}
	label{
		margin-top: 20px;
	}
	input{
		color: #000000;
	}
	.inputButton{
		margin: 0 auto;
		background-color: #000000;
		color: #ffffff;
		width: 100%;
		&:hover{
			background-color: #ffffff;
			color: #000000;
		}
	}
	.dateInput{
		text-align: center;
		margin-bottom: 20px;
	}
	@media (min-width: 768px){
		form{
			width: 20%;
		}
        .inputButton{
			margin: 0 auto;
            width: 100%;
        }
    }
`

export default function UserInput() {
	const [name, setName] = useState('');
	const [purpose, setPurpose] = useState('');
	const [date, setDate] = useState('');
	const [showForm, setShowForm] = useState(true);
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		if( name.length > 0 && purpose.length > 0 && date.length > 0){
			setIsDisabled(false);
		}
	}, [name, date, purpose]);

	const nameHandler = (event) => {
		setName(event.target.value);
	};

	const purposeHandler = (event) => {
		setPurpose(event.target.value);
	}

	const dateChangeHandler = (event) => {
		setDate(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		localStorage.setItem('name', name);
		localStorage.setItem('purpose', purpose);
		localStorage.setItem('date', date);
		setShowForm(false);
		window.location.reload();
	};
	return (
		<ImgWrapper>
			<UIWrapper>
				{showForm && (
					<form onSubmit={submitHandler}>
						<label>Enter Name</label>
							<input
								type='text'
								placeholder='Jane Doe'
								onChange={nameHandler}
							/>
						<label>Enter Event</label>
							<input
								type='text'
								placeholder='First day at new company!'
								onChange={purposeHandler}
							/>
						<label>Enter Date</label>
						<input className='dateInput' type='date' onChange={dateChangeHandler} />
						<input className='inputButton' type='submit' value='Submit' disabled={isDisabled} />
					</form>
				)}
			</UIWrapper>
		</ImgWrapper>
	);
}
