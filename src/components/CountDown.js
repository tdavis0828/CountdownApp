import React, { useEffect, useState } from 'react';
import './CountDown.css';
export default function CountDown() {
    const [startedDate, setStartedDate] = useState('');
    const [name, setName] = useState('');

    const [data, setData] = useState({}); //data.hours, data.mins, data.secs, data.days

    const resetHandler = (event) => {
        localStorage.clear();
        window.location.reload();
    };

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
    });

    return (
        <div className='count-down'>
            <h1>Hey, {name}</h1>
            <h2>You will start on {startedDate}</h2>

            <h3>
                {data.days} days, {data.hours} hours, {data.mins} mintues, and{' '}
                {data.secs} seconds
            </h3>
            <p>are remaing.</p>

            <button onClick={resetHandler}>Reset</button>
        </div>
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

