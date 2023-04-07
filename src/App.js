import React, { useState } from 'react'
import axios from 'axios'


function App() {
  
  
  const [weatherData,setWeatherData] = useState({})
  const [newsData,setNewsData] = useState([])
  const [breweryData, setBreweryData] = useState([])
  const [locationScoreData, setLocationScoreData] = useState([])
  const [timeData, setTimeData] = useState([])
  const [location, setLocation] = useState('')

  const refresh = () => {
    setWeatherData({})
    setNewsData([])
    setBreweryData([])
    setTimeData([])
    setLocationScoreData([])
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter'){

      refresh()

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      const newsUrl = `https://newsapi.org/v2/top-headlines?q=${location}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      const breweryUrl = `https://api.openbrewerydb.org/breweries?by_city=${location}&per_page=5`
      const locationScoreUrl = `https://api.teleport.org/api/urban_areas/slug:${location.toLowerCase().replace(/\s+/g, '-')}/scores/`
      const timeUrl = `https://api.ipgeolocation.io/timezone?apiKey=8ad77b2dcf574924a6a29e8500326b37&location=${location}`

      axios.get(timeUrl).then((response) => {
        setTimeData(response.data)
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })

      axios.get(weatherUrl).then((response) => {
        setWeatherData(response.data)
        console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

        axios.get(newsUrl).then((response) => {
            setNewsData(response.data.articles)
            console.log(response.data.articles)
        }).catch((error) => {
            console.log(error)
        })

        axios.get(breweryUrl).then((response) => {
            setBreweryData(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

        axios.get(locationScoreUrl).then((response) => {
            setLocationScoreData(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
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

            {locationScoreData.length !== 0 &&
              <div className="locationScore">
              <h1>Location Score</h1>
                <div className="circle1" style={{ backgroundColor: locationScoreData.teleport_city_score >= 75 ? 'green' : locationScoreData.teleport_city_score >= 50 ? 'yellow' : locationScoreData.teleport_city_score >= 25 ? 'orange' : 'red' }}>
                  <h1>{locationScoreData.teleport_city_score.toFixed()}</h1>
                  {locationScoreData.teleport_city_score && locationScoreData.categories && (
                  <span className="popup1" style={{ backgroundColor: locationScoreData.teleport_city_score >= 75 ? 'green' : locationScoreData.teleport_city_score >= 50 ? 'yellow' : locationScoreData.teleport_city_score >= 25 ? 'orange' : 'red' }}>
                    <h2>L&C: {(locationScoreData.categories.find(category => category.name === "Leisure & Culture").score_out_of_10 * 10).toFixed(0)}</h2>
                    <h2>Outdoors: {(locationScoreData.categories.find(category => category.name === "Outdoors").score_out_of_10 * 10).toFixed(0)}</h2>
                    <h2>Taxes: {(locationScoreData.categories.find(category => category.name === "Taxation").score_out_of_10 * 10).toFixed(0)}</h2>
                    <h2>Econ: {(locationScoreData.categories.find(category => category.name === "Economy").score_out_of_10 * 10).toFixed(0)}</h2>
                    <h2>Internet: {(locationScoreData.categories.find(category => category.name === "Internet Access").score_out_of_10 * 10).toFixed(0)}</h2>
                  </span>
                  )}
                </div>
              </div>
            }

            {locationScoreData.length === 0 &&
              <div className="locationScore">
              <h1>Location Score</h1>
                <div className="circle1">
                  <h1 className="error1">N/A</h1>
                </div>
              </div>
            }


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

              {timeData.length !== 0 &&
                <div className="beforeTitle">
                  <h1>{timeData.time_12}</h1>
                  <h1>{timeData.date}</h1>
                  <h1>{timeData.geo.country}</h1>
                </div>
              }
            </div>
          </div>

          <div className="col-lg-4 order-lg-3 col-12 order-3">

            {locationScoreData.length !== 0 && (
              <div className="safeScore">
                <h1>Safety Score</h1>
                <div className="circle1" style={{ backgroundColor: locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 7.5 ? 'green' : locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 5.0 ? 'yellow' : locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 2.5 ? 'orange' : 'red' }}>
                  {locationScoreData.categories ? (
                    <h1>{(locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 * 10).toFixed(0)}</h1>
                  ) : (<h1 className="error1">N/A</h1>)}
                  {locationScoreData.categories ? (
                    <span className="popup2" style={{ backgroundColor: locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 7.5 ? 'green' : locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 5.0 ? 'yellow' : locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 2.5 ? 'orange' : 'red' }}>
                      <h2>TC: {(locationScoreData.categories.find(category => category.name === "Travel Connectivity").score_out_of_10 * 10).toFixed(0)}</h2>
                      <h2>Internet: {(locationScoreData.categories.find(category => category.name === "Internet Access").score_out_of_10 * 10).toFixed(0)}</h2>
                      <h2>Environment: {(locationScoreData.categories.find(category => category.name === "Environmental Quality").score_out_of_10 * 10).toFixed(0)}</h2>
                    </span>
                  ) : null}
                </div>
              </div>
            )}

            {locationScoreData.length === 0 &&
              <div className="safeScore">
              <h1>Safety Score</h1>
                <div className="circle1">
                  <h1 className="error1">N/A</h1>
                </div>
              </div>
            }

          </div>

        </div>

        <div className="row" id='row3'>

          <div className="col-lg-4 order-lg-1 col-12 order-2">

            {newsData.length !== 0 &&
            <div className="news">
              <h1>News</h1>
              <div className="square">
              {newsData.length !== 0 && newsData.slice(0, 5).map((article, index) => (
                <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer">
                  <h1>{article.source.name} - {article.title.slice(0, 25)}</h1>
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

            {weatherData.name === undefined &&
              <div className="weatherTitle">
                <div className="theTitle">
                  <h1>{location}</h1>
                </div>
                <div className="circle2">
                  <div className='text'>
                    <h2 className="error1">Not Available</h2>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="col-lg-4 order-lg-3 col-12 order-3">

            {breweryData.length !== 0 &&
              <div className="thingsToDo">
                <h1>Breweries</h1>
                <div className="square">
                {breweryData.length !== 0 && breweryData.map((brews, index) => (
                  <a key={brews.url} href={brews.website_url} target="_blank" rel="noopener noreferrer">
                    <h1>{brews.name} - {brews.street}</h1>
                  </a>
                ))}
                </div>
              </div>
            }

            {breweryData.length === 0 &&
            <div className="thingsToDo">
              <h1>Breweries</h1>
              <div className="square">
                <h1 className="error1">No breweries for this area</h1>
              </div>
            </div>
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
