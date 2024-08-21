import React, { useState } from 'react';

function App() {

//Access Tokens APIs
const apiKey: string = '8eaa34194cc42ff695b306301df4ac26';
// const  apiCountryUrl: string[] = ['https://flagsapi.com/','/flat/32.png'];

//interface

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys:{
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

//useStates

const [city, setCity] = useState<string>('');
const [weather, setWeather] = useState<WeatherData | null>(null);
const [errorApi, setErrorApi] = useState<boolean>(false);

//functions

const showWeatherData = (city: string) => {
  getWeatherData(city);
}

const getWeatherData = async(city:string): Promise<WeatherData> => {
  try{
    const apiWeatherURL:string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const res: Response = await fetch(apiWeatherURL);
  
    //check response api
    if (!res.ok) {
      throw new Error(`Erro: ${res.statusText}`);
    }
  
    const data: WeatherData = await res.json();
  
    setWeather(data);
    setErrorApi(false);
    return data;
  } catch(error){
    setWeather(null);
    setErrorApi(true);
    console.error('Erro ao buscar dados do clima:', error);
    throw error;
  }
}

// events
const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCity(e.target.value);
}

const handleInputSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleButtonSubmit();
  }
}

const handleButtonSubmit = () => {
  showWeatherData(city);
}


  return (
    <div
      className="App  flex justify-center min-h-screen w-full bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('/background5.png')` }}
    >
      <div className="font-ubuntu container w-4/5 sm:w-auto flex-row justify-center mt-52 h-full bg-gradient-to-b from-blue-500/80 to-purple-900/80  p-8 rounded-2xl shadow-lg shadow-indigo-900/50">
        <div className="w-full form border-b-2">
          <h3 className="sm:text-2xl text-lg text-white font-bold mb-4 text-center">
            Confira o clima da sua Cidade:
          </h3>
          <div className="flex justify-between mb-8">
            <input
              type="text"
              placeholder="Digite o nome da cidade"
              id="city-input"
              className="border-gray-300 border rounded-md sm:p-3 px-2 py-1 w-44 sm:w-72 mr-1 focus:outline-none"
              onChange={handleInputSearchChange}
              value={city}
              onKeyDown={handleInputSearchKeyDown}
            />
            <button
              id="search"
              className="relative sm:px-5 sm:py-2 py-1 px-3 rounded-md bg-cover overflow-hidden group bg-opacity-10"
              style={{ backgroundImage: `url('/cloudtexture.png')` }}
              onClick={handleButtonSubmit}
            >
              <i className="fa-solid fa-magnifying-glass text-white"></i>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* infos */}
        {errorApi && (
          <div className="flex justify-center mt-10">
            <h2 className=" sm:w-72 w-52 sm:text-lg text-red-500 text-center font-bold text-md mb-2">
              Erro ao consultar os servidores, verifique a ortografia e tente novamente!
            </h2>
          </div>
        )}

        {weather && (
          <div className="w-100 weather-data text-white pt-10">
            <h2 className="text-lg flex justify-center items-center font-bold text-xl mb-2">
              <i className="fa-solid fa-location-dot mx-2"></i>
              <span id="city" className="mx-2">
                {weather.name}
              </span>
              <img
                src={`https://flagsapi.com/${weather.sys.country}/flat/32.png`}
                alt="bandeira do país"
                id="country"
                className="mx-2 "
              />
            </h2>
            <p id="temperature" className="py-2 text-center">
              <span>{weather.main.temp}</span>&deg;C
            </p>
            <div className="description-container flex justify-center items-center py-3">
              <p id="description">{weather.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Condições do tempo"
                id="weather-icon"
              />
            </div>
            <div className="details-container flex justify-center items-center">
              <p id="umidity" className="border-r-2 border-white py-3 px-5 w-40 text-end">
                <i className="fa-solid fa-droplet mr-2"></i>
                <span>{weather.main.humidity} %</span>
              </p>
              <p id="wind" className=" py-3 px-5 w-40 text-start">
                <i className="fa-solid fa-wind mr-2"></i>
                <span>{weather.wind.speed} km/h</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8eaa34194cc42ff695b306301df4ac26