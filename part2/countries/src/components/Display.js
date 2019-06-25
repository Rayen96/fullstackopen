import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Languages = ({ result }) => {
    const rows = () => result.languages.map(language =>
        <li key={language.name}>{language.name}</li>
    )
    return (
        <ul>
            {rows()}
        </ul>
    )
}



const CountryName = ({ result, setFilter }) => {
    const handleClick = (e) => {
        e.preventDefault();
        setFilter(result.name);
    }
    return (
        <div>
            {result.name} <button type='button' onClick={handleClick}>show</button>
        </div>
    );
}


const CountryNames = ({ results, filter, setFilter }) => {
    const rows = () =>
        results.map(result =>
            <CountryName
                result={result}
                key={result.numericCode}
                filter={filter}
                setFilter={setFilter}
            />
        );

    return (
        <div>{rows()}</div>
    );
}

const CountryView = ({ result }) => (
    <>
        <h1>{result.name}</h1>
        <div>
            <div>capital {result.capital}</div>
            <div>population {result.population}</div>
        </div>
        <h2>languages</h2>
        <Languages result={result} />
        <img
            src={result.flag}
            style={{ width: 100 }}
            alt={`Flag of ${result.name}`}
        />
        <Weather country={result.name} />
    </>
);

const Weather = ( { country } ) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        axios
            .get(`https://api.apixu.com/v1/current.json?key=b0e37091044b4d53b0d65230192106&q=${country}`)
            .then(response => {
                setWeather(response.data)
            });
    }, [country])
    if (weather.length === 0) {
        return (null)
    } else {
        return (
            <div>
                <h3>Weather in { country }</h3>
                <b>Temperature:</b> { weather.current.temp_c }
                <div>
                    <img 
                        src={ weather.current.condition.icon }
                        alt={ weather.current.condition.text }
                        style={{ width: 100 }} />
                </div>
                <b>Wind:</b> { weather.current.wind_kph } kph direction { weather.current.wind_dir }
            </div> )
    }
}

const Display = ({ results, setFilter }) => {
    const len = results.length

    if (len === 0) {
        return (null);

    } else if (len > 1 && len < 10) {


        return (
            <CountryNames
                results={results}
                setFilter={setFilter}
            />
        );

    } else if (len === 1) {
        const result = results[0]
        return (
            <CountryView
                result={result}
            />
        );

    } else {
        return (<div>Too many matches, specify another filter</div>);
    }
}
export default Display;
