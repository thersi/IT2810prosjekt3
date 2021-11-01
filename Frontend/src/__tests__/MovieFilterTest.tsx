import EnzymeToJson from "enzyme-to-json";
import { configure, mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieFilter from "../components/MovieFilter";
import "@testing-library/jest-dom";
import MenuItem from "@mui/material/MenuItem";

configure({ adapter: new Adapter() });
const component = (
  <MovieFilter
    handleSort={() => {
      return 1;
    }}
    handleFilter={() => {
      return "title";
    }}
  />
);
describe("Movie Filter", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });
});
/* it("Should render correct number of menu Items", () => {
    const shallowComp = mount(component);
    expect(shallowComp.find("IconButton").exists()).toBeTruthy(); */
/* expect(shallowComp.find("MenuItem")).toHaveLength(6); */

/*  it("Should show the chosen menu item", () => {
    const shallowComp = shallow(component);
    expect(shallowComp.find("#ascCheck").parent).toBe(
      shallowComp.find("#checkAsc")
    ); */

//descSort.simulate("click");

/* 
it("should contain correct components", () => {
  expect(component.find("SearchBar").exists()).toBeTruthy();
  expect(component.find("MovieFilter").exists()).toBeTruthy();
  expect(component.find("MovieDialog").exists()).toBeFalsy();
});
 */
