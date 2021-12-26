import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import logo from '../images/basket.png'; 
import getSymbolFromCurrency from 'currency-symbol-map'

import {
  useComponentDidMount,
  useComponentDidUpdate,
  useComponentWillUnmount
} from "./utils";

const PRODUCT_QUERY = gql`
{
  categories{
    name
     products{
        id
        name
        category
        inStock
        description
        brand
        gallery
        attributes{
          id
          items{
            displayValue
          }
          type
        }
        prices{
          amount
          currency
        }
  	}
  }
}
`;

const Categories= ({ozellik}) => {
  const { data, loading, error } = useQuery(PRODUCT_QUERY);
  const [cartItems, setCartItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [productIdIsHovered, setProductIdIsHovered] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const currencyList = []

  useComponentDidMount(() => {
    const localsaveCart = localStorage.getItem('saveCart');
    if (localsaveCart) {
      setCartItems(JSON.parse(localsaveCart));
    }
    const localsaveCurrency = localStorage.getItem('saveCurrency');
        if (localsaveCurrency) {
          setSelectedOption(JSON.parse(localsaveCurrency));
        }
  });
  
  useComponentDidUpdate(() => {
    // saveToLocal();
    console.log('DidUpdate')
    const localsaveCurrency = localStorage.getItem('saveCurrency');
        if (localsaveCurrency) {
          setSelectedOption(JSON.parse(localsaveCurrency));
        }
  });

  useComponentDidUpdate(() => {
    saveToLocal();
  }, [cartItems]); 

  useComponentWillUnmount(() => {
    // console.log("Component will unmount!");
    console.log('unmount')
  });

  const handleHover = (props)=>{
    isHovered= props;
    console.log(isHovered)
  };
  console.log('naber')
  // console.log(selectedOption.substring(2))
  const onAdd = (product)=>{
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist){
      setCartItems(
        cartItems.map((x) =>
        x.id === product.id ? {...exist, qty:exist.qty+1}:x
        
      )
      );
    }else{
        setCartItems([...cartItems, {...product, qty:1}]);
    }
      alert(product.name+' Product has been added to Your Cart!')
  };

  const onAddProductWithAttributes=(product)=>{
    alert(product.name+' Product has Attributes please first take a look at them.')
  }

  const saveToLocal = () => {
    localStorage.removeItem('saveCart');
    const local = cartItems;
    localStorage.setItem('saveCart', JSON.stringify(local));
  }

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  
  console.log(ozellik);
  console.log(isHovered)
  const temp = data.categories.map((cat) => (
    cat.products.map((product) => (
      product.prices.map((price) => ( 

        (currencyList.indexOf(price.currency) > -1) ?
        '' :  currencyList.push(price.currency)
      ))
    ))
  ))
  localStorage.setItem('saveCurrencyList', JSON.stringify(currencyList))

  return (

    <div className="plp">
      
      <h1 className="plp-header">{ozellik}</h1>
      <ul className="plp-ul">
      <li>{data.categories.map((cat) => (
        <React.Fragment>{cat.products.map((product) => (
          <React.Fragment>
          {ozellik==='all'&&
          <div className="plp-pre-products">
            <div className="plp-products"                     
            onMouseEnter={() => {setIsHovered(true)}}
            onMouseLeave={() => {setIsHovered(false)}}>
                 <div className="plp-products-inside"
                  onMouseEnter={() => {setProductIdIsHovered(product.id)}}
                  onMouseLeave={() => {setProductIdIsHovered(product.id)}}>
                <Link to={{pathname:'/product/'+product.id}}>

                <div className="image-in-stock">
                  <img src={product.gallery} alt="Image" />
                  {product.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                </div>

                </Link>
                <button className="naber" onClick={()=>{onAdd(product);}}>
                        {isHovered===true   
                        && product.inStock ===true 
                        && product.attributes.length === 0 
                        && productIdIsHovered===product.id &&
                        <img src={logo} alt="Basket" /> }
                        </button>
                        <button className="naber" onClick={()=>{onAddProductWithAttributes(product);}}>
                       
                          {isHovered===true  && product.inStock ===true && 
                          product.attributes.length !== 0 && productIdIsHovered===product.id &&
                          <Link to={{pathname:'/product/'+product.id}}>
                            <img src={logo} alt="Basket" /> 
                          </Link>
                          }
                        
                        </button>
                        
                        <Link to={{pathname:'/product/'+product.id}}>
                          <h4 className="plp-product-name">{product.brand} {product.name}</h4>
                          <h4 className="plp-product-price">
                            {product.prices.map((price) => (
                             <li>
                              {selectedOption !== null && price.currency === selectedOption&&
                              <li>
                                {price.amount} 
                                {getSymbolFromCurrency(price.currency)}
                              </li>
                             }</li>
                            ))}
                          </h4>
                    </Link>
                {/* <Basket cartItems={cartItems}></Basket> */}
              </div>
            </div></div>
          }
          {ozellik === product.category &&
          <div className="plp-pre-products">
             <div className="plp-products"                     
             onMouseEnter={() => {setIsHovered(true)}}
             onMouseLeave={() => {setIsHovered(false)}}>
                  <div className="plp-products-inside"
                   onMouseEnter={() => {setProductIdIsHovered(product.id)}}
                   onMouseLeave={() => {setProductIdIsHovered(product.id)}}>
                  <Link to={{pathname:'/product/'+product.id}} >
                    <div className="image-in-stock">
                      <img src={product.gallery} alt="Image" />
                      {product.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                  </div>
                  </Link>
                      <button className="naber" onClick={()=>{onAdd(product);}}>
                        {isHovered===true  
                        && product.inStock ===true 
                        && product.attributes.length === 0 
                        && productIdIsHovered===product.id &&
                        <img src={logo} alt="Basket" /> }
                        </button>
                        <button className="naber" onClick={()=>{onAddProductWithAttributes(product);}}>
                       
                          {isHovered===true  && product.inStock ===true && 
                          product.attributes.length !== 0 && productIdIsHovered===product.id &&
                          <Link to={{pathname:'/product/'+product.id}}>
                            <img src={logo} alt="Basket" /> 
                          </Link>
                          }
                        
                        </button>

                    <Link to={{pathname:'/product/'+product.id}}>
                          <h4 className="plp-product-name">{product.brand} {product.name}</h4>
                          <h4 className="plp-product-price">
                            {product.prices.map((price) => (
                             <li>
                              {selectedOption !== null && price.currency === selectedOption&&
                              <li>
                                {price.amount} 
                                {getSymbolFromCurrency(price.currency)}
                              </li>
                             }</li>
                            ))}
                          </h4>
                    </Link>
                  </div>
              </div>
              </div>
          }
          </React.Fragment>
          ))}</React.Fragment>
      ))}</li>
      </ul>
    </div>
    
  );
}

export default Categories;