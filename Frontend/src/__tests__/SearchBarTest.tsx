import EnzymeToJson from "enzyme-to-json";
import { configure, mount, render, shallow } from "enzyme";
import { StyledInputBase } from "../components/SearchBar/style";
import Adapter from "enzyme-adapter-react-16";
import SearchBar from "../components/SearchBar";
import { fireEvent } from "@testing-library/dom/types/events";
import userEvent from "@testing-library/user-event";

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
    /*  userEvent.type(textInput, "Test"); //finn */
    expect(textInput.text()).toContain("");
    /* fireEvent.change(textInput, "Test"); */
    /*  shallowComp.simulate("click"); */
  });
});
