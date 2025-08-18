import { Card, CardContent, Typography, Button, Box, Divider , Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../styles.css";

function FlightCard({ flight, addToCart }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card
      sx={{
         width: 320,
          minHeight: 200,
        m: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
        
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          component={Link}
          to={`/flight/${flight.id}`}
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          ✈ {flight.airline}
        </Typography>

        <Typography color="text.secondary">
          {flight.from} → {flight.to}
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mt: 1, color: "success.main" }}
        >
          {flight.price}$
        </Typography>

        {showDetails && (
          <Box sx={{ mt: 1 }}>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2">
              <strong>Arrival:</strong> {flight.arrivalTime}
            </Typography>
            <Typography variant="body2">
              <strong>Departure:</strong> {flight.departureTime}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide details" : "Show details"}
          </Button>

       
        </Box>
      </CardContent>
    </Card>
  );
}

export default FlightCard;
