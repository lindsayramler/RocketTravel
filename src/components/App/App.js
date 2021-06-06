import React, { useState, useEffect } from "react";
import "./App.style.scss";

import hotelResultService from "../../services/hotel-result/hotel-result.service";
import hotelPlaceholderImage from "../../assets/hotel-placeholder.png";

const filterOptions = [
  {
    name: "Recommended",
    value: "recommended",
  },
  {
    name: "Price low-to-high",
    value: "ascending",
  },
  {
    name: "Price high-to-low",
    value: "descending",
  },
];

const App = () => {
  const [originalHotels, setOriginalHotels] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [priceFilterValue, setPriceFilterValue] = useState("recommended");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getHotels = () => {
    hotelResultService.get().then((response) => {
      if (response.success) {
        setOriginalHotels(response.results.hotels);
        setHotels(response.results.hotels);
      } else {
        setErrorMessage(
          "We're unable to fetch data right now. Please try again later."
        );
      }
    });
  };

  const revertToOriginal = () => {
    setHotels(originalHotels);
    setPriceFilterValue("recommended");
    setSearchTerm("");
  };

  useEffect(() => {
    getHotels();
  }, []);

  const filterResults = (originalHotels) => {
    let newHotels = originalHotels.slice(0);
    if (priceFilterValue !== "recommended") {
      newHotels.sort((a, b) =>
        priceFilterValue == "ascending"
          ? a.lowestAveragePrice.amount - b.lowestAveragePrice.amount
          : b.lowestAveragePrice.amount - a.lowestAveragePrice.amount
      );
    }
    if (searchTerm && searchTerm.length > 0) {
      const capitalizeSearchTerm = searchTerm
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      newHotels = newHotels.filter((hotel) =>
        hotel.hotelStaticContent.name.includes(capitalizeSearchTerm)
      );
    }
    newHotels.length < 1 &&
    (priceFilterValue !== "recommended" || searchTerm.length > 0)
      ? setErrorMessage("Your query produced no results. Try again.")
      : setErrorMessage("");
    setHotels(newHotels);
  };

  useEffect(() => {
    filterResults(originalHotels);
  }, [searchTerm, priceFilterValue, originalHotels]);

  return (
    <div className="app-container">
      <div className="content">
        <div>
          <div className="filters">
            Hotel name
            <input
              type="text"
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            Price
            {filterOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => setPriceFilterValue(option.value)}
                style={{
                  border: "solid 1px",
                  backgroundColor:
                    option.value === priceFilterValue ? "gray" : "white",
                }}
              >
                {option.name}
              </div>
            ))}
            <button className="button" onClick={() => revertToOriginal()}>
              Reset
            </button>
          </div>
        </div>

        {errorMessage.length > 0 ? (
          <h1>{errorMessage}</h1>
        ) : (
          <div className="hotel-list">
            {hotels &&
              hotels.map((hotel) => (
                <div className="hotel-card" key={hotel.id}>
                  <div className="hotel-image">
                    <img
                      src={hotel.hotelStaticContent.mainImage.url}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${hotelPlaceholderImage}`;
                      }}
                    />
                  </div>
                  <div className="hotel-details">
                    <div className="hotel-name">
                      {hotel.hotelStaticContent.name}
                    </div>
                    <div className="location">
                      {hotel.hotelStaticContent.neighborhoodName}
                    </div>
                  </div>
                  <div className="price-details">
                    <span className="price">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: hotel.lowestAveragePrice.symbol,
                        }}
                      ></span>
                      {hotel.lowestAveragePrice.amount}
                    </span>
                    <span className="rewards">{hotel.rewards.miles} miles</span>
                    <button className="button">Select</button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
