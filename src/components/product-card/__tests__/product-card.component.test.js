import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from 'react-redux';
import * as userAction from "../../../store/user/user.action";

import { renderWithProviders } from "../../../utils/test/test.utils";
import ProductCard from "../product-card.component";
import Navigation from "../../../routes/navigation/navigation.component";
import { signOutStart } from "../../../store/user/user.action";

describe('Product Card tests', () => {
    test('it should add the product item when Product Card button is clicked', async() => {
        const mockProduct = {
            id:1,
            imageUrl: 'test',
            name: 'Item A',
            price: 10
        }
        const {store} = renderWithProviders(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        })
        const addToCartButtonElement = screen.getByText(/Add to card/i)
        await fireEvent.click(addToCartButtonElement);

        expect(store.getState().cart.cartItems.length).toBe(1)
    })

    test('it should dispatch signOutStart action when clickin og the Sign Out link', async() => {
        const mockDispatch = jest.fn();
        jest.mock("react-redux", () => ({
            ...jest.requireActual("react-redux"),
            useDispatch: () => mockDispatch,
          }));
                          
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {email: 'hey@me.com'},
                    isLoading: false,
                    error: null
                }
            }
        });

        const signOutLink = screen.getByText(/SIGN OUT/i);
        expect(signOutLink).toBeInTheDocument();
        
        const signOutStartAction = jest.spyOn(userAction, 'signOutStart');
        await fireEvent.click(signOutLink);
        expect(signOutStartAction).toHaveBeenCalled();
    })
})