import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Wallet from "./components/Wallet";
import { isValidEthereumAddress } from "./utils/address";

interface IWallet {
  address: string;
  isOld: boolean;
  balance: number;
  isFavourite: boolean;
  rates: IRate[];
}
export interface IRate {
  name: string;
  rate: number;
}

function App() {
  const [wallets, setWallets] = useState<IWallet[]>([]);
  const [rates, setRates] = useState<IRate[]>([]);
  const [address, setAddress] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const fetchWallets = async () => {
      const res = await fetch("http://localhost:3000/address");
      const data = await res.json();
      setWallets(data);
    };
    const getAllRates = async () => {
      const res = await fetch(`http://localhost:3000/exchangerate/`);
      const data = await res.json();
      setRates(data);
    };
    getAllRates();
    fetchWallets();
  }, []);

  const handleAddAddressClick = async () => {
    handleClick()
    if (!isValidEthereumAddress(address)) {
      setToastMessage("Invalid address");
      setAddress("");
      return;
    }

    const res = await fetch(`http://localhost:3000/address/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ address }),
    });
    const data = await res.json();
    setToastMessage("Address added");
    setWallets([data, ...wallets]);
    setAddress("");
  };

  return (
    <>
      <Snackbar autoHideDuration={6000} message={toastMessage} open={open} onClose={handleClose}>
        <Alert
          severity={toastMessage === "Invalid address" ? "error" : "success"}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <TextField
          variant="outlined"
          label="Address"
          size="small"
          sx={{ mr: "10px" }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddAddressClick}>
          Add
        </Button>
      </Box>

      {wallets.map((wallet: IWallet) => (
        <Wallet
          key={wallet.address}
          address={wallet.address}
          isFavourite={wallet.isFavourite}
          isOld={wallet.isOld}
          balance={wallet.balance}
          rates={rates}
        />
      ))}
    </>
  );
}

export default App;
