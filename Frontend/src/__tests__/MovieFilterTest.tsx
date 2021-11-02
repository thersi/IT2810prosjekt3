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

  it("Should show correct menuItems", () => {
    const shallowComp = shallow(component);
    const menuItems = shallowComp.find(MenuItem);
    expect(menuItems.get(1).props.value).toBe("asc");
    expect(menuItems.get(2).props.value).toBe("desc");
    expect(menuItems.get(4).props.value).toBe("Title");
    expect(menuItems.get(5).props.value).toBe("Year");
  });
});
