import { useNavigate } from "react-router-dom";
import timer from "./timer";
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

const Heading = ({
  location,
  setLocation,
  search,
  data,
  townslocation,
  setTownsLocation,
  addCity,
  towns,
  removeCity,
  fetchDefaultWeather,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="heading">
        <div className="search-bar1">
          <input
            type="text"
            placeholder="Set default town"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />

          {localStorage.getItem("WeatherAPP-Default") != null ? (
            <button
              onClick={() => {
                localStorage.removeItem("WeatherAPP-Default");
                setLocation("");
                fetchDefaultWeather();
              }}
            >
              Clear default
            </button>
          ) : (
            <button onClick={search}>Set default</button>
          )}

          <h3 className="default-town-name">
            {typeof data.name !== "undefined" ? "🔒" + data.name : "...?"}
          </h3>
          <div>
            <button className="heading-button" onClick={() => navigate("/sea")}>
              Sea ☀️🏝️🌅
            </button>
          </div>
          <div>
            <button
              className="heading-button"
              onClick={() => navigate("/mountain")}
            >
              Mountain ❄️⛰️🛷
            </button>
          </div>
          <div className="author-button">
            <a href="https://nebojsajovanovic.netlify.app/" target="_blank">
              ©️
            </a>
          </div>
        </div>

        <div className="search-bar2">
          <input
            type="text"
            value={townslocation}
            placeholder="Add town"
            onChange={(e) => {
              setTownsLocation(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addCity();
            }}
          >
            Add town
          </button>
          <div className="towns-icon">🏛️</div>
          <div className="selected-towns">
            {towns &&
              towns.map((item, index) => (
                <div key={index} className="towns">
                  <p key={index}>{item}</p>
                  <small
                    id={index}
                    onClick={removeCity}
                    className="remove-town"
                  >
                    ❌
                  </small>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
