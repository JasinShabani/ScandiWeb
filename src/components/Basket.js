import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import CategoryShow from './CategoryShow';
import getSymbolFromCurrency from 'currency-symbol-map'

import {
    useComponentDidMount,
    useComponentDidUpdate,
    useComponentWillUnmount
  } from "./utils";


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

function Basket(){
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [capacityValue, capacityInputProps] = useRadioButtons("radioCapacity");
    const [colorValue, colorInputProps] = useRadioButtons("radioColor");
    const [sizeValue, sizeInputProps] = useRadioButtons("radioSize");
    const [usbPortValue, usbPortInputProps] = useRadioButtons("radioUsbPort");
    const [touchIdValue, touchIdInputProps] = useRadioButtons("radioTouchId");

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
      const local = cartItems;
      localStorage.setItem('saveCart', JSON.stringify(local));
      totalSum();
    }

    const onIncrease = (product)=>{
      const exist = cartItems.find((x) => x.id === product.id);
      if(exist){
        setCartItems(
          cartItems.map((x) =>
          x.id === product.id ? {...exist, qty:exist.qty+1}:x
          
        )
        );
      }
    }
    const onDecrease = (product)=>{
      const exist = cartItems.find((x) => x.id === product.id);
      if(exist){
          if(exist.qty > 0){
          setCartItems(
            cartItems.map((x) =>
            x.id === product.id ? {...exist, qty:exist.qty-1}:x
            
          )
          );
        }
      }
    }

    const totalSum = () => {
      let temp=0;
      console.log(total === null)
      if(total === null){
        (cartItems.map((cartItem) => (
          cartItem.prices.map((price) => (
            (selectedOption !== null && price.currency === selectedOption &&
              (temp=temp+(price.amount*cartItem.qty)))
            ))
        )))
      }else{
        (cartItems.map((cartItem) => (
          cartItem.prices.map((price) => (
            (selectedOption !== null && price.currency === selectedOption &&
              (temp=temp+(price.amount*cartItem.qty)))
            ))
        )))
      }
      setTotal(temp)
      console.log(total)
    }

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
      <div className="cart-main">
        <div className="cart-first">
          <div className="cart-first-left">
            <h1>CART</h1>
          </div>
        </div>
        

      <div className="cart-second">      
        
        <React.Fragment>
          {cartItems.map((cartItem) => (
            <React.Fragment>
              <hr className="hr"></hr>     
            <div className="cart-second-inside">
                <div className="cart-second-left">
                <h4>{cartItem.brand}</h4>
                <h3>{cartItem.name}</h3>
                {cartItem.prices.map((price) => (
                    <React.Fragment>
                    {selectedOption !== null && price.currency === selectedOption&&
                    
                    <h3>{price.amount} {getSymbolFromCurrency(price.currency)}
                    </h3>
                    }
                    </React.Fragment>
                  ))}
                  <div>
              {cartItem.attributes.map((attribute)=>(
                  <div>
                    <h3>
                      {attribute.id}:
                    </h3>
                    {attribute.id === "Size" &&
                      <div class="radio-toolbar">
                      {attribute.items.map((item)=>(
                        <React.Fragment>
                          {item.displayValue.substring(0,8) === 'selected' ?
                           <React.Fragment>
                           <input 
                             checked={sizeValue === item.displayValue}
                             {...sizeInputProps} 
                             style={{backgroundColor: 'black'}} 
                             type="radio" id={item.displayValue} name="radioSize" value={item.displayValue} />
                           <label style={{backgroundColor: 'grey', color: 'white'}}  for={item.displayValue}>{item.displayValue.substring(8)}</label>
                         </React.Fragment>
                         :
                          <React.Fragment>
                            <input 
                              checked={sizeValue === item.displayValue}
                              {...sizeInputProps} 
                              style={{backgroundColor: item.displayValue}} 
                              type="radio" id={item.displayValue} name="radioSize" value={item.displayValue} />
                            <label for={item.displayValue}>{item.displayValue}</label>
                          </React.Fragment>
                         
                        }
                        </React.Fragment>

                      ))} 
                      
                    </div> 
                    }

                    {attribute.id === "Capacity" &&
                      <div class="radio-toolbar">
                      {attribute.items.map((item)=>(
                        <React.Fragment>
                          {item.displayValue.substring(0,8) === 'selected' ?
                           <React.Fragment>
                           <input 
                             checked={capacityValue === item.displayValue}
                             {...sizeInputProps} 
                             style={{backgroundColor: 'black'}} 
                             type="radio" id={item.displayValue} name="radioCapacity" value={item.displayValue} />
                           <label style={{backgroundColor: 'grey', color: 'white'}}  for={item.displayValue}>{item.displayValue.substring(8)}</label>
                         </React.Fragment>
                         :
                          <React.Fragment>
                            <input 
                              checked={capacityValue === item.displayValue}
                              {...sizeInputProps} 
                              style={{backgroundColor: item.displayValue}} 
                              type="radio" id={item.displayValue} name="radioCapacity" value={item.displayValue} />
                            <label for={item.displayValue}>{item.displayValue}</label>
                          </React.Fragment>
                         
                        }
                        </React.Fragment>

                      ))} 
                      
                    </div> 
                    }

                    
                    {attribute.id === "Color" &&
                      <div class="radio-toolbar">
                      {attribute.items.map((item)=>(
                        <React.Fragment>
                          {item.displayValue.substring(0,8) === 'selected' ?
                           <React.Fragment>
                           <input 
                             checked={colorValue === item.displayValue}
                             {...sizeInputProps} 
                             style={{backgroundColor: item.displayValue}} 
                             type="radio" id={item.displayValue} name="radioColor" value={item.displayValue} />
                           <label style={{backgroundColor: item.displayValue.substring(8), color: 'white'}}  for={item.displayValue}>{item.displayValue.substring(8)}</label>
                         </React.Fragment>
                         :
                          <React.Fragment>
                            <input 
                              checked={colorValue === item.displayValue}
                              {...sizeInputProps} 
                              style={{backgroundColor: item.displayValue}} 
                              type="radio" id={item.displayValue} name="radioColor" value={item.displayValue} />
                            <label style={{backgroundColor: item.displayValue, color: 'white'}} for={item.displayValue}></label>
                          </React.Fragment>
                         
                        }
                        </React.Fragment>

                      ))} 
                      
                    </div> 
                    }

                    {attribute.id === "With USB 3 ports" &&
                      <div class="radio-toolbar">
                      {attribute.items.map((item)=>(
                        <React.Fragment>
                          {item.displayValue.substring(0,8) === 'selected' ?
                           <React.Fragment>
                           <input 
                             checked={usbPortValue === item.displayValue}
                             {...sizeInputProps} 
                             style={{backgroundColor: 'black'}} 
                             type="radio" id={item.displayValue} name="radioUsbPort" value={item.displayValue} />
                           <label style={{backgroundColor: 'grey', color: 'white'}}  for={item.displayValue}>{item.displayValue.substring(8)}</label>
                         </React.Fragment>
                         :
                          <React.Fragment>
                            <input 
                              checked={usbPortValue === item.displayValue}
                              {...sizeInputProps} 
                              style={{backgroundColor: item.displayValue}} 
                              type="radio" id={item.displayValue} name="radioUsbPort" value={item.displayValue} />
                            <label for={item.displayValue}>{item.displayValue}</label>
                          </React.Fragment>
                         
                        }
                        </React.Fragment>

                      ))} 
                      
                    </div> 
                    }


                    {attribute.id === "Touch ID in keyboard" &&
                      <div class="radio-toolbar">
                      {attribute.items.map((item)=>(
                        <React.Fragment>
                          {item.displayValue.substring(0,8) === 'selected' ?
                           <React.Fragment>
                           <input 
                             checked={touchIdValue === item.displayValue}
                             {...sizeInputProps} 
                             style={{backgroundColor: 'black'}} 
                             type="radio" id={item.displayValue+"radioTouchId"} name="radioTouchId" value={item.displayValue} />
                            <label style={{backgroundColor: 'grey', color: 'white'}} for={item.displayValue+"radioTouchId"}>{item.displayValue.substring(8)}</label>
                         </React.Fragment>
                         :
                          <React.Fragment>
                            <input 
                              checked={touchIdValue === item.displayValue}
                              {...sizeInputProps} 
                              style={{backgroundColor: item.displayValue}} 
                              type="radio" id={item.displayValue+"radioTouchId"} name="radioTouchId" value={item.displayValue} />
                            <label for={item.displayValue+"radioTouchId"}>{item.displayValue}</label>
                          </React.Fragment>
                         
                        }
                        </React.Fragment>

                      ))} 
                      
                    </div> 
                    }
                  </div>
              ))}
          </div>
                </div>
                <div className="cart-right-right">
                    {/* {cartItem.gallery.map((image)=>(
                      <div>
                      <img width={100} height={100} src={image} alt="Image" />
                      {cartItem.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                      </div>
                    ))} */}
                    <div className="cart-right-right-image">
                      <img  src={cartItem.gallery[0]} alt="Image" />
                      {cartItem.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                    </div>
                </div>
                <div className="cart-right-left">
                    <div className="cart-right-left-first">                
                      <button class="button-add-to-cart-basket-increase" onClick={()=>{onIncrease(cartItem);}}>+</button>
                    </div>
                    <div className="cart-right-left-second">{cartItem.qty}</div>
                    <div className="cart-right-left-third">
                      <button class="button-add-to-cart-basket-decrease" onClick={()=>{onDecrease(cartItem);}}>-</button>
                    </div>
                </div>
             </div>
             
              </React.Fragment>
              
          ))}</React.Fragment>
          <hr></hr>
          <div className="total">
                <h1>Total</h1>
                <h2>{total} {getSymbolFromCurrency(selectedOption)}</h2>
              </div>
          </div>
    </div>
    );
}
export default Basket;