import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [weatherData,setWeatherData] = useState({})
  const [newsData,setNewsData] = useState([])
  const [location, setLocation] = useState('')
  

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      const newsUrl = `https://newsapi.org/v2/top-headlines?q=${location}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`

      axios.get(weatherUrl).then((response) => {
        setWeatherData(response.data)
        console.log(response.data)
      })
      axios.get(newsUrl).then((response) => {
        setNewsData(response.data.articles)
        console.log(response.data.articles)
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

            {newsData.length !== 0 &&
            <div className="news">
              <h1>News</h1>
              <div className="square">
              {newsData.length !== 0 && newsData.map((article, index) => (
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h1 key={index}>{article.source.name} - {article.title.slice(0, 35)}</h1>
                </a>
              ))}
              </div>
            </div>
            }

            {newsData.length === 0 &&
            <div className="news">
              <h1>News</h1>
              <div className="square">
                <h1 className="error1">No news for this area</h1>
              </div>
            </div>
            }

          </div>

          <div className="col-lg-4 order-lg-2 col-12 order-1">
            {weatherData.name !== undefined &&
            <div className="weatherTitle">
              <div className="theTitle">
                <h1>{weatherData.name}</h1>
              </div>
              <div className="circle2">
                <div className='text'>
                  {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}°F</h1> : null}
                  {weatherData.weather ? <h2>{weatherData.weather[0].main}</h2> : null}
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
