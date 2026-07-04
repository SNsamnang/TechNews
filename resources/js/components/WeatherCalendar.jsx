import React, { useEffect, useState } from "react";

export default function WeatherCalendar() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const cambodiaTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Phnom_Penh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(time);

    const cambodiaDate = new Intl.DateTimeFormat("km-KH", {
        timeZone: "Asia/Phnom_Penh",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(time);

    return (
        <div className="weather-calendar">
            <div className="weather-card">
                <div className="weather-icon">☀️</div>
                <div>
                    <h3>ភ្នំពេញ</h3>
                    <p>30°C</p>
                    <small>មានពពកតិចៗ</small>
                </div>
            </div>

            <div className="clock-card">
                <h3>ម៉ោងកម្ពុជា</h3>
                <div className="clock">{cambodiaTime}</div>
                <div className="date">{cambodiaDate}</div>
            </div>

            <div className="calendar-card">
                <h3>ប្រតិទិន</h3>
                <div className="calendar-day">{new Date().getDate()}</div>
                <div>
                    {new Date().toLocaleString("km-KH", {
                        month: "long",
                        year: "numeric",
                    })}
                </div>
            </div>
        </div>
    );
}
