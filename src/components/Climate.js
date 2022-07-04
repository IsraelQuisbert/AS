import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from './Button';

import clear from '../gift/clear.gif';
// import cloudss from '../gift/cloudss.gif';
import rain from '../gift/rain.gif';
import storm from '../gift/storm.gif';
import snow from '../gift/snow.gif';
import mist from '../gift/mist.gif';
import bkgrInitial from '../gift/initial.gif';

const Climate = () => {
    //hi full

    const [weather, setWeather] = useState({})
    const [degrees, setDegrees] = useState(0)
    const [farenheit, setFarenheit] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [bkgr, setBkgr] = useState(bkgrInitial)

    useEffect(() => {

        function success(pos) {
            var crd = pos.coords
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d69ed12e1f1f7cf84c3e7c7f8837be3b`)
                .then((res) => {
                    setWeather(res.data)
                    setDegrees(res.data.main.temp);
                    setIsLoading(false)

                    const weatherDescription = res.data.weather?.[0].description
                    if (weatherDescription === "clear sky" || weatherDescription === "few clouds") {
                        setBkgr(clear)
                    } else if (weatherDescription === "broken clouds" || weatherDescription === "scattered clouds") {
                        setBkgr(clear)

                    } else if (weatherDescription === "shower rain" || weatherDescription === "rain") {
                        setBkgr(rain)
                    } else if (weatherDescription === "thunderstorm") {
                        setBkgr(storm)

                    } else if (weatherDescription === "snow") { //nieve
                        setBkgr(snow)
                    } else {
                        setBkgr(mist) // neblina
                    }
                })
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const degreesC = degrees - 273.15
    const [changeDegrees, setChangeDegrees] = useState(degreesC)

    const changeUnit = () => {
        const degreesC = degrees - 273.15
        if (farenheit === true) {
            setChangeDegrees((degreesC * 1.8) + 32)
            setFarenheit(!farenheit)
        } else {
            setFarenheit(!farenheit)
        }
    }
    
    useEffect(() => {
        // const climate = document.body.style = `background-image: url(${weather2})`
        document.body.style = `background: url(${bkgr})`
    }, [bkgr])

    return (
        <div className='body'>
            {
                !isLoading && (
                    <>
                        <div className="card">

                            <div className="tittle">
                                <h1>Wheather App</h1>
                                <h2>{weather.name}, {weather.sys?.country}</h2>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                                <h2>{farenheit === true ? degrees - 273.15 : changeDegrees} {farenheit === true ? '°C' : '°F'}</h2>
                            </div>

                            <div className="details">
                                <p><b>" {weather.weather?.[0].description} "</b></p>
                                <p><b>Wind speed:</b> {weather.wind?.speed} m/s</p>
                                <p><b>Clouds:</b> {weather.clouds?.all}%</p> {/*NUBES*/}
                                <p><b>Pressure:</b> {weather.main?.pressure} hPa</p>
                            </div>

                            <div className="button">
                                <Button click={changeUnit} text={farenheit === true ? 'see°F' : 'see °C'} />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Climate;
