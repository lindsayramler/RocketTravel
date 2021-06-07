import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import resetIcon from "../../assets/icons/reset.png";

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

const Filters = ({ originalHotels, updateHotelList, updateErrorMessage }) => {
  const [priceFilterValue, setPriceFilterValue] = useState("recommended");
  const [searchTerm, setSearchTerm] = useState("");

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
      ? updateErrorMessage("Your query produced no results. Try again.")
      : updateErrorMessage("");
    updateHotelList(newHotels);
  };

  const clearFilters = () => {
    updateHotelList(originalHotels);
    setPriceFilterValue("recommended");
    setSearchTerm("");
  };

  useEffect(() => {
    filterResults(originalHotels);
  }, [searchTerm, priceFilterValue, originalHotels]);

  return (
    <div className="filters">
      <div className="search-box" role="search">
        <input
          type="text"
          className="input"
          placeholder="Search by hotel name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          role="searchbox"
        />
      </div>
      <p>Filter by:</p>
      <div className="price-filter" role="switch">
        {filterOptions.map((option) => (
          <div
            key={option.value}
            className={
              option.value === priceFilterValue
                ? "filter-item active"
                : "filter-item"
            }
            onClick={() => setPriceFilterValue(option.value)}
            aria-checked={option.value === priceFilterValue ? "true" : "false"}
          >
            {option.name}
          </div>
        ))}
      </div>
      <div className="reset" onClick={() => clearFilters()} role="button">
        <img src={resetIcon} className="reset-icon" />
        Reset all filters
      </div>
    </div>
  );
};

Filters.propTypes = {
  originalHotels: PropTypes.array.isRequired,
  updateHotelList: PropTypes.func,
  updateErrorMessage: PropTypes.func,
};

Filters.defaultProps = {
  originalHotels: [],
};

export default Filters;
