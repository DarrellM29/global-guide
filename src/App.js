import React, {useState} from 'react'
import Axios from 'axios'

function App() {

  //old one from video const url = 'https://api.openweathermap.org/data/2.5/weather?q=joliet&appid=f3ddae2d1bfe3052a42b109ae6f7ba02'
  //geolocator http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f3ddae2d1bfe3052a42b109ae6f7ba02

  return (
    <div className="App">
      <div className="container">
        <div className="logoSearch">
          <h1>GlobalGuide</h1>
        </div>

        <div className="title">
          <div className="beforeTitle">
            <h1>It is currently...</h1>
            <h1>4:30pm on July 27th, 2023</h1>
            <h1>in...</h1>
          </div>
          <div className="theTitle">
            <h1>Chicago</h1>
          </div>
        </div>

        <div className="locationScore">
          <h1>Location Score</h1>
          <div className="circle1">
            <h1>83°</h1>
          </div>
        </div>

        <div className="safetyScore">
          <h1>Safety Score</h1>
          <div className="circle1">
            <h1>55°</h1>
          </div>
        </div>

        <div className="news">
          <h1>News</h1>
          <div className="square">
            <h1>News Network - News Article #1 - Date</h1>
            <h1>News Network - News Article #2 - Date</h1>
            <h1>News Network - News Article #3 - Date</h1>
            <h1>News Network - News Article #4 - Date</h1>
            <h1>News Network - News Article #5 - Date</h1>
          </div>
        </div>

        <div className="thingsToDo">
          <h1>Things To Do</h1>
          <div className="square">
            <h1>Place #1 - Location - Category</h1>
            <h1>Place #2 - Location - Category</h1>
            <h1>Place #3 - Location - Category</h1>
            <h1>Place #4 - Location - Category</h1>
            <h1>Place #5 - Location - Category</h1>
          </div>
        </div>

        <div className="weather">
          <div className="circle2">
            <h1>32°</h1>
            <h1>Light Rain</h1>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
