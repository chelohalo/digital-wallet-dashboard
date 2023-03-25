import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Wallet from "./components/Wallet";
import { isValidEthereumAddress } from "./utils/address";
import { CircularProgress } from "@mui/joy";

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
  const [rates, setRates] = useState<number[]>([]);
  const [address, setAddress] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchWallets = async () => {
      const res = await fetch("http://localhost:3000/address");
      const data = await res.json();
      setWallets(data);
    };
    // const getAllRates = async () => {
    //   const res = await fetch(`http://localhost:3000/exchangerate/`);
    //   const data = await res.json();
    //   setRates(data);
    // };
    const populateRates = async (): Promise<void> => {
      // fetch with post method
      const res = await fetch(`http://localhost:3000/exchangerate/populate`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      setRates([data.rates.EURUSD, data.rates.ETHUSD]);
    };
    populateRates();
    console.log("debug aqui llegó");
    fetchWallets();
  }, []);

  const handleAddAddressClick = async () => {
    const walletFound = wallets.find((wallet) => wallet.address === address);
    if (walletFound) {
      setToastMessage("Wallet already exists");
      showToast();
      return;
    }

    setIsLoading(true);
    if (!isValidEthereumAddress(address)) {
      setToastMessage("Invalid address");
      setAddress("");
      setIsLoading(false);
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
    setWallets([data, ...wallets]);
    setAddress("");
    setIsLoading(false);
    setToastMessage("Address added");
    showToast();
  };

  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        message={toastMessage}
        open={open}
        onClose={handleClose}
      >
        <Alert
          severity={
            toastMessage === "Invalid address" ||
            toastMessage === "Wallet already exists"
              ? "error"
              : "success"
          }
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
          sx={{ mr: "10px", width: "430px" }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddAddressClick}
          style={{ marginRight: "15px" }}
        >
          Add
        </Button>
        {isLoading && <CircularProgress />}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rates.length !== 0 &&
          wallets.map((wallet: IWallet) => (
            <Wallet
              key={wallet.address}
              address={wallet.address}
              isFavourite={wallet.isFavourite}
              isOld={wallet.isOld}
              balance={wallet.balance}
              rates={rates}
            />
          ))}
      </Box>
    </>
  );
}

export default App;
