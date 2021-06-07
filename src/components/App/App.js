import React, { useState, useEffect } from "react";
import "./App.style.scss";
import { Directory, Filters } from "../../components";
import hotelResultService from "../../services/hotel-result/hotel-result.service";

const App = () => {
  const [originalHotels, setOriginalHotels] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const updateHotelList = (hotelList) => {
    setHotels(hotelList);
  };

  const updateErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  useEffect(() => {
    hotelResultService.get().then((response) => {
      if (response && response.success) {
        setOriginalHotels(response.results.hotels);
        setHotels(response.results.hotels);
      } else {
        setErrorMessage(
          "We're unable to fetch data right now. Please try again later."
        );
      }
    });
  }, []);

  return (
    <div className="app-container">
      <Filters
        originalHotels={originalHotels}
        updateHotelList={updateHotelList}
        updateErrorMessage={updateErrorMessage}
      />

      <Directory hotels={hotels} errorMessage={errorMessage} />
    </div>
  );
};

export default App;
