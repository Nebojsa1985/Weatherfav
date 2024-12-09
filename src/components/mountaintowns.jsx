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

const Mountaintowns = ({ mountaintownsdata, weatherImages, loading }) => {
  const navigate = useNavigate();
  return (
    <>
      <button className="button-fixed" onClick={() => navigate("/")}>
        Home
      </button>

      <div className="container-fixed">
        {mountaintownsdata &&
          mountaintownsdata.map((item, index) => (
            <div className="weather-app" key={index}>
              <div className="card">
                <div className="card-top">
                  <div className="location">
                    {item.name}, {item.sys ? item.sys.country : null}
                  </div>
                </div>
                <div className="weather-date">
                  <p>{timer()}</p>
                </div>
              </div>
              {loading ? (
                <img className="loader" src={LoadingGif} alt="Loading..." />
              ) : (
                <>
                  {" "}
                  <div className="weather">
                    <img
                      src={
                        item.weather
                          ? weatherImages[item.weather[0].main]
                          : null
                      }
                      alt="x"
                    />
                    <div className="weather-type">
                      {item.weather ? item.weather[0].main : null}
                    </div>
                    <div className="temp">
                      {item.main ? `${Math.floor(item.main.temp)}°` : null}
                    </div>
                  </div>
                  <div className="weather-data">
                    <div className="humidity">
                      <div className="data-name">Humidity</div>
                      <i className="fa-solid fa-droplet"></i>
                      <div className="data">
                        {item.main ? item.main.humidity : null}%
                      </div>
                    </div>
                    <div className="wind">
                      <div className="data-name">Wind</div>
                      <i className="fa-solid fa-wind"></i>
                      <div className="data">
                        {item.wind ? item.wind.speed : null} km/h
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Mountaintowns;
