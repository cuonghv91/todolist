import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlTab from './index';


describe('ControlTab component', () => {
    it('should have a item lefts info', () => {
        render(<ControlTab />);
        const itemLeft = screen.getByTestId('item-left')
        expect(itemLeft).not.toBeNull()
    });

    it("should have button that filters all items", () => {
        render(<ControlTab />);
        const allItems = screen.getByTestId('all-items')
        expect(allItems).not.toBeNull()
    })

    it("should have button that filters active items", () => {
        render(<ControlTab />);
        const activeItems = screen.getByTestId('active-items')
        expect(activeItems).not.toBeNull()
    })

    it("should have button that filters completed items", () => {
        render(<ControlTab />);
        const completedItems = screen.getByTestId('complete-items')
        expect(completedItems).not.toBeNull()
    })

    it("should have button that trigger clearing completed items", () => {
        render(<ControlTab />);
        const clearCompletedItems = screen.getByTestId('clear-complete-items')
        expect(clearCompletedItems).not.toBeNull()
    })

    it("should display the correct item left when value of item left amount passed", () => {
        const itemLeftAmount = 100;
        render(<ControlTab itemLeft={itemLeftAmount} />);
        const itemLeft = screen.getByTestId('item-left')
        expect(itemLeft.textContent).toBe(`${itemLeftAmount} item left`)
    })

    it("should active the All button by default and inactive all others button by default", () => {
        render(<ControlTab />);
        const allItems = screen.getByTestId('all-items')
        const activeItems = screen.getByTestId('active-items')
        const completedItems = screen.getByTestId('complete-items')
        expect(allItems.className.indexOf('border border-gray-200')).not.toBe(-1)
        expect(activeItems.className.indexOf('border border-gray-200')).toBe(-1)
        expect(completedItems.className.indexOf('border border-gray-200')).toBe(-1)
    })

    it("should active the Active button when activeControlTab is active", () => {
        render(<ControlTab activeControlTab="active" />);
        const allItems = screen.getByTestId('all-items')
        const activeItems = screen.getByTestId('active-items')
        const completedItems = screen.getByTestId('complete-items')
        expect(allItems.className.indexOf('border border-gray-200')).toBe(-1)
        expect(activeItems.className.indexOf('border border-gray-200')).not.toBe(-1)
        expect(completedItems.className.indexOf('border border-gray-200')).toBe(-1)
    })

    it("should active the Completed button when activeControlTab is completed", () => {
        render(<ControlTab activeControlTab="completed" />);
        const allItems = screen.getByTestId('all-items')
        const activeItems = screen.getByTestId('active-items')
        const completedItems = screen.getByTestId('complete-items')
        expect(allItems.className.indexOf('border border-gray-200')).toBe(-1)
        expect(activeItems.className.indexOf('border border-gray-200')).toBe(-1)
        expect(completedItems.className.indexOf('border border-gray-200')).not.toBe(-1)
    })

    it("should hide the Clear completed button by default", () => {
        render(<ControlTab isHavingCompletedTask={false} />);
        const clearCompletedItems = screen.getByTestId('clear-complete-items')
        expect(clearCompletedItems.className.indexOf('hidden')).toBe(-1)
    })

    it("should show the Clear completed button when isHavingCompletedTask is true", () => {
        render(<ControlTab isHavingCompletedTask={true} />);
        const clearCompletedItems = screen.getByTestId('clear-complete-items')
        expect(clearCompletedItems.className.indexOf('hidden')).not.toBe(-1)
    })

    it("should call onFilterAll function when All button get click", () => {
        const myMockFilterAll = jest.fn();
        render(<ControlTab onFilterAll={myMockFilterAll} />);
        const allItems = screen.getByTestId('all-items')
        fireEvent.click(allItems)
        expect(myMockFilterAll).toHaveBeenCalled();
    })

    it("should call onFilterActive function when Active button get click", () => {
        const myMockFilterAactive = jest.fn();
        render(<ControlTab onFilterActive={myMockFilterAactive} />);
        const activeItems = screen.getByTestId('active-items')
        fireEvent.click(activeItems)
        expect(myMockFilterAactive).toHaveBeenCalled();
    })

    it("should call onFilterCompleted function when Completed button get click", () => {
        const myMockFilterCompleted = jest.fn();
        render(<ControlTab onFilterCompleted={myMockFilterCompleted} />);
        const activeItems = screen.getByTestId('complete-items')
        fireEvent.click(activeItems)
        expect(myMockFilterCompleted).toHaveBeenCalled();
    })

    it("should call onClearCompleted function when Clear completed button get click", () => {
        const myMockFilterClearCompleted = jest.fn();
        render(<ControlTab onClearCompleted={myMockFilterClearCompleted} />);
        const activeItems = screen.getByTestId('clear-complete-items')
        fireEvent.click(activeItems)
        expect(myMockFilterClearCompleted).toHaveBeenCalled();
    })
})
