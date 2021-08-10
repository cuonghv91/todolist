import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnterBox from './index';


describe('Enter Box component', () => {
    it('should have a toggle button', () => {
        render(<EnterBox />);
        const toggleBtn = screen.getByTestId('toggle-btn')
        expect(toggleBtn).not.toBeNull()
    });

    it("should have an inputbox", () => {
        render(<EnterBox />);
        const inputBox = screen.getByTestId('input')
        expect(inputBox).not.toBeNull()
    })

    it("should have the input with placeholder 'What needs to be done ?'", () => {
        render(<EnterBox />);
        const inputBox = screen.queryByPlaceholderText(/What needs to be done ?/i)
        expect(inputBox).not.toBeNull()
    })

    it("should have a clear text icon", () => {
        render(<EnterBox />);
        const clearText = screen.getByTestId('clear-text')
        expect(clearText).not.toBeNull()
    })

    it("should hide the clear text icon by default", () => {
        render(<EnterBox />);
        const clearText = screen.getByTestId('clear-text')
        expect(clearText.className.indexOf('hidden')).not.toBe(-1)
    })

    it("should clear the input when clear text icon get clicked", async () => {
        render(<EnterBox />);
        const clearText = screen.getByTestId('clear-text')
        const inputBox = await screen.getByTestId('input') as HTMLInputElement
        fireEvent.change(inputBox, { target: { value: 'non empty' } })
        fireEvent.click(clearText)
        expect(inputBox.value).toBe('')
    })

    it("should hide itself when clear text icon get clicked", () => {
        render(<EnterBox />);
        const clearText = screen.getByTestId('clear-text')
        fireEvent.click(clearText)
        expect(clearText.className.indexOf('hidden')).not.toBe(-1)
    })

    it("should toggle the clear text icon whether input value is empty or not", async () => {
        render(<EnterBox />);
        const inputBox = await screen.getByTestId('input')
        fireEvent.change(inputBox, { target: { value: 'non empty' } })
        const clearText = screen.getByTestId('clear-text')
        expect(clearText.className.indexOf('hidden')).toBe(-1)

        fireEvent.change(inputBox, { target: { value: '' } })
        expect(clearText.className.indexOf('hidden')).not.toBe(-1)
    })

    it("should call onSubmitTask and remove input text and hide clear icon", async () => {
        const myMockSubmitTask = jest.fn();
        render(<EnterBox onSubmitTask={myMockSubmitTask} />);
        const inputBox = await screen.getByTestId('input') as HTMLInputElement
        const clearText = screen.getByTestId('clear-text')
        fireEvent.change(inputBox, { target: { value: 'non empty' } })
        fireEvent.submit(inputBox)
        expect(myMockSubmitTask).toHaveBeenCalled();
        expect(inputBox.value).toBe('')
        expect(clearText.className.indexOf('hidden')).not.toBe(-1)
    })

})
