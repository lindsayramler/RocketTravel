import React from "react";
import { shallow } from "enzyme";
import Filters from "./Filters";

describe("Filters", () => {
  const wrapper = shallow(<Filters />);

  it("renders the component", () => {
    expect(wrapper.find(".filters").exists()).toBe(true);
  });
});
