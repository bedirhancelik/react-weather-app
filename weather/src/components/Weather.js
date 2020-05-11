import React, { Component } from 'react'

class WeatherCard extends Component {
    render() {
        const {weather , dayIndex} = this.props
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return (
            <div className="weather-box">
                <div className="weather-day">
                    {weather.day.map((value,index) => {
                        if(index===dayIndex){
                            const dayName = days[new Date(value).getDay()]
                            return(
                            <div key={value}>
                                {dayName}
                            </div>
                            )
                        }
                        else{return null}
                    })}
                </div>
                <div>
                    {weather.condition.map((value,index) => {
                        if(index===dayIndex){
                            return(
                            <div key={value}>
                                {value}
                            </div>
                            )
                        }
                        else{return null}
                    })}
                </div>
                <div>
                    {weather.temperature.map((value,index) => {
                        if(index===dayIndex){
                            return(
                            <div key={value}>
                                {value}°
                            </div>
                            )
                        }
                        else{return null}
                    })}
                </div>
                <div>
                    {weather.icon.map((value,index) => {
                        if(index===dayIndex){
                            return(
                                <img key={index} src={"http://openweathermap.org/img/wn/"+value+"@2x.png"} alt="weather icon"></img>
                            )
                        }
                        else{return null}
                    })}
                </div>
            </div>
        )
    }
}

export default  WeatherCard