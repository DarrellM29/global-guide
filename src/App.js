import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f3ddae2d1bfe3052a42b109ae6f7ba02`


  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">

      <div className="container-fluid">

        <div className="row" id='row1'>

          <div className="col-lg-12">
            <div className="logoSearch">
              <h1>GlobalGuide</h1>
            </div>
          </div>

        </div>

        <div className="row" id='row2'>

          <div className="col-lg-4 order-lg-1 col-12 order-2">
            <div className="locationScore">
            <h1>Location Score</h1>
              <div className="circle1">
                <h1>83°</h1>
                <span className="popup1">
                  <h2>Location: </h2>
                  <h2>Sightseeing: </h2>
                  <h2>Restaurants:</h2>
                  <h2>Shopping: </h2>
                  <h2>Nightlife: </h2>
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 order-lg-2 col-12 order-1">
            <div className="titleSearch">
              <div className="searchBar">
                <div className='input-group'>
                  <input 
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                  /*Used "onKeyDown" instead of "onKeyPress"*/
                  onKeyDown={searchLocation}
                  type="text" className="form-control rounded" 
                  placeholder="Enter City Name..." 
                  aria-label="Search" 
                  aria-describedby="search-addon" />
                </div>
              </div>
              <div className="beforeTitle">
                <h1>It is currently...</h1>
                <h1>4:30pm on July 27th, 2023</h1>
                <h1>in...</h1>
              </div>
            </div>
          </div>

          <div className="col-lg-4 order-lg-3 col-12 order-3">
            <div className="safeScore">
              <h1>Safety Score</h1>
              <div className="circle1">
                <h1>55°</h1>
                <span className="popup2">
                  <h2>Safety: </h2>
                  <h2>Women: </h2>
                  <h2>Physical Harm:</h2>
                  <h2>Theft: </h2>
                  <h2>Political Freedom: </h2>
                  <h2>LGBTQ: </h2>
                  <h2>Medical: </h2>
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="row" id='row3'>

          <div className="col-lg-4 order-lg-1 col-12 order-2">
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

          <div className="col-lg-4 order-lg-2 col-12 order-1">
            {data.name != undefined &&
            <div className="weatherTitle">
              <div className="theTitle">
                <h1>{data.name}</h1>
              </div>
              <div className="circle2">
                <div className='text'>
                  {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                  {data.weather ? <h2>{data.weather[0].main}</h2> : null}
                </div>
              </div>
            </div>
            }
          </div>

          <div className="col-lg-4 order-lg-3 col-12 order-3">
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
