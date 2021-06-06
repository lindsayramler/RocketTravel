import React from "react";

import hotelPlaceholderImage from "../../assets/hotel-placeholder.png";

const Directory = ({ hotels, errorMessage }) => {
  return (
    <div className="results">
      {errorMessage.length > 0 ? (
        <h1 className="error-message">{errorMessage}</h1>
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
  );
};

export default Directory;
