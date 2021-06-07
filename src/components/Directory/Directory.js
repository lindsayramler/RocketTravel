import React from "react";
import PropTypes from "prop-types";

import hotelPlaceholderImage from "../../assets/hotel-placeholder.png";
import locationPinImage from "../../assets/icons/location.png";
import starSolidImage from "../../assets/icons/star-solid.png";
import starOutlineImage from "../../assets/icons/star-outline.png";

const Directory = ({ hotels, errorMessage }) => {
  return (
    <div className="results">
      {errorMessage && errorMessage.length > 0 ? (
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
                  <div className="hotel-stars">
                    {[1, 2, 3, 4, 5].map((star) => {
                      let image;
                      star <= hotel.hotelStaticContent.stars
                        ? (image = (
                            <img
                              src={starSolidImage}
                              style={{ opacity: 0.5 }}
                            />
                          ))
                        : (image = (
                            <img
                              src={starOutlineImage}
                              style={{ opacity: 0.3 }}
                            />
                          ));
                      return image;
                    })}
                  </div>
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
                  <span className="rewards">
                    <img className="icon" src={locationPinImage} />
                    {hotel.rewards.miles} miles
                  </span>
                  <div className="book-button">
                    <button className="button">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

Directory.propTypes = {
  hotels: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
};

Directory.defaultProps = {
  hotels: [],
};

export default Directory;
