import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Popup from './Popup'


function App() {
  
  // Declare state variables using the useState() hook
  const [weatherData,setWeatherData] = useState({})
  const [newsData,setNewsData] = useState([])
  const [breweryData, setBreweryData] = useState([])
  const [locationScoreData, setLocationScoreData] = useState([])
  const [timeData, setTimeData] = useState([])
  const [hotelData, setHotelData] = useState([])
  const [sitesData, setSitesData] = useState([])
  const [attractionsData, setAttractionsData] = useState([])
  const [weather5DayData, setWeather5DayData] = useState([])
  const [location, setLocation] = useState('')

  const [infoButtonPopup, setInfoButtonPopup] = useState(false)
  const [breweriesButtonPopup, setBreweriesButtonPopup] = useState(false)
  const [hotelsButtonPopup, setHotelsButtonPopup] = useState(false)
  const [sitesButtonPopup, setSitesButtonPopup] = useState(false)
  const [attractionsButtonPopup, setAttractionsButtonPopup] = useState(false)
  const [timeString, setTimeString] = useState(getTimeString());

  //Refreshes the page and all of its data
  const refresh = () => {
    setWeatherData({})
    setNewsData([])
    setBreweryData([])
    setTimeData([])
    setHotelData([])
    setSitesData([])
    setAttractionsData([])
    setWeather5DayData([])
    setLocationScoreData([])
  }

  useEffect(() => {
    // Update time string every minute
    const intervalId = setInterval(() => {
      setTimeString(getTimeString());
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  //Changes time string from European standard to American Standard
  function getTimeString() {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    const timeString = date.toLocaleString("en-US", {hour: "numeric", minute: "numeric", hour12: true});
    return timeString;
  }

  //Function called after geolocation is found and longitude and latitude are given
  const searchTravel = (timeData) => {
    const hotelUrl = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&bias=proximity:${timeData.geo.longitude},${timeData.geo.latitude}&limit=10&apiKey=bebb3860b6f74034ae8c146ef20ce2d8`
    const sitesUrl = `https://api.geoapify.com/v2/places?categories=tourism.sights&bias=proximity:${timeData.geo.longitude},${timeData.geo.latitude}&limit=10&apiKey=bebb3860b6f74034ae8c146ef20ce2d8`
    const attractionsUrl = `https://api.geoapify.com/v2/places?categories=tourism.attraction&bias=proximity:${timeData.geo.longitude},${timeData.geo.latitude}&limit=10&apiKey=bebb3860b6f74034ae8c146ef20ce2d8`

    axios.get(hotelUrl).then((response) => {
      setHotelData(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })

    axios.get(sitesUrl).then((response) => {
      setSitesData(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })

    axios.get(attractionsUrl).then((response) => {
      setAttractionsData(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  //Function called to get data
  const searchLocation = (event) => {
    if (event.key === 'Enter'){

      refresh()

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      const newsUrl = `https://newsapi.org/v2/top-headlines?q=${location}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      const breweryUrl = `https://api.openbrewerydb.org/breweries?by_city=${location}&per_page=10`
      const locationScoreUrl = `https://api.teleport.org/api/urban_areas/slug:${location.toLowerCase().replace(/\s+/g, '-')}/scores/`
      const timeUrl = `https://api.ipgeolocation.io/timezone?apiKey=8ad77b2dcf574924a6a29e8500326b37&location=${location}`
      const weather5DayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=f3ddae2d1bfe3052a42b109ae6f7ba02`

      axios.get(timeUrl).then((response) => {
        setTimeData(response.data)
        console.log(response.data)
        searchTravel(response.data)
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

      axios.get(weather5DayUrl).then((response) => {
        setWeather5DayData(response.data)
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

          {/* Page Logo */ }
          <div className="col-lg-10 order-lg-1 col-12 order-1">
            <div className="logoSearch">
              <h1>GlobalGuide</h1>
            </div>
          </div>

          {/* Information Popup */ }
          <div className="col-lg-2 order-lg-2 col-12 order-2">
            <div className="infoPopup">
              <button onClick={() => setInfoButtonPopup(true)}>More Information</button>
              <Popup trigger={infoButtonPopup} setTrigger={setInfoButtonPopup}>
                <h1><u>Global Guide Information</u></h1>
                <h2>Location Score:<h3> The Location Score is calculated off the scores for housing, cost of living, startups, venture capital, travel connectivity, commute, business freedom, safety, healthcare, education, environmental quality, economy, taxation and internet access. For more information please visit <a href='https://developers.teleport.org/api/getting_started/'>Teleport Public APIs</a></h3></h2>
                <h2>Safety Score:<h3>The Safety Score is based off of various factors such as crime rates, natural disasters, and political stability. For more information please visit <a href='https://developers.teleport.org/api/getting_started/'>Teleport Public APIs</a></h3></h2>
                <h2>News:<h3>The News lists top headlining news based on the user-provided location. For more information please visit <a href='https://newsapi.org/docs/endpoints/top-headlines'>NewsAPI</a></h3></h2>
                <h2>Breweries:<h3>The Breweries lists an up-to-date list of breweries, cideries, brewpubs, and bottleshops for the city requested by the user. For more information please visit <a href='https://www.openbrewerydb.org/faq'>OpenBreweryDB</a></h3></h2>
                <h2>Weather:<h3>The Weather provides current weather for the user-provided location. If hovered over, it lists a 5 day / 12 hour forecast. For more information please visit <a href='https://openweathermap.org/forecast5'>OpenWeatherMap</a></h3></h2>
                <h2>Hotels:<h3>The Hotels provides a list of hotels in a nearby radius. For more information please visit <a href='https://apidocs.geoapify.com/docs/places/#about'>GeoApify</a></h3></h2>
                <h2>Sites:<h3>The Sites provides a list of sites such as castles, battlefields, ruines, bridges, and memorials in a nearby radius. For more information please visit <a href='https://apidocs.geoapify.com/docs/places/#about'>GeoApify</a></h3></h2>
                <h2>Attractions:<h3>The Attractions provides a list of attractions such as artwork and viewpoints in a nearby radius. For more information please visit <a href='https://apidocs.geoapify.com/docs/places/#about'>GeoApify</a></h3></h2>
              </Popup>
            </div>
          </div>

        </div>

        <div className="row" id='row2'>

          {/* Location Score */ }
          <div className="col-lg-4 order-lg-1 col-12 order-2">

            {locationScoreData.length !== 0 &&
              <div className="locationScore">
              <h1 className="generalColor">Location Score</h1>
                <div className="circle1" style={{ backgroundColor: locationScoreData.teleport_city_score >= 75 ? '#d0e1a7' : locationScoreData.teleport_city_score >= 50 ? '#ffde89' : locationScoreData.teleport_city_score >= 25 ? '#ffc889' : '#fa9f8e' }}>
                  <h1>{locationScoreData.teleport_city_score.toFixed()}</h1>
                </div>
              </div>
            }

            {locationScoreData.length === 0 &&
              <div className="locationScore">
              <h1 className="generalColor">Location Score</h1>
                <div className="circle1">
                  <h1 className="error1">N/A</h1>
                </div>
              </div>
            }
          </div>

          <div className="col-lg-4 order-lg-2 col-12 order-1">
            <div className="titleSearch">
              {/* Search Bar */ }
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

              {/* Time / Date / Country */ }
              {timeData.length !== 0 &&
                <div className="beforeTitle">
                  <h1 className="generalColor">{timeString}</h1>
                  <h1 className="generalColor">{typeof timeData.date === "string" ? new Date(timeData.date).toLocaleDateString("en-US") : timeData.date.toLocaleDateString("en-US")}</h1>
                  <h1 className="generalColor">{timeData.geo.country}</h1>
                </div>
              }
            </div>
          </div>

          <div className="col-lg-4 order-lg-3 col-12 order-3">
            
            {/* Safety Score */ }
            {locationScoreData.length !== 0 && (
              <div className="safeScore">
                <h1 className="generalColor">Safety Score</h1>
                <div className="circle1" style={{ backgroundColor: locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 7.5 ? '#d0e1a7' : locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 5.0 ? '#ffde89' : locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 >= 2.5 ? '#ffc889' : '#fa9f8e' }}>
                  {locationScoreData.categories ? (
                    <h1>{(locationScoreData.categories.find(category => category.name === "Safety").score_out_of_10 * 10).toFixed(0)}</h1>
                  ) : (<h1 className="error1">N/A</h1>)}
                </div>
              </div>
            )}

            {locationScoreData.length === 0 &&
              <div className="safeScore">
              <h1 className="generalColor">Safety Score</h1>
                <div className="circle1">
                  <h1 className="error1">N/A</h1>
                </div>
              </div>
            }

          </div>

        </div>

        <div className="row" id='row3'>

          <div className="col-lg-4 order-lg-1 col-12 order-2">
            
            {/* News Data */ }
            {newsData.length !== 0 &&
            <div className="news">
              <h1 className="generalColor">News</h1>
              <div className="square">
              {newsData.length !== 0 && newsData.slice(0, 5).map((article, index) => (
                <div className="block">
                <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer">
                  <h1>{article.source.name}</h1>
                  <h2>{article.title.slice(0, 60)}</h2>
                </a>
                </div>
              ))}
              </div>
            </div>
            }

            {newsData.length === 0 &&
            <div className="news">
              <h1 className="generalColor">News</h1>
              <div className="square">
                <h1 className="error1">No news for this area</h1>
              </div>
            </div>
            }

          </div>

          <div className="col-lg-4 order-lg-2 col-12 order-1">
            
            {/* Weather Data */ }
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
                <span className="popup1">
              
                {weather5DayData.length !== 0 &&
                <div className="square3">
                  <div className="row" id="weatherRow1">
                    <div className="col-lg-2 col-12 order-lg-1" id="centerer">
                      <h1>{new Date(weather5DayData.list[1].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[1].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[1].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-12 order-lg-2" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[5].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[5].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[5].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-12 order-lg-3" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[9].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[9].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[9].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-12 order-lg-4" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[13].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[13].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[13].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-12 order-lg-5" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[17].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[17].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[17].weather[0].main}</h1>
                    </div>
                  </div>
                  
                  {/* Weather Data Popup */ }
                  <div className="row" id="weatherRow2">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-12 order-lg-1" id="centerer">
                      <h1>{new Date(weather5DayData.list[21].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[21].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[21].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-12 order-lg-2" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[25].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[25].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[25].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-12 order-lg-3" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[29].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[29].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[29].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-12 order-lg-4" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[33].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[33].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[33].weather[0].main}</h1>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-12 order-lg-5" id="weather5Day">
                      <h1>{new Date(weather5DayData.list[37].dt_txt).toLocaleString("en-US", {month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"}).replace(/, (\d{4})/, '\n$1')}</h1>
                      <h1>{weather5DayData.list[37].main.temp.toFixed()}°F</h1>
                      <h1>{weather5DayData.list[37].weather[0].main}</h1>
                    </div>
                  </div>
                </div>
                }
                </span>
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
                    <h2 className="error2">Not Available</h2>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="col-lg-4 order-lg-3 col-12 order-3">
            
            {/* Brewery Data */ }
            {breweryData.length !== 0 &&
              <div className="thingsToDo">
                <h1 className="generalColor">Breweries</h1>
                <div className="square">
                  {breweryData.length !== 0 && breweryData.slice(0, 5).map((brews, index) => (
                    <div className="block">
                    <a key={brews.url} href={brews.website_url} target="_blank" rel="noopener noreferrer">
                      <h1>{brews.name}</h1>
                      <h2>{brews.street}</h2>
                    </a>
                    </div>
                  ))}
                  <button onClick={() => setBreweriesButtonPopup(true)}>More</button>
                  <Popup trigger={breweriesButtonPopup} setTrigger={setBreweriesButtonPopup}>
                    {breweryData.length !== 0 && breweryData.map((brews, index) => (
                      <div className="block2">
                      <a key={brews.url} href={brews.website_url} target="_blank" rel="noopener noreferrer">
                        <h1>{brews.name} - {brews.street}</h1>
                      </a>
                      </div>
                    ))}
                  </Popup>
                </div>
              </div>
            }

            {breweryData.length === 0 &&
            <div className="thingsToDo">
              <h1 className="generalColor">Breweries</h1>
              <div className="square">
                <h1 className="error1">No breweries for this area</h1>
              </div>
            </div>
            }

          </div>

        </div>

        <div className="row" id='row3'>

          <div className="col-lg-4 order-lg-1 col-12 order-2">
          
          {/* Hotel Data */ }
          {hotelData.length !== 0 &&
              <div className="thingsToDo">
                <h1 className="generalColor">Hotels</h1>
                <div className="square2">
                  {hotelData.features.slice(0, 5).map((hotels, index) => (
                    <div className="block" key={index}>
                      <h1>{hotels.properties.name}</h1>
                      <h2>{hotels.properties.address_line2}</h2>
                    </div>
                  ))}
                  <button onClick={() => setHotelsButtonPopup(true)}>More</button>
                  <Popup trigger={hotelsButtonPopup} setTrigger={setHotelsButtonPopup}>
                    {hotelData.features.map((hotels, index) => (
                      <div className="block2" key={index}>
                        <h1>{hotels.properties.name} - {hotels.properties.address_line2}</h1>
                      </div>
                    ))}
                  </Popup>
                </div>
              </div>
            }

            {hotelData.length === 0 &&
            <div className="thingsToDo">
              <h1 className="generalColor">Hotels</h1>
              <div className="square2">
                <h1 className="error1">No hotels for this area</h1>
              </div>
            </div>
            }

          </div>

          <div className="col-lg-4 order-lg-2 col-12 order-1">

            {/* Sites Data */ }
            {sitesData.length !== 0 &&
              <div className="thingsToDo">
                <h1 className="generalColor">Sites</h1>
                <div className="square2">
                  {sitesData.features.slice(0, 5).map((sites, index) => (
                    <div className="block" key={index}>
                      <h1>{sites.properties.address_line1}</h1>
                      <h2>{sites.properties.address_line2}</h2>
                    </div>
                  ))}
                  <button onClick={() => setSitesButtonPopup(true)}>More</button>
                  <Popup trigger={sitesButtonPopup} setTrigger={setSitesButtonPopup}>
                    {sitesData.features.map((sites, index) => (
                      <div className="block2" key={index}>
                        <h1>{sites.properties.address_line1} - {sites.properties.address_line2}</h1>
                      </div>
                    ))}
                  </Popup>
                </div>
              </div>
            }

            {sitesData.length === 0 &&
            <div className="thingsToDo">
              <h1 className="generalColor">Sites</h1>
              <div className="square2">
                <h1 className="error1">No sites for this area</h1>
              </div>
            </div>
            }

          </div>

          <div className="col-lg-4 order-lg-3 col-12 order-3">
            
            {/* Attractions Data */ }
            {attractionsData.length !== 0 &&
              <div className="thingsToDo">
                <h1 className="generalColor">Attractions</h1>
                <div className="square2">
                  {attractionsData.features.slice(0, 5).map((attractions, index) => (
                    <div className="block" key={index}>
                      <h1>{attractions.properties.name}</h1>
                      <h2>{attractions.properties.address_line2}</h2>
                    </div>
                  ))}
                  <button onClick={() => setAttractionsButtonPopup(true)}>More</button>
                  <Popup trigger={attractionsButtonPopup} setTrigger={setAttractionsButtonPopup}>
                    {attractionsData.features.map((attractions, index) => (
                      <div className="block2" key={index}>
                        <h1>{attractions.properties.name} - {attractions.properties.address_line2}</h1>
                      </div>
                    ))}
                  </Popup>
                </div>
              </div>
            }

            {attractionsData.length === 0 &&
            <div className="thingsToDo">
              <h1 className="generalColor">Attractions</h1>
              <div className="square2">
                <h1 className="error1">No attractions for this area</h1>
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
