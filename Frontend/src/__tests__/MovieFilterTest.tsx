import EnzymeToJson from "enzyme-to-json";
import { configure, render, shallow } from "enzyme";
import MovieAppBar from "../components/MovieAppBar";
import Adapter from "enzyme-adapter-react-16";
import MovieFilter from "../components/MovieFilter";
import { MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
const component = (
  <MovieFilter
    handleSort={() => {
      return 1;
    }}
    handleFilter={() => {
      return "";
    }}
  />
);
configure({ adapter: new Adapter() });
describe("Movie Filter", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });

  it("Should contain correct number of elements", () => {
    const shallowComp = shallow(component);
    expect(shallowComp.find(MenuItem)).toHaveLength(6);
  });
  /* it("Should contain correct checked components", () => {
    const shallowComp = shallow(component);
    const checkIconAsc = shallowComp.find("");
    console.log(shallowComp);
    expect(shallowComp.contains("CheckIcon")).toBeTruthy;
  }); */
});
