import React from "react";
import { shallow } from "enzyme";
import Directory from "./Directory";

describe("Directory", () => {
  const wrapper = shallow(<Directory />);

  it("renders the component", () => {
    expect(wrapper.find(".hotel-list").exists()).toBe(true);
  });
});
