import { useParams } from "react-router-dom";
import {
  Card, CardContent, Typography, Box, Divider, Stack, Chip
} from "@mui/material";
import { FlightTakeoff, FlightLand, DoorFront } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function FlightPage({ addToCart, selectedCells, setSelectedCells }) {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const color = "#36d7b7";
  const override = {
    display: "block",
    margin: "0 auto",
  };

  useEffect(() => {
    axios
      .get(`https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${id}`)
      .then(res => {
        setFlight(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <ClipLoader color={color} loading={loading} cssOverride={override} size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="center">
        <Card sx={{ maxWidth: 350, boxShadow: 4, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ✈ {flight.airline}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {flight.from} → {flight.to}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Stack spacing={2}>
              <Chip icon={<FlightLand />} label={`Arrival: ${flight.arrivalTime}`} />
              <Chip icon={<FlightTakeoff />} label={`Departure: ${flight.departureTime}`} />
              <Chip icon={<DoorFront />} label={`Gate: ${flight.gate}`} />
              <Chip label={`Terminal: ${flight.terminal}`} />
              <Chip color="success" label={`Tickets: ${flight.tickets.remaining}`} />
              <Chip color="warning" label={`Price: ${flight.price}$`} />
            </Stack>
          </CardContent>
        </Card>

        <Grid
          flight={flight}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          addToCart={addToCart}
        />
      </Stack>
    </Box>
  );
}

export default FlightPage;
