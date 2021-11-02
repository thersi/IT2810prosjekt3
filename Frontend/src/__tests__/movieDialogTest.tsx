import React from "react";
import EnzymeToJson from "enzyme-to-json";
import Enzyme, { configure, render, shallow, mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import MovieDialog from "../components/MovieDialog"
import { Movie } from "../Interfaces/Interfaces";
import { USERWHITESPACABLE_TYPES } from "@babel/types";
import { truncateSync } from "fs";
import "@testing-library/jest-dom";
import { MockedProvider } from '@apollo/client/testing';


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

console.log(movie.thumbsDown)

const component = ( //Must wrap in provider due to use of useSelector
    <MockedProvider>
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
    </MockedProvider>
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

    it('thumbsUp should increase by one', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(component);

        const button = wrapper.find('.thUp');

        button.simulate('click');

        expect(wrapper.find('.voted')).toEqual(true);
    });

    it('should display correct movie information', () => {
        render(component);
        const shallowComp = mount(component);
        expect(shallowComp.find(".thumbsDown").contains(7)).toBe(true);
    })

});


