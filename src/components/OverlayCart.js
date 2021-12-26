import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import CategoryShow from './CategoryShow';
import getSymbolFromCurrency from 'currency-symbol-map';

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

function OverlayCart(){
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
    
    

    return (
      <div className="cart-main-overlay">
        <div className="cart-first-overlay">
          <div className="cart-first-left-overlay">
            <h4>My Bag {cartItems.length} Items</h4>
          </div>
        </div>
        

      <div className="cart-second-overlay">      
        
        <React.Fragment>
          {cartItems.map((cartItem) => (
            <React.Fragment>    
              <hr className="hr"></hr>   
            <div className="cart-second-inside-second-overlay">
                <div className="cart-second-left-overlay">
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
                      <div class="radio-toolbar-overlay">
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
                      <div class="radio-toolbar-overlay">
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
                      <div class="radio-toolbar-overlay">
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
                      <div class="radio-toolbar-overlay">
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
                      <div class="radio-toolbar-overlay">
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
                <div className="cart-right-right-overlay">
                    {/* {cartItem.gallery.map((image)=>(
                      <div>
                      <img width={100} height={100} src={image} alt="Image" />
                      {cartItem.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                      </div>
                    ))} */}
                    <div className="cart-right-right-image-overlay">
                      <img  src={cartItem.gallery[0]} alt="Image" />
                      {cartItem.inStock !==true && <div class="image-in-stock-centered">OUT OF STOCK</div>}
                    </div>
                </div>
                <div className="cart-right-left-overlay">
                    <div className="cart-right-left-first-overlay">                
                      <button class="button-add-to-cart-basket-increase-overlay" onClick={()=>{onIncrease(cartItem);}}>+</button>
                    </div>
                    <div className="cart-right-left-second-overlay">{cartItem.qty}</div>
                    <div className="cart-right-left-third-overlay">
                      <button class="button-add-to-cart-basket-decrease-overlay" onClick={()=>{onDecrease(cartItem);}}>-</button>
                    </div>
                </div>
             </div>
              </React.Fragment>
          ))}</React.Fragment>
              <div className="total">
                <h1>Total</h1>
                <h2>{total} {getSymbolFromCurrency(selectedOption)}</h2>
              </div>
              <div className="button-bag">
                  <Link to={'/basket'}><button class="button-view-bag" onClick={'/basket'}>VIEW BAG</button></Link>
                  <button class="button-chechkout" >CHECHK OUT</button>
              </div>
          </div>
    </div>
    );
}
export default OverlayCart;