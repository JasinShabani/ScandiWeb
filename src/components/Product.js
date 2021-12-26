import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Query } from "react-apollo";
import { useLocation } from "react-router-dom";
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import getSymbolFromCurrency from 'currency-symbol-map';

import {
  useComponentDidMount,
  useComponentDidUpdate,
  useComponentWillUnmount
} from "./utils";

const PRODUCT_QUERY = gql`
query ProductQuery($id: String!){
  product(id: $id){
    __typename
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

`;
function useRadioButtons(name) {
  const [value, setState] = useState(null);

  const handleChange = e => {
    setState(e.target.value);
  };

  const inputProps = {
    name,
    type: "radio",
    onChange: handleChange
  };

  return [value, inputProps];
}
function Product (props) {
  var query =window.location.pathname
  const DOMPurify = createDOMPurify((new JSDOM('')).window);
  const productId = query.substring(9);
  const [cartItems, setCartItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [capacityValue, capacityInputProps] = useRadioButtons("radioCapacity");
  const [colorValue, colorInputProps] = useRadioButtons("radioColor");
  const [sizeValue, sizeInputProps] = useRadioButtons("radioSize");
  const [usbPortValue, usbPortInputProps] = useRadioButtons("radioUsbPort");
  const [touchIdValue, touchIdInputProps] = useRadioButtons("radioTouchId");

  const [imageValue, imageInputProps] = useRadioButtons("radioImage");
  
  const currencyList = []
  // const {productId} = location.state;
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: productId},
  });

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
    
    console.log(capacityValue)
    console.log(sizeValue)
    console.log(colorValue)
    console.log(usbPortValue)
    console.log(touchIdValue)
    console.log(imageValue)
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


  const saveToLocal = () => {
    localStorage.removeItem('saveCart');
    const local = cartItems;
    localStorage.setItem('saveCart', JSON.stringify(local));
  }
 
  console.log(productId);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  const onAdd = (product)=>{
    let cloneProduct = JSON.parse(JSON.stringify(product));
    console.log("GELDIIOII");
    console.log(cloneProduct);
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist){
      cloneProduct = exist;
    }
      cloneProduct.attributes.map((attribute) => {
        console.log("girdi1")
          if(attribute.id === "Size"){
            console.log("girdi2")
            if(sizeValue !== null){
              console.log("girdi3")
              console.log(sizeValue)
              attribute.items.map((item)=>{
                console.log("girdi4")
                console.log(item.displayValue === sizeValue)
                if(item.displayValue === sizeValue){
                  item.displayValue ="selected"+item.displayValue;
                }else{
                  if(item.displayValue.length>8){
                    console.log(item.displayValue.substring(0,7))
                    if(item.displayValue.substring(0,8) === 'selected'){
                      item.displayValue =item.displayValue.substring(8)
                    }
                  }
                }
              }) 
            }
          }
          if(attribute.id === "Capacity"){
            console.log("Capacitygirdi2")
            if(capacityValue !== null){
                console.log("Capacitygirdi3")
                console.log(capacityValue)
                attribute.items.map((item)=>{
                  console.log("Capacitygirdi4")
                  console.log(item.displayValue === capacityValue)
                  if(item.displayValue === capacityValue){
                    console.log(item.displayValue[0])
                    item.displayValue ="selected"+item.displayValue;
                  }else{
                    if(item.displayValue.length>8){
                      if(item.displayValue.substring(0,8) === 'selected'){
                        item.displayValue =item.displayValue.substring(8)
                      }
                    }
                  }
              }) 
            }
          }
          
          if(attribute.id === "Color"){
            if(colorValue !== null){
              attribute.items.map((item)=>{
                if(item.displayValue === colorValue){
                  item.displayValue ="selected"+item.displayValue;
                }else{
                  if(item.displayValue.length>8){
                    if(item.displayValue.substring(0,8) === 'selected'){
                      item.displayValue =item.displayValue.substring(8)
                    }
                  }
                }
              }) 
            }
          }
          if(attribute.id === "With USB 3 ports"){
            if(usbPortValue !== null){
              attribute.items.map((item)=>{
                if(item.displayValue === usbPortValue){
                  item.displayValue ="selected"+item.displayValue;
                }else{
                  if(item.displayValue.length>8){
                    if(item.displayValue.substring(0,8) === 'selected'){
                      item.displayValue =item.displayValue.substring(8)
                    }
                  }
                }
              }) 
            }
          }
          if(attribute.id === "Touch ID in keyboard"){
            if(touchIdValue !== null){
              attribute.items.map((item)=>{
                if(item.displayValue === touchIdValue){
                  item.displayValue ="selected"+item.displayValue;
                }else{
                  if(item.displayValue.length>8){
                    if(item.displayValue.substring(0,8) === 'selected'){
                      item.displayValue =item.displayValue.substring(8)
                    }
                  }
                }
              }) 
            }
          }

      });

    if(exist){
      setCartItems(
        cartItems.map((x) =>
        x.id === cloneProduct.id ? {...cloneProduct, qty:cloneProduct.qty+1}:x
        
      )
      );
    }else{
        setCartItems([...cartItems, {...cloneProduct, qty:1}]);
    }
      alert(product.name+' Product has been added to Your Cart!')
      console.log(product)
      
  };

  return (
    <div className="product-main">
      <div className="product-left">
        <div className="product-left-left">
        <div class="radio-toolbar">
        {data.product.gallery.map((image)=>(


              <React.Fragment>
                  <input 
                checked={imageValue === image}
                {...imageInputProps} 
                  type="radio" id={image} name="radioImage" value={image} />
                <label className="label-product-image" for={image}>
                    <div>
                        <img width={100} height={100} src={image} alt="Image" />
                      {data.product.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                    </div>
                </label>
                   
            </React.Fragment>
          ))}
          </div>
        </div>
        <div className="product-left-right">
            <div className="image-in-stock">
                  <div>
                    {/* {console.log( data.product.gallery[0] )} */}
                  <img width={800} height={800} src={imageValue !== null ?imageValue :data.product.gallery[0]} alt="Image" />
                  {data.product.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                  </div>
            </div>
        </div>
          
      </div>

      <div className="product-right">
        <div className="product-right-inside">
      <h1>{data.product.brand}</h1>
          <h2>{data.product.name}</h2>
          <div>
              {data.product.attributes.map((attribute)=>(
                  <div>
                    <h3>
                      {attribute.id}:
                    </h3>
                     {attribute.id === "Size" &&
                      <div class="radio-toolbar">
                      {attribute.items.map((item)=>(
                        <React.Fragment>
                          <input 
                        checked={sizeValue === item.displayValue}
                        {...sizeInputProps} 
                        style={{backgroundColor: item.displayValue}} 
                          type="radio" id={item.displayValue} name="radioSize" value={item.displayValue} />
                          <label for={item.displayValue}>{item.displayValue}</label>
                        </React.Fragment>

                      ))} 
                      
                    </div> 
                    }
                     {attribute.id === "Capacity" &&
                      <div class="radio-toolbar">
                        {attribute.items.map((item)=>(
                          <React.Fragment>
                            <input 
                          checked={capacityValue === item.displayValue}
                          {...capacityInputProps} 
                          style={{backgroundColor: item.displayValue}} 
                            type="radio" id={item.displayValue} name="radioCapacity" value={item.displayValue} />
                            <label for={item.displayValue}>{item.displayValue}</label>
                          </React.Fragment>

                        ))} 
                        
                      </div> 
                    }
                    {attribute.id === "Color" &&
                    <div class="radio-toolbar">
                        {attribute.items.map((item)=>(
                          <React.Fragment>
                            <input 
                          checked={colorValue === item.displayValue}
                          {...colorInputProps} 
                          style={{backgroundColor: item.displayValue}} 
                            type="radio" id={item.displayValue} name="radioColor" value={item.displayValue} />
                            <label style={{backgroundColor: item.displayValue}} for={item.displayValue}></label>
                          </React.Fragment>

                        ))} 
                    </div> 
                    }
                    {attribute.id === "With USB 3 ports" &&
                        <div class="radio-toolbar">
                          {attribute.items.map((item)=>(
                            <React.Fragment>
                              <input 
                            checked={usbPortValue === item.displayValue}
                            {...usbPortInputProps} 
                            style={{backgroundColor: item.displayValue}} 
                              type="radio" id={item.displayValue} name="radioUsbPort" value={item.displayValue} />
                              <label for={item.displayValue}>{item.displayValue}</label>
                            </React.Fragment>

                          ))} 
                          
                        </div>
                    }
                    {attribute.id === "Touch ID in keyboard" &&
                      <div class="radio-toolbar">
                        {attribute.items.map((item)=>(
                          <React.Fragment>
                            <input 
                          checked={touchIdValue === item.displayValue}
                          {...touchIdInputProps} 
                          style={{backgroundColor: item.displayValue}} 
                            type="radio" id={item.displayValue+"radioTouchId"} name="radioTouchId" value={item.displayValue} />
                            <label for={item.displayValue+"radioTouchId"}>{item.displayValue}</label>
                          </React.Fragment>

                        ))} 
                        
                      </div> 
                    }
                  </div>
              ))}
          </div>
                <div>
                    <h3>
                      Price:
                    </h3>
                      {data.product.prices.map((price)=>(
                        <div>
                          <div>
                            {selectedOption !== null && price.currency === selectedOption&&
                              <li>
                                  {price.amount} 
                                  {getSymbolFromCurrency(price.currency)}
                              </li>
                            }
                          </div>
                        </div>
                      ))}
                </div>
                {data.product.inStock===true ?
                <button class="button-add-to-cart" onClick={()=>{onAdd(data.product);}}>ADD TO CART</button>
              : <button class="button-add-to-cart-out-of-stock">OUT OF STOCK</button>}
          {<h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.product.description) }} /> }
          </div>
      </div>
      <ul>
        <div>
          
        </div>
      </ul>
    </div>
  );
}
export default Product;


