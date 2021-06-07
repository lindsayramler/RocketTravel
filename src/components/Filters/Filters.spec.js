import React from "react";
import { shallow } from "enzyme";
import Filters from "./Filters";

describe("Filters", () => {
  const wrapper = shallow(<Filters originalHotels={[]} />);

  it("renders the component", () => {
    expect(wrapper.find(".filters").exists()).toBe(true);
  });

  it("check if price filter has active class", () => {
    expect(wrapper.find(".filter-item").at(0).hasClass("active")).toBe(true);
  });
});
