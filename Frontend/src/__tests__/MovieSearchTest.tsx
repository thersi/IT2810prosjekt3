import EnzymeToJson from "enzyme-to-json";
import { configure, render, shallow } from "enzyme";
import MovieAppBar from "../components/MovieAppBar";
import Adapter from "enzyme-adapter-react-16";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import GenreTabs from "../components/GenreTabs";

const component = <MovieSearch />;
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
    expect(shallowComp.find(MovieList).exists()).toBeTruthy();
    expect(shallowComp.find(MovieAppBar).exists()).toBeTruthy();
    expect(shallowComp.find(GenreTabs).exists()).toBeTruthy();
  });
});
