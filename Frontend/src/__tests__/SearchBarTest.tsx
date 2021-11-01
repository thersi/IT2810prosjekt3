import EnzymeToJson from "enzyme-to-json";
import { configure, mount, render, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import SearchBar from "../components/SearchBar";

const component = (
  <SearchBar
    handleSearch={() => {
      return "the";
    }}
  />
);
configure({ adapter: new Adapter() });
describe("Search Bar", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });

  it("Should contain components", () => {
    const shallowComp = shallow(component);
    const textInput = shallowComp.find("#search-bar");
    expect(textInput.text()).toContain("");
  });
});
