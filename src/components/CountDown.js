import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRandomInt } from '../utils/functions';
import inspirJoke from '../inspirJoke.json'

const BkgdWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: ${props => `url(${props.img})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    overflow: hidden;
    .textOne, .textTwo{
        font-family: ${props => `${props.font}`}
    }
`
//background-image: url(${cd});
//font-family: ${props => `${props.font}`}

const OpacWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
`

const CDWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    h1{
        margin-top: -65px;
    }
    h2{
        margin-top: 10px;
    }
    h3{
        margin-top: 10px;
        margin-bottom: 20px;
    }
    button{
        margin: 0 auto;
        width: 30%;
        background-color: #000000;
        &:hover{
            color: #000000;
            background-color: #ffffff;
        }
    }
    @media (min-width: 1440px){
        width: 30%;
        button{
            width: 20%;
        }
    }
`

export default function CountDown() {
    const [startedDate, setStartedDate] = useState('');
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [data, setData] = useState({}); //data.hours, data.mins, data.secs, data.days
    const [isEvent, setIsEvent] = useState(false);
    const [calDay, setCalDay] = useState(0);
    const [joiTextOne, setJoiTextOne] = useState('');
    const [joiTextTwo, setJoiTextTwo] = useState('');
    const [bkgdImg, setBkgdImg] = useState('');
    const [curFont, setCurFont] = useState('');

    const resetHandler = (event) => {
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        if (isEvent){
            setBkgdImg(`${process.env.PUBLIC_URL}/images/isEvent.png`)
        } else{
            let tempDate = new Date();
            setCalDay(tempDate.getUTCDate());   //setCalDay(1-31)
            const jokeOrInspire = getRandomInt(1, 2);
            if (jokeOrInspire === 1){
                const allInspireText = inspirJoke.map(theText => theText.inspirational);
                const allQuoterText = inspirJoke.map(theText => theText.quoter)
                setJoiTextOne(allInspireText[calDay])
                setJoiTextTwo(allQuoterText[calDay])
                setBkgdImg(`${process.env.PUBLIC_URL}/images/inspire_${calDay}.png`);
                setCurFont(`'Dancing Script', cursive`);
            } else {
                const allJokeText = inspirJoke.map(theText => theText.joke);
                const allPlineText = inspirJoke.map(theText => theText.punchline);
                setJoiTextOne(allJokeText[calDay]);
                setJoiTextTwo(allPlineText[calDay]);
                setBkgdImg(`${process.env.PUBLIC_URL}/images/funny_${calDay}.png`)
                setCurFont(`'Reenie Beanie', cursive`);
            }
        }
    }, [calDay, isEvent])

    useEffect(() => {
        let newDate = new Date();
        let eventDate = new Date(startedDate);
        eventDate.setDate(eventDate.getDate() + 1); //add a day because function isnt alligned
        if(newDate.getDate() <= eventDate.getDate()){
            setIsEvent(false);
        } else{
            setIsEvent(true);
        }
    }, [startedDate])

    useEffect(() => {
        if (localStorage.getItem('date')) {
            // yeah, this is nice
            // For Muhammad Ali
            let startedDate = localStorage.getItem('date');
            setStartedDate(startedDate);

            startedDate = parseDate(startedDate);
            var today = new Date();

            let days;

            days = getDifferenceInDays(startedDate, today); //15.9282727272

            let dayAr = splitOnDot(days); //[15, 9282727272];

            days = dayAr[0]; //15

            let remaingDays = dayAr[1]; //9282727272
            remaingDays = '0.' + remaingDays; // '0.9282727272'
            let hours = Number(remaingDays) * 24; // 23.282882
            let hoursArr = splitOnDot(hours); // [23,282882]

            hours = hoursArr[0]; //23

            let remaingHrs = hoursArr[1]; //282882
            remaingHrs = '0.' + remaingHrs; //'0.282882'
            let mins = Number(remaingHrs) * 60; // 15.26223
            let minsArr = splitOnDot(mins); // [15,26223]
            mins = minsArr[0]; //15

            let remaingMins = minsArr[1]; //26223
            remaingMins = '0.' + remaingMins; // '0.26223'
            let secs = Number(remaingMins) * 60; // 29.11122
            secs = splitOnDot(secs)[0]; //29

            setData({
                days: days,
                hours: hours,
                mins: mins,
                secs: secs,
            });
        }

        if (localStorage.getItem('name')) {
            setName(localStorage.getItem('name'));
        }
        if (localStorage.getItem('purpose')) {
            setPurpose(localStorage.getItem('purpose'));
        }
    }, [data]);

    return (
        <BkgdWrapper img={bkgdImg} font={curFont}>
            <OpacWrapper>
                <h1 className='textOne'>{joiTextOne}</h1>
                <h2 className='textTwo'>{joiTextTwo}</h2>
                <CDWrapper>
                    <h1>Hey, {name}</h1>
                    {!isEvent && 
                        <>
                            <h2>{purpose} will start on {startedDate}</h2>

                            <h3>
                                {data.days} days, {data.hours} hours, {data.mins} mintues, and{' '}
                                {data.secs} seconds remain!
                            </h3>
                        </>
                    }
                    {isEvent && <h2>{purpose} has begun!</h2>}

                    <button onClick={resetHandler}>Reset</button>
                </CDWrapper>
            </OpacWrapper>
        </BkgdWrapper>
    );
}

function parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
}

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
}

function splitOnDot(num) {
    let strArr = num.toString().split('.');
    return strArr;
}