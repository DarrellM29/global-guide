import React, {useState} from 'react'
import Axios from 'axios'

function App() {

  //old one from video const url = 'https://api.openweathermap.org/data/2.5/weather?q=joliet&appid=f3ddae2d1bfe3052a42b109ae6f7ba02'
  //geolocator http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f3ddae2d1bfe3052a42b109ae6f7ba02

  return (
    <div className="App">

      <div class="container-fluid">

        <div class="row" id='row1'>

          <div class="col-lg-12">
            <div className="logoSearch">
              <h1>GlobalGuide</h1>
            </div>
          </div>

        </div>

        <div class="row" id='row2'>

          <div class="col-lg-4 order-lg-1 col-12 order-2">
            <div className="locationScore">
            <h1>Location Score</h1>
              <div className="circle1">
                <h1>83°</h1>
              </div>
            </div>
          </div>

          <div class="col-lg-4 order-lg-2 col-12 order-1">
            <div className="titleSearch">
              <div className="searchBar">
                <div className='input-group'>
                  <input type="search" class="form-control rounded" placeholder="Enter City Name..." aria-label="Search" aria-describedby="search-addon" />
                  <button type="button" class="btn btn-outline-primary">Explore</button>
                </div>
              </div>
              <div className="beforeTitle">
                <h1>It is currently...</h1>
                <h1>4:30pm on July 27th, 2023</h1>
                <h1>in...</h1>
              </div>
            </div>
          </div>

          <div class="col-lg-4 order-lg-3 col-12 order-3">
            <div className="safeScore">
              <h1>Safety Score</h1>
              <div className="circle1">
                <h1>55°</h1>
              </div>
            </div>
          </div>

        </div>

        <div class="row" id='row3'>

          <div class="col-lg-4 order-lg-1 col-12 order-2">
          <div className="news">
              <h1>News</h1>
              <div className="square">
                <h1>News Network - Article #1 - Date</h1>
                <h1>News Network - Article #2 - Date</h1>
                <h1>News Network - Article #3 - Date</h1>
                <h1>News Network - Article #4 - Date</h1>
                <h1>News Network - Article #5 - Date</h1>
              </div>
            </div>
          </div>

          <div class="col-lg-4 order-lg-2 col-12 order-1">
            <div className="weatherTitle">
              <div className="theTitle">
                <h1>Chicago</h1>
              </div>
              <div className="circle2">
                <div className='text'>
                  <h1>32°</h1>
                  <h2>Light Rain</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 order-lg-3 col-12 order-3">
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
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
