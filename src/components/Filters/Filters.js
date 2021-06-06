import React, { useState, useEffect } from "react";

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
      Hotel name
      <input
        type="text"
        className="input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      Price
      <div className="price-filter">
        {filterOptions.map((option) => (
          <div
            key={option.value}
            className={
              option.value === priceFilterValue
                ? "filter-item active"
                : "filter-item"
            }
            onClick={() => setPriceFilterValue(option.value)}
          >
            {option.name}
          </div>
        ))}
      </div>
      <button className="button" onClick={() => clearFilters()}>
        Reset
      </button>
    </div>
  );
};

export default Filters;
