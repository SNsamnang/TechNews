import React, { useEffect, useState } from "react";

const PHNOM_PENH_LAT = 11.5564;
const PHNOM_PENH_LON = 104.9282;

const WEATHER_CODES = {
    0: { icon: "☀️", label: "ស្រឡះ" },
    1: { icon: "🌤️", label: "ស្រឡះជាទូទៅ" },
    2: { icon: "⛅", label: "មានពពកតិចៗ" },
    3: { icon: "☁️", label: "មានពពកច្រើន" },
    45: { icon: "🌫️", label: "អ័ព្ទ" },
    48: { icon: "🌫️", label: "អ័ព្ទទឹកកក" },
    51: { icon: "🌦️", label: "ភ្លៀងរាយតិចៗ" },
    53: { icon: "🌦️", label: "ភ្លៀងរាយ" },
    55: { icon: "🌦️", label: "ភ្លៀងរាយច្រើន" },
    61: { icon: "🌧️", label: "ភ្លៀងតិចៗ" },
    63: { icon: "🌧️", label: "ភ្លៀង" },
    65: { icon: "🌧️", label: "ភ្លៀងខ្លាំង" },
    80: { icon: "🌦️", label: "ភ្លៀងធ្លាក់ខ្លីៗ" },
    81: { icon: "🌦️", label: "ភ្លៀងធ្លាក់" },
    82: { icon: "🌧️", label: "ភ្លៀងធ្លាក់ខ្លាំង" },
    95: { icon: "⛈️", label: "ព្យុះផ្គររន្ទះ" },
    96: { icon: "⛈️", label: "ព្យុះផ្គររន្ទះនិងព្រិល" },
    99: { icon: "⛈️", label: "ព្យុះផ្គររន្ទះខ្លាំង" },
};

function getWeatherInfo(code) {
    return WEATHER_CODES[code] || { icon: "🌡️", label: "" };
}

export default function WeatherCalendar() {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState(null);
    const [weatherError, setWeatherError] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${PHNOM_PENH_LAT}&longitude=${PHNOM_PENH_LON}&current_weather=true`
                );
                if (!res.ok) throw new Error("Weather request failed");
                const data = await res.json();
                if (!cancelled && data.current_weather) {
                    setWeather(data.current_weather);
                    setWeatherError(false);
                }
            } catch (err) {
                if (!cancelled) setWeatherError(true);
            }
        };

        fetchWeather();
        const weatherInterval = setInterval(fetchWeather, 15 * 60 * 1000);

        return () => {
            cancelled = true;
            clearInterval(weatherInterval);
        };
    }, []);

    const weatherInfo = weather ? getWeatherInfo(weather.weathercode) : null;

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
                <div className="weather-icon">
                    {weatherInfo ? weatherInfo.icon : "🌡️"}
                </div>
                <div className="weather-detail">
                    <h3>ភ្នំពេញ</h3>
                    <p>
                        {weather
                            ? `${Math.round(weather.temperature)}°C`
                            : weatherError
                            ? "N/A"
                            : "..."}
                    </p>
                    <small>{weatherInfo ? weatherInfo.label : ""}</small>
                </div>
            </div>

            <div className="clock-card">
                <h3>កម្ពុជា</h3>
                <div className="clock">{cambodiaTime}</div>
                <div className="date">{cambodiaDate}</div>
            </div>

            {/* <div className="calendar-card">
                <h3>ប្រតិទិន</h3>
                <div className="calendar-day">{new Date().getDate()}</div>
                <div>
                    {new Date().toLocaleString("km-KH", {
                        month: "long",
                        year: "numeric",
                    })}
                </div>
            </div> */}
        </div>
    );
}
