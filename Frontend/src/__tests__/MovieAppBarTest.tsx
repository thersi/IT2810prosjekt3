import EnzymeToJson from "enzyme-to-json";
import { configure, render, shallow } from "enzyme";
import MovieAppBar from "../components/MovieAppBar";
import Adapter from "enzyme-adapter-react-16";

const component = (
  <MovieAppBar
    handleSearch={() => {
      return "";
    }}
    handleSort={() => {
      return 1;
    }}
    handleFilter={() => {
      return "";
    }}
  />
);
configure({ adapter: new Adapter() });
describe("Movie App Bar", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });

  it("Should contain components", () => {
    const shallowComp = shallow(component);
    expect(shallowComp.find("MovieFilter").exists()).toBeTruthy();
    expect(shallowComp.find("SearchBar").exists()).toBeTruthy();
    expect(shallowComp.find("MovieDialog").exists()).toBeFalsy();
  });
});
