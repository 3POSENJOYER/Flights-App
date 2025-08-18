import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function GridSeats({ flight, selectedCells, setSelectedCells, addToCart }) {
  const rows = 5;
  const cols = 10;
  const [grid] = useState(Array.from({ length: rows * cols }, (_, i) => i + 1));

  const [litCells, setLitCells] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("litCells"));
    return saved || grid.map(() => Math.random() < 0.3);
  });

  const addToAirlance = (index) => {
    if (!selectedCells.includes(index)) {
      setSelectedCells((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    localStorage.setItem("litCells", JSON.stringify(litCells));
  }, [litCells]);

  return (
    
     
      
 
      <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 50px)`, gap: 1 }}>
        {grid.map((cell, index) => {
          const isBooked = litCells[index];
          const isSelected = selectedCells.includes(index);
          let color = "success";
          if (isBooked) color = "warning";
          if (isSelected) color = "primary";

          return (
            <Button
              key={index}
              variant="contained"
              color={color}
              sx={{ minWidth: 50, height: 50 ,
                pointerEvents: litCells[index] || selectedCells.includes(index) ? "none" : "auto"
               }}
              
              disabled={isBooked}
              onClick={() => {
                addToAirlance(index);
                addToCart(flight, [...selectedCells, index]);
              }}
            >
              {cell}
            </Button>
          );
        })}
      </Box>
  
  );
}

export default GridSeats;
