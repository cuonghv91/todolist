import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './index';


describe('Card component', () => {
    it('should have a checkbox', () => {
        render(<Card />);
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).not.toBeNull()
    });

    it('should have a description', () => {
        render(<Card />);
        const description = screen.getByTestId('description')
        expect(description).not.toBeNull()
    });

    it('should have a remove icon', () => {
        render(<Card />);
        const removeIcon = screen.getByTestId('remove-icon')
        expect(removeIcon).not.toBeNull()
    });

    it("should hide the remove icon by default", () => {
        render(<Card />);
        const removeIcon = screen.getByTestId('remove-icon')
        expect(removeIcon.className.indexOf('hidden')).not.toBe(-1)
    })

    it("should have the checkbox unchecked by default", () => {
        render(<Card />);
        const checkbox = screen.getByTestId('checkbox-input')
        expect((checkbox as HTMLInputElement).checked).toBe(false)
    })

    it("should call a remove callback when remove icon gets clicked", () => {
        const cardId = 1;
        const myMockRemoveCardCallback = jest.fn();
        render(<Card id={cardId} onRemove={myMockRemoveCardCallback} />);
        const removeIcon = screen.getByTestId('remove-icon')
        fireEvent.click(removeIcon)
        expect(myMockRemoveCardCallback.mock.calls[0][0]).toBe(cardId);
    })

    it("should call a callback function of toggle checkbox when the checkbox get toggle", () => {
        const cardId = 1;
        const myMockToggleCheckCallback = jest.fn();
        render(<Card id={cardId} onToggleCheck={myMockToggleCheckCallback} />);
        const checkbox = screen.getByTestId('checkbox-input')
        fireEvent.click(checkbox)
        expect(myMockToggleCheckCallback.mock.calls[0][0]).toBe(cardId);
    })

    it("should display with description passed", () => {
        const descriptionText = "test description"
        render(<Card description={descriptionText} />);
        const description = screen.getByTestId('description')
        expect(description.textContent).toBe(descriptionText)
    })

    it("should get the checked box checked with isChecked = true is passed", () => {
        render(<Card isChecked={true} />);
        const checkbox = screen.getByTestId('checkbox-input')
        expect((checkbox as HTMLInputElement).checked).toBe(true)
    })
})
