import EnzymeToJson from "enzyme-to-json";
import { configure, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieSearch from "../components/MovieSearch";
import { MockedProvider } from "@apollo/client/testing";
const component = (
  <MockedProvider>
    <MovieSearch />
  </MockedProvider>
);

configure({ adapter: new Adapter() });
describe("Movie Search", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });

  it("Should contain components", () => {
    const shallowComp = shallow(component);
    expect(shallowComp.contains("Pagination"));
    expect(shallowComp.contains("MovieAppBar"));
    expect(shallowComp.contains("GenreTabs"));
    expect(shallowComp.contains("MovieList"));
  });
});
