import { render, screen } from "@testing-library/react";
import 'jest-styled-components';
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe('button test', () => {
    test('should render base button when nothing is passed', () => {
        render(<Button> Test </Button>)

        const buttonElement1 = screen.getByText(/test/i);
        const buttonElement2 = screen.getByRole('button');
        expect(buttonElement1).toHaveStyleRule('background-color: black')
    })

    test('should render google button when passed google type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google}/>)

        const googleButtonElement = screen.getByRole('button');
        expect(googleButtonElement).toHaveStyleRule('background-color: #4285f4')
    })

    test('should render inverted button when passed inverted button type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}/>)

        const invertedButton = screen.getByRole('button');
        expect(invertedButton).toHaveStyleRule('background-color: white')
    })

    test('should be disabled if issLoading is true', () => {
        render(<Button isLoading={true} />)

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled()
    })
})

