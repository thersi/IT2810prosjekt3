import EnzymeToJson from "enzyme-to-json";
import { configure, mount, render, shallow } from "enzyme";
import MovieAppBar from "../components/MovieAppBar";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import MovieSearch from "../components/MovieSearch";

const component = <App />;
configure({ adapter: new Adapter() });
describe("App", () => {
  it("Should render MovieSearch", () => {
    const app = mount(component);
    expect(app.containsMatchingElement(<MovieSearch />)).toBe(true);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });
});
