import EnzymeToJson from "enzyme-to-json";
import { configure, mount, render, shallow } from "enzyme";
import MovieAppBar from "../components/MovieAppBar";
import Adapter from "enzyme-adapter-react-16";
import SingleDisplay from "../components/SingleDisplay";
import { Movie } from "../Interfaces/Interfaces";

const movie: Movie = {
  _id: "6169c636b56d4eff214f61f6",
  title: "Avengers: Endgame",
  year: 2019,
  thumbsUp: 196,
  thumbsDown: 37,
  genre: ["action", "comedy"],
  actors: ["Robert Downey Jr.", "Chris Evans"],
  poster: "url",
};

const component = <SingleDisplay key={0} movie={movie} />;
configure({ adapter: new Adapter() });
describe("Single Movie Display", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });

  it("Should display correct movie information", () => {
    const shallowComp = mount(component);
    expect(shallowComp.find(".thumbUp").contains(196)).toBe(true);
    expect(shallowComp.find(".thumbDown").contains(37)).toBe(true);
    expect(shallowComp.find(".thumbDown").contains(89)).toBe(false);
    expect(shallowComp.find(".thumbDown").contains(89)).toBe(false);
    expect(
      shallowComp.find(".text").contains("Avengers: Endgame (2019) ")
    ).toBe(true);
  });
});
