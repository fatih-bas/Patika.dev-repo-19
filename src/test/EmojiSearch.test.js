import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from '../App';

describe('test header, filter emoji, copy emoji', () => {
   let smiley, input, title;

    beforeEach(() => {
        render(<App />);
        smiley = screen.getByText("Smiley");
        input = screen.getByPlaceholderText("Search Emoji");
    });
    
    test('header should render', ()=>{
       title = screen.getByText('Emoji Search');
      expect(title.toBeInDocument);
    });

    test("default emoji list should render", () => {
        expect(smiley.toBeInTheDocument);
    });

    test("filter emoji list", () => {
        const emojiText = "Wink";
        userEvent.type(input, emojiText);
        expect(smiley).not.toBeInTheDocument();
    });

    test("emoji should copy when the clicked", () => {
        document.execCommand = jest.fn();
        userEvent.click(smiley);
        expect(document.execCommand).toBeCalledWith('copy') 
        const copyEmoji = window.ClipboardData; 
        expect(copyEmoji).toEqual(smiley.value);
    });
});