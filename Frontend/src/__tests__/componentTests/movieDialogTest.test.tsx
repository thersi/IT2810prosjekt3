import React, { forwardRef, useState } from "react";
import Enzyme, { ReactWrapper, render, shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import MovieDialog from "../../components/MovieDialog";
import { Movie } from "../../Interfaces/Interfaces";
import { USERWHITESPACABLE_TYPES } from "@babel/types";
import { truncateSync } from "fs";
import button from '../../components/MovieDialog';

Enzyme.configure({ adapter: new Adapter() });

const movie = {
    _id:"1111",
    title:"The Batman",
    thumbsUp:50,
    year:2022,
    genre: ["Action", "Drama"],
    actors: ["Amber Sienna", "Robert Pattinson"],
    thumbsDown: 4,
    poster: "https://img.rnudah.com/images/98/986929108829470.jpg"
};

const [open, setOpen] = useState(true);
const [thumbsUp, setThumbsUp] = useState(movie.thumbsUp)
const [thumbsDown, setThumbsDown] = useState(movie.thumbsDown)
const [voted, setVoted] = useState(true)

Enzyme.configure({ adapter: new Adapter() });

const component = ( //Must wrap in provider due to use of useSelector
    <MovieDialog
        movie = {movie}
        setOpen = {setOpen}
        setThumbsUp = {setThumbsUp}
        thumbsUp = {thumbsUp}
        setThumbsDown = {setThumbsDown}
        thumbsDown = {thumbsDown}
        voted = {voted}
        setVoted = {setVoted}
        refetch = {undefined}
    />
);


describe('MovieDialog', () => {
    it('renders', () => {
        render(component);
    });
});

describe('MovieDialog', () => {
    it('test cancel button', () => {
        const mockCallBack = jest.fn();

        const cancelButton = shallow(<button onClick={mockCallBack}></button>)
        cancelButton.find('cancel').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1)
    });

});

