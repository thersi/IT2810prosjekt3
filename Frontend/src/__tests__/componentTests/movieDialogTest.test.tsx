import React from "react";
import EnzymeToJson from "enzyme-to-json";
import Enzyme, { configure, render, shallow, mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import MovieDialog from "../../components/MovieDialog";
import { Movie } from "../../Interfaces/Interfaces";
import { USERWHITESPACABLE_TYPES } from "@babel/types";
import { truncateSync } from "fs";
import button from '../../components/MovieDialog';
import "@testing-library/jest-dom";

const movie: Movie = {
    _id: "6169c636b56d4",
    title: "Avengers: Endgame",
    year: 2019,
    thumbsUp: 96,
    thumbsDown: 7,
    genre: ["action", "comedy"],
    actors: ["Robert Downey Jr.", "Chris Evans"],
    poster: "url",
  };

const component = ( //Must wrap in provider due to use of useSelector
    <MovieDialog
        movie = {movie}
        setOpen = {React.useState}
        setThumbsUp = {React.useState}
        thumbsUp = {movie.thumbsUp}
        setThumbsDown = {React.useState}
        thumbsDown = {movie.thumbsDown}
        voted = {false}
        setVoted = {React.useState}
    />
);

configure({ adapter: new Adapter() });

describe('MovieDialog', () => {
    it('renders', () => {
        render(component);
    });

    it('Should match snapshot test', () => {
        const snapshotCheck = shallow(component);
        expect(EnzymeToJson(snapshotCheck)).toMatchSnapshot();
    });

    it('should display correct movie information', () => {
        const shallowComp = mount(component);
        expect(shallowComp.find(".thumbsUp").contains(96)).toBe(true);
        expect(shallowComp.find(".thumbsDown").contains(7)).toBe(true);
        expect(shallowComp.find(".text").contains("Avengers: Endgame")).toBe(true);

    })

});


