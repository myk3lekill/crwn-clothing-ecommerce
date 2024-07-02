import { screen } from "@testing-library/react";

import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

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
})