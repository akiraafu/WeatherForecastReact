import { useState } from "react";
import Header from "./components/Header";
import DetailCard from "./components/DetailCard";
import SummaryCard from "./components/SummaryCard";

function App() {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [noData, setNoData] = useState("No date yet");
    const [searchTerm, setSearchTerm] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState("unknow location");
    const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`);

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeather(searchTerm);
    };

    const handleChange = (input) => {
        const { value } = input.target;
        setSearchTerm(value);
    };

    const getWeather = async (location) => {
        setWeatherData([]);
        let how_to_search =
            typeof location === "string"
                ? `q=${location}`
                : `lat=${location[0]}&lon=${location[1]}`;

        try {
            let res = await fetch(
                `${
                    process.env.REACT_APP_URL + how_to_search
                }&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
            );

            let data = await res.json();
            if (data.cod != 200) {
                setNoData("Location Not Found");
                return;
            }
            setWeatherData(data);
            setCity(`${data.city.name}, ${data.city.country}`);
            setWeatherIcon(
                `${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`
            );
        } catch (err) {
            console.log(err);
        }
    };

    const myIP = (location) => {
        const { latitude, longitude } = location.coords;
        getWeather([latitude, longitude]);
    };

    return (
        <div className='flex items-cent justify-center w-screen h-screen py-0 xsm:min-h-full md:min-h-full'>
            <div className='flex w-3/4 min-h-full rounded-3x1 shadow-lg m-auto bg-gray-100 xsm:flex-col md:flex-col xsm:w-5/6 md:w-5/6'>
                {/* form card section */}
                <div className='form-container xsm:w-11/12 xsm:mx-auto xsm:my-2 md:w-11/12 md:mx-auto md:my-2'>
                    <div className='flex items-center justify-center'>
                        <h3 className='my-auto mr-auto text-xl text-yellow-500 font-bold shadow-md py-1 px-3 rounded-md bg-white bg-opacity-30 uppercase xsm:text-base'>
                            forecast
                        </h3>
                        <div className='flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg'>
                            <i className='fa fa-map my-auto' aria-hidden='true'></i>
                            <div className='text-right'>
                                <p className='font-semibold text-sm ml-2 xsm:text-xs'>{city}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <h1 className='text-white text-2xl xsm:text-xl xsm:mt-4 md:text-xl md:mt-4'>
                            The Only Weather Forecast App You Need
                        </h1>
                        <hr className='h-1 bg-white w-1/4 rounded-full my-5' />
                        <form
                            noValidate
                            onSubmit={handleSubmit}
                            className='flex justify-center w-full xsm:mb-3 md:mb-3'>
                            <input
                                type='text'
                                placeholder='Enter location'
                                className='relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200 xsm:w-11/12'
                                onChange={handleChange}
                                required
                            />
                            <button type='submit' className='z-10'>
                                <i
                                    className='bx bx-search-alt text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3'
                                    aria-hidden='true'
                                    type='submit'></i>
                            </button>
                            <i
                                className='fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white'
                                aria-hidden='true'
                                onClick={() => {
                                    navigator.geolocation.getCurrentPosition(myIP);
                                }}></i>
                        </form>
                    </div>
                </div>
                {/* info card section */}
                <div className='w-2/4 p-5 xsm:w-full xsm:mx-auto md:w-full md:mx-auto'>
                    <Header />
                    <div className='flex flex-col my-10'>
                        {weatherData.length === 0 ? (
                            <div className=' p-4 flex items-center justify-center h-1/3 mb-auto'>
                                <h1 className='text-gray-300 text-4xl font-bold uppercase'>
                                    {noData}
                                </h1>
                            </div>
                        ) : (
                            <>
                                <h1 className='text-5xl text-gray-800 mt-auto mb-4 xsm:text-4xl'>
                                    {" "}
                                    Today{" "}
                                </h1>
                                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                                <h2 className='text-3xl text-gray-600 mb-4 mt-10 xsm:text-xl'>
                                    More on {city}
                                </h2>
                                <ul className='grid grid-cols-2 gap-2'>
                                    {weatherData.list.map((days, index) => {
                                        if (!index > 0) return null;
                                        else {
                                            return <SummaryCard key={index} day={days} />;
                                        }
                                    })}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
