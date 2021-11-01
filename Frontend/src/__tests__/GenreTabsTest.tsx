import EnzymeToJson from "enzyme-to-json";
import { configure, mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieFilter from "../components/MovieFilter";
import "@testing-library/jest-dom";

import GenreTabs from "../components/GenreTabs";

configure({ adapter: new Adapter() });
const component = (
  <GenreTabs
    handleGenre={() => {
      return "";
    }}
  />
);
describe("Genre Tabs", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = mount(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });
});
