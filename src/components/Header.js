import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import CategoryShow from './CategoryShow';
import logoBasket from '../images/basket.png'; 
import logoSite from '../images/logo.png'; 
import logoSite2 from '../images/logo2.png'; 
import logoDollar from '../images/dollar.png'; 
import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map'

import {
    useComponentDidMount,
    useComponentDidUpdate,
    useComponentWillUnmount
  } from "./utils";
import OverlayCart from "./OverlayCart";
  

const DropDownContainer = styled("div")`
  width: 8.5em;
  margin: 0 auto;
  float:right;
`;

const DropDownHeader = styled("div")`
  font-weight: 500;
  font-size: 1.3rem;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
padding: 0;
margin: 0;
padding-left: 1em;
background: #ffffff;
border:1px solid #e5e5e5;
box-sizing: border-box;
color: #3faffa;
font-size: 1.3rem;
font-weight: 500;
&:first-child {
//   padding-top: 1.8em;
}
`;

const ListItem = styled("li")`
  list-style: none;
  padding-top: 0.4em;
`;




function Header(){
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsLength, setCartItemsLength] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const toggling = () => setIsOpen(!isOpen);

    useComponentDidMount(() => {
        setSelectedOption("USD")
        const localsaveCurrency = localStorage.getItem('saveCurrency');
          if (localsaveCurrency) {
            setSelectedOption(JSON.parse(localsaveCurrency));
          }

        const localsaveCurrencyList = localStorage.getItem('saveCurrencyList');
            if (localsaveCurrencyList) {
                setOptions(JSON.parse(localsaveCurrencyList));
            }
        // options.push(JSON.parse(localStorage.getItem('saveCurrencyList')));
        const localsaveCart = localStorage.getItem('saveCart');
          if (localsaveCart) {
            setCartItems(JSON.parse(localsaveCart));
          }
      });
     
      useComponentDidUpdate(() => {
        // saveToLocal();
        // console.log('DidUpdate hEADER')
        const localsaveCart = localStorage.getItem('saveCart');
          if (localsaveCart) {
            setCartItems(JSON.parse(localsaveCart));
          }
        const localsaveCurrency = localStorage.getItem('saveCurrency');
          if (localsaveCurrency) {
            setSelectedOption(JSON.parse(localsaveCurrency));
          }
          setCartItemsLength(cartItems.length)
      });
      
      useComponentDidUpdate(() => {
        saveToLocal();
      }, [selectedOption]);
    
      useComponentWillUnmount(() => {
        // console.log("Component will unmount!");
        console.log('unmount')
      });
      const saveToLocal = () => {
        const local = selectedOption;
        localStorage.setItem('saveCurrency', JSON.stringify(local));
        setCartItemsLength(cartItems.length)
    }
    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        window.location.reload();
    };
    
    
    // console.log(selectedOption)
    return (
        <nav>
            <ul className='nav-links'>
                
                <CategoryShow />
                <Link to={{pathname:'/'}}>
                    <h3>
                        <img width={40} src={logoSite2} alt="Basket" />
                    </h3>
                </Link>
                <Link 
                onMouseEnter={() => setIsShown(true)}
                to={{pathname:'/basket'}}>
                    <li className='nav-link-right bask'>
                        <img src={logoBasket} alt="Basket" />
                        <span>{cartItemsLength}</span>
                        </li>
                </Link>
                <DropDownContainer>
                            <DropDownHeader onClick={toggling}>
                            {getSymbolFromCurrency(selectedOption)+" "+selectedOption || "USD"}
                            </DropDownHeader>
                            {isOpen && (
                            <DropDownListContainer>
                                <DropDownList>
                                {options.map(option => (
                                    <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                                    {getSymbolFromCurrency(option)+" " +option}
                                    </ListItem>
                                ))}
                                </DropDownList>
                            </DropDownListContainer>
                            )}
                        </DropDownContainer>
            </ul>
            <div className="overlay-cart-main">
            {isShown &&
            <div className="overlay-cart"  onMouseLeave={() => setIsShown(false)}>
                          <div className="overlay-cart-inside"><OverlayCart /></div>
                          </div>
                          
            }
              </div>
              {isShown &&
             <div className="overlay-cart-main-bg">
             <div className="overlay-cart-bg-inside"></div>

             </div>
                          
            }              
                         
        </nav>
    
    );
}
export default Header;