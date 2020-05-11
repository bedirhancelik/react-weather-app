import React, { Component } from 'react'
import ReactDOM from "react-dom"
import Weather from "./components/Weather"
import axios from "axios"
import "./css/Weather.css"

const URL = "http://api.openweathermap.org/data/2.5/forecast?q=Istanbul&units=metric&appid=d8bcace2cf60d444d92cb421977a9598"
class App extends Component {
    constructor(){
        super()
        this.state= {
            weather : {
                city: "",
                day : [],
                condition : [],
                temperature : [],
                icon : []
            }
        }
        
    }
    
    componentDidMount(){
        let fiveDaysEach = []
        let getCity = ""
        let cloneDay = this.state.weather.day.slice()
        let cloneCondition = this.state.weather.condition.slice()
        let cloneTemperature = this.state.weather.temperature.slice()
        let cloneIcon =this.state.weather.icon.slice()
        let i;
        axios.get(URL)
        .then(res =>{

            //fiveDaysEach = res.data.list.filter((elem,index) => index%8 === 0) this gives day with night icon
            
            for(i=2; i<res.data.list.length; i=i+8){ //gives day with morning icons
                fiveDaysEach.push(res.data.list[i])
            }
            getCity=res.data.city.name
            cloneDay=fiveDaysEach.map(elem => elem.dt_txt)
            cloneCondition=fiveDaysEach.map(elem => elem.weather[0].main)
            cloneTemperature=fiveDaysEach.map(elem => elem.main.temp)
            cloneIcon = fiveDaysEach.map(elem => elem.weather[0].icon)

            this.setState({
                weather : {
                    city: getCity,
                    day : cloneDay,
                    condition : cloneCondition,
                    temperature : cloneTemperature,
                    icon : cloneIcon
                }
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    render() {
        return (
                <div className="weather-container">
                    <h1>Weather Condition for {this.state.weather.city}</h1>
                    <div>
                        <Weather weather={this.state.weather} dayIndex={0}></Weather>
                        <Weather weather={this.state.weather} dayIndex={1}></Weather>
                        <Weather weather={this.state.weather} dayIndex={2}></Weather>
                        <Weather weather={this.state.weather} dayIndex={3}></Weather>
                        <Weather weather={this.state.weather} dayIndex={4}></Weather>
                    </div>
                </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById("root"))