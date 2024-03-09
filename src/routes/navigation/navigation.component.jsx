import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg';

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles'

import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
  
  const currentUser = useSelector(selectCurrentUser)

  const isCartOpen = useSelector(selectIsCartOpen)

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  //console.log(currentUser)
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrownLogo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                  currentUser ? (
                    <NavLink as='span' onClick={signOutUser}> SIGN OUT </NavLink>
                  ) : (
                    <NavLink className="nav-link" to='/auth'>
                      SIGN IN
                    </NavLink>
                  )
                }
                <CartIcon></CartIcon>
            </NavLinks>
            {isCartOpen && <CartDropdown></CartDropdown>}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  };

export default Navigation;