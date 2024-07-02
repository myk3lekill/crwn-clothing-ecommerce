import { screen } from "@testing-library/react";

import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { setIsCartOpen } from "../../../store/cart/cart.action";
import { CartItems } from "../../../components/cart-dropdown/cart-dropdown.styles";

describe('Navigation tests', () => {
    test('It should render a Sign In link if there is no currentUser', () => {
        renderWithProviders(<Navigation />, {
          preloadedState: {
            user: {
              currentUser: null,
            },
          },
        });
    
        expect(screen.getByText('SIGN IN')).toBeInTheDocument();
      });
    
      test('It should not render Sign In if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
          preloadedState: {
            user: {
              currentUser: {},
            },
          },
        });
    
        expect(screen.queryByText('SIGN IN')).toBeNull();
      });

      test('It should render Sign Out if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
          preloadedState: {
            user: {
              currentUser: {},
            },
          },
        });
    
        expect(screen.getByText('SIGN OUT')).toBeInTheDocument();
      });

      test('It should not render cart dropdown if isCartOpen is false', () => {
        renderWithProviders(<Navigation />, {
          preloadedState: {
            cart: {
              isCartOpen: false,
              cartItems: [],
            },
          },
        });
    
        expect(screen.queryByText('Your Cart is empty')).toBeNull();
      });

      test('It should render cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<Navigation />, {
          preloadedState: {
            cart: {
              isCartOpen: true,
              cartItems: [],
            },
          },
        });
    
        expect(screen.getByText('Your Cart is empty')).toBeInTheDocument()
      });
      
      });