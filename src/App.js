import { useState, useEffect, useMemo } from 'react';

import Cart from './components/Cart';
import { Box } from "@mui/material";
import FlightCard from './components/FlightCard';
import FlightPage from './components/FlightPage';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css';
import SortSelect from './components/SortSelect';

function App() {
  const [selectedCells, setSelectedCells] = useState([]);
  const [flights, setFlights] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortType, setSortType] = useState('default');


  useEffect(() => {
    axios
      .get("https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights")
      .then((res) => setFlights(res.data))
      .catch((err) => console.error("error:", err));
  }, []);


  const addToCart = (flight, selectedCells) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === flight.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === flight.id
            ? { ...item, count: item.count + 1, index: selectedCells.map(i => i + 1) }
            : item
        );
      } else {
        return [...prevCart, { ...flight, count: 1, index: selectedCells.map(i => i + 1) }];
      }
    });
  };

 
  const handleDeleteItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    setSelectedCells([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("selectedCells");
  };

 
  useEffect(() => {
    if(cart.length > 0){
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('selectedCells', JSON.stringify(selectedCells));

    }
   
  }, [cart, selectedCells]);

 
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedSelectedCells = localStorage.getItem('selectedCells');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedSelectedCells) setSelectedCells(JSON.parse(savedSelectedCells));
  }, []);


  const sortedFlights = useMemo(() => {
    return [...flights].sort((a, b) => {
      if (sortType === 'price-asc') return a.price - b.price;
      if (sortType === 'price-desc') return b.price - a.price;
      if (sortType === 'airline') return a.airline.localeCompare(b.airline);
      return 0;
    });
  }, [flights, sortType]);

  return (
    <div className='continer'>
      <Router>
        
        <Cart cart={cart} onDelete={handleDeleteItem} />

        <Routes>
          <Route path="/" element={
            <>
              <SortSelect sortType={sortType} setSortType={setSortType} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', alignItems: 'flex-start' }}>
                {sortedFlights.map(flight => (
                  <FlightCard key={flight.id} flight={flight} addToCart={addToCart} />
                ))}
              </Box>
            </>
          } />

          <Route path="/flight/:id" element={
            <FlightPage
              addToCart={addToCart}
              selectedCells={selectedCells}
              setSelectedCells={setSelectedCells}
            />
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
