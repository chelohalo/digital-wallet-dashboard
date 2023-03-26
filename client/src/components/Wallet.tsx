import {
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useState } from "react";
import { IRate } from "../App";

type WalletProps = {
  address: string;
  isFavourite: boolean;
  isOld: boolean;
  balance: number;
  rates: IRate;
};

export default function Wallet({
  address,
  isFavourite,
  isOld,
  balance,
  rates,
}: WalletProps) {
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);
  const [currency, setCurrency] = useState("USD");

  const updateFavourite = async (
    address: string,
    isFavouriteValue: boolean
  ) => {
    await fetch(`http://localhost:3000/address/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isFavourite: isFavouriteValue, address }),
    });
  };

  const handleSelectChange = (e: any) => {
    if (e.target.value === "USD") {
      setCurrency("USD");
    } else {
      setCurrency("EUR");
    }
  };

  const balanceUSD = rates["ETHUSD"]
    ? (rates["ETHUSD"] * balance).toFixed(2)
    : "Missing rate to calculte balance";
  const balanceEUR = rates["EURUSD"]
    ? (Number(balanceUSD) / rates["EURUSD"]).toFixed(2)
    : "Missing rate to calculte balance";

  return (
    <Box
      sx={{
        marginBottom: "20px",
        width: "80%",
        height: "300px",
        backgroundColor: "#c8c8c8",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6">{address}</Typography>
        <IconButton
          sx={{ color: "inherit" }}
          aria-label="toggle favourite"
          onClick={() => {
            // TODO: implement toggle favourite functionality
            updateFavourite(address, !isFavouriteState);
            setIsFavouriteState(!isFavouriteState);
          }}
        >
          {isFavouriteState ? <Star /> : <StarBorder />}
        </IconButton>
      </Box>
      {isOld && (
        <Box
          sx={{
            height: "80px",
            backgroundColor: "#f48fb1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Wallet is old!</Typography>
        </Box>
      )}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4">Ether {balance.toFixed(2)}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Currency</InputLabel>
              <Select
                style={{ width: "300px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                label="Age"
                onChange={(e) => handleSelectChange(e)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">Euro</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {currency === "USD" ? (
            <Typography variant="h6">USD {balanceUSD}</Typography>
          ) : (
            <Typography variant="h6">EUR {balanceEUR}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
