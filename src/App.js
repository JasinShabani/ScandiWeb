// import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import './App.css';
import Basket from "./components/Basket";
import Categories from './components/Categories';
import Category from './components/Category';
import Header from './components/Header';
import Product from './components/Product';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/clothes", element: <Categories ozellik={`clothes`}/> },
    { path: "/tech", element: <Categories ozellik={`tech`}/> },
    { path: "/", element: <Categories ozellik={`all`}/> },
    { path: "/basket", element: <Basket /> },
    { path: "/product/:id", element: <Product />},
    // ...
  ]);
  return routes;
};

export default function App() {
  return(
   
      <Router>
        
    <div className='App'>
      <Header />
      <AppRoutes />
    </div>

    </Router>

  );
}
