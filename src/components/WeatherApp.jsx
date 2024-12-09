import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import foggy from "../assets/images/foggy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import hazy from "../assets/images/hazy.png";
import misty from "../assets/images/misty.png";
import thunders from "../assets/images/thunders.png";
import drizzle from "../assets/images/drizzle.png";

import LoadingGif from "../assets/images/loading.gif";
import { useEffect, useState } from "react";
import timer from "./timer";
import Seatowns from "./seatowns";
import Mountaintowns from "./mountaintowns";
import Defaulttown from "./defaulttown";
import Newtowns from "./Newtowns";
import Heading from "./Heading";

const WeatherApp = () => {
  const [towns, setTowns] = useState(
    localStorage.getItem("WeatherAPP-Towns") != null
      ? Array.from(JSON.parse(localStorage.getItem("WeatherAPP-Towns")))
      : []
  );
  const [townsdata, setTownsdata] = useState([]);
  const [townslocation, setTownsLocation] = useState("");
  const [data, setData] = useState({});
  const [location, setLocation] = useState(
    localStorage.getItem("WeatherAPP-Default") != null
      ? JSON.parse(localStorage.getItem("WeatherAPP-Default"))
      : "Belgrade"
  );
  const [loading, setLoading] = useState(false);

  const [seatowns, setSeaTowns] = useState([
    "Petrovac na moru",
    "Kotor",
    "Budva",
    "Herceg Novi",
    "Athens",
    "Thessaloniki",
    "Chania",
    "Heraklion",
    "Retimno",
    "Parga",
    "Preveza",
    "Corfu",
    "Lefkada",
    "Nidri",
    "Zakynthos",
    "Argostoli",
    "Ayia Napa",
    "Pafos",
    "Limasol",
    "Larnaca",
    "Paralia",
    "Nei Pori",
    "Volos",
    "Sarti",
    "Nikiti",
    "Vourvourou",
    "Toroni",
    "Pefkochori",
    "Chaniotis",
    "Neos Marmaras",
    "Mykonos",
    "Rhodes",
    "Kos",
    "Naxos",
    "Milos",
    "Ikaria",
    "Lesbos",
    "Nessebar",
    "Rijeka",
    "Pula",
    "Makarska",
    "Split",
    "Dubrovnik",
    "Neum",
    "Vlora",
    "Sardegna",
    "Sicilia",
  ]);
  const [seatownsdata, setSeaTownsdata] = useState([]);

  const [mountaintowns, setMountainTowns] = useState([
    "Kopaonik",
    "Zlatibor",
    "Jahorina",
    "Pamporovo",
    "Kolašin",
    "Bansko",
    "Borovets",
    "Carezza",
    "Chamonix",
    "Megève",
    "Gstaad",
    "Sölden",
    "Bormio",
    "Andermatt",
    "Kaprun",
    "Corvara",
    "St. Moritz",
    "Kitzbuhel",
    "Les Arcs",
    "Courmayeur",
  ]);
  const [mountaintownsdata, setMountainTownsdata] = useState([]);

  const api_key = import.meta.env.VITE_API_KEY;
  {
    /* Set default/start data */
  }
  const fetchDefaultWeather = async () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
    const res = await fetch(url);
    const defaultData = await res.json();
    setData(defaultData);
    setLoading(false);
  };

  const fetchDefaultCity = async () => {
    let newtownsdata = [];
    for (let i = 0; i < towns.length; i++) {
      if (towns[i].trim() !== "") {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${towns[i]}&units=Metric&appid=${api_key}`;
        const res = await fetch(url);
        const searchData = await res.json();
        if (searchData.cod === 200) {
          newtownsdata.push(searchData);
          setTownsdata(newtownsdata);
          setTownsLocation("");
          setLoading(false);
        }
      }
    }
  };
  useEffect(() => {
    fetchDefaultWeather();
    fetchDefaultCity();
  }, []);
  {
    /* Search funkcija */
  }
  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod === 200) {
        setData(searchData);
        setLocation("");
        setLoading(false);
        localStorage.setItem(
          "WeatherAPP-Default",
          JSON.stringify(searchData.name)
        );
      } else {
        alert(
          "Name of town is not correct, try to find correct name of town in English language"
        );
      }
    }
  };
  {
    /* Push new locations */
  }

  const addCity = async () => {
    if (townslocation.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${townslocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod === 200) {
        setTownsdata([...townsdata, searchData]);
        setTowns([...towns, searchData.name]);
        setTownsLocation("");
        setLoading(false);
        localStorage.setItem(
          "WeatherAPP-Towns",
          JSON.stringify([...towns, searchData.name])
        );
      } else {
        alert(
          "Name of town is not correct, try to find correct name of town in English language"
        );
      }
    }
  };

  const removeCity = (e) => {
    const newtownsdata = [...townsdata];
    const newtowns = [...towns];
    newtownsdata.splice(e.target.id, 1);
    newtowns.splice(e.target.id, 1);
    setTownsdata(newtownsdata);
    setTowns(newtowns);
    localStorage.setItem("WeatherAPP-Towns", JSON.stringify(newtowns));
    if (newtowns.length == 0) {
      localStorage.removeItem("WeatherAPP-Towns");
    }
  };

  {
    /* Push sea & mountain locations */
  }
  const addSeaCity = async () => {
    let newTowns = [];
    for (let i = 0; i < seatowns.length; i++) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${seatowns[i]}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      newTowns.push(searchData);
    }
    setSeaTownsdata(...seatownsdata, newTowns);
    setSeaTowns(...seatowns, newTowns.name);
    setLoading(false);
  };
  const addMountainCity = async () => {
    let newTowns = [];
    for (let i = 0; i < mountaintowns.length; i++) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${mountaintowns[i]}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      newTowns.push(searchData);
    }
    setMountainTownsdata(...mountaintownsdata, newTowns);
    setMountainTowns(...mountaintowns, newTowns.name);
    setLoading(false);
  };
  useEffect(() => {
    addSeaCity();
    addMountainCity();
  }, []);
  {
    /* Image toggle logic*/
  }
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Haze: hazy,
    Mist: misty,
    Snow: snowy,
    Thunderstorm: thunders,
    Drizzle: drizzle,
    Fog: foggy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Heading
                  location={location}
                  setLocation={setLocation}
                  search={search}
                  data={data}
                  townslocation={townslocation}
                  setTownsLocation={setTownsLocation}
                  addCity={addCity}
                  towns={towns}
                  removeCity={removeCity}
                  fetchDefaultWeather={fetchDefaultWeather}
                />
                <div className="container">
                  <Defaulttown
                    data={data}
                    weatherImages={weatherImages}
                    loading={loading}
                  />
                  <Newtowns
                    townsdata={townsdata}
                    weatherImages={weatherImages}
                    loading={loading}
                  />
                </div>
              </>
            }
          />

          <Route
            path="/sea"
            element={
              <Seatowns
                seatownsdata={seatownsdata}
                weatherImages={weatherImages}
                loading={loading}
              />
            }
          />
          <Route
            path="/mountain"
            element={
              <Mountaintowns
                mountaintownsdata={mountaintownsdata}
                weatherImages={weatherImages}
                loading={loading}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default WeatherApp;
