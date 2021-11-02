import EnzymeToJson from "enzyme-to-json";
import { configure, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieSearch from "../components/MovieSearch";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Pagination } from "@mui/material";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});
const component = (
  <ApolloProvider client={client}>
    <MovieSearch />
  </ApolloProvider>
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
  // Usikker på hvoradan man skal sjekke pagination her?
});
