import EnzymeToJson from "enzyme-to-json";
import { configure, render, shallow } from "enzyme";
import MovieAppBar from "../components/MovieAppBar";
import Adapter from "enzyme-adapter-react-16";
import MovieList from "../components/MovieList";
import { useQuery } from "@apollo/client";
import {
  Movie,
  QueryMoviesInput,
  QueryMoviesResult,
} from "../Interfaces/Interfaces";
import { QUERY_ALL_MOVIES } from "../Queries/queries";
import SingleDisplay from "../components/SingleDisplay";

const createMovie = (id: string) => {
  const movie: Movie = {
    _id: id,
    title: "Avengers: Endgame",
    year: 2019,
    thumbsUp: 196,
    thumbsDown: 37,
    genre: ["action", "comedy"],
    actors: ["Robert Downey Jr.", "Chris Evans"],
    poster: "url",
  };
  return movie;
};
const data: Movie[] = [];
for (let i = 0; i < 10; i++) {
  data.push(createMovie(i.toString()));
}

const component = <MovieList data={data} />;

configure({ adapter: new Adapter() });
describe("Movie App Bar", () => {
  it("renders correctly", () => {
    render(component);
  });
  it("Should match snapshot", () => {
    const snapshotCheck = shallow(component);
    expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
  });

  it("Should display correct number of movies", () => {
    const shallowComp = shallow(component);
    expect(shallowComp.find(SingleDisplay)).toHaveLength(10);
  });
});
