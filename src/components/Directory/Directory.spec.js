import React from "react";
import { shallow } from "enzyme";
import Directory from "./Directory";

describe("Directory", () => {
  const wrapper = shallow(<Directory hotels={[]} />);

  it("renders the component", () => {
    expect(wrapper.find(".results").exists()).toBe(true);
  });
});
