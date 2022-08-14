import React, { useState } from "react";
import abi from "./abi.json";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PayWithCard,
  PaperCheckout,
  PaperCheckoutDisplay,
} from "@paperxyz/react-client-sdk";

import "./Home.css";
import "./MintBtn.css";

export default function Home() {
  const REACT_APP_CONTRACT_ADDRESS =
    "0x39E9DE389c62102A754403e9fD8408A4FDf677c4";
  const SELECTEDNETWORK = "4";
  const SELECTEDNETWORKNAME = "Ethereum Rinkeby";

  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState(false);
  const [price, setPrice] = useState("X");
  const [maxallowed, setMaxallowed] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  let ct, web3;

  const loadweb3 = async () => {
    if (!initializeWeb3()) return;
    if (!connectWallet()) return;

    let p = price * quantity;
    if ((await web3.eth.getBalance(metamaskAddress)) < p) {
      toast.error("Insufficient Funds!");
      return;
    }

    if (!status) {
      await toast.promise(
        ct.methods
          .claimTo(metamaskAddress, quantity)
          .send({ from: metamaskAddress, value: p }),
        {
          pending: "Mint in Progress!!",
          success: "Mint Success!!",
          error: "Mint Failed!!",
        }
      );
      return;
    }
  };

  async function checkNetwork() {
    if ((await web3.eth.net.getId()) == SELECTEDNETWORK) return true;
    toast.error('Enable "' + SELECTEDNETWORKNAME + '" network!');
    return false;
  }

  setTimeout(() => {
    initializeWeb3();
  }, 10);

  const initializeWeb3 = async () => {
    if (await detectEthereumProvider()) {
      window.web3 = new Web3(window.ethereum);
      web3 = window.web3;

      if (!checkNetwork()) return false;

      ct = new web3.eth.Contract(abi, REACT_APP_CONTRACT_ADDRESS);
      setStatus(await ct.methods.paused().call());
      setPrice(await ct.methods.price().call());
      setMaxallowed(await ct.methods.maxMintAmountPerTx().call());
      return true;
    } else {
      toast.error(
        "Non-Ethereum browser detected. Please use a crypto wallet such as MetaMask!"
      );
      return false;
    }
  };

  const connectWallet = async () => {
    if (!initializeWeb3()) return false;
    await window.ethereum.enable();
    let m = await web3.eth.getAccounts();
    m = m[0];
    setMetamaskAddress(m);

    if (!status) {
      setWalletConnected(true);
      return false;
    } else {
      toast.error("Sale not Started!");
    }
  };

  return (
    <div className="">
      <div className="container-fluid  ">
        <div className="row hy  px-2 justify-content-center">
          <div className="col-12 ">
            <br />
            <div className="row pt-2 ">
              <div className="col-6 text-left">
                <p className="  text-gold">TOTAL COST:</p>
              </div>
              <div className="col-6 text-right">
                <p className="text-gold">
                  {((price / 10 ** 18) * quantity).toFixed(3)}ETH
                </p>
              </div>
            </div>

            <div className="quantityselector d-flex justify-content-center align-items-center pb-2">
              <button
                className="count btn mx-4 "
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity ">
                {quantity}
                <span
                  className="d-block text-white maxbtn p-1"
                  onClick={() => setQuantity(maxallowed)}
                >
                  MAX
                </span>
              </span>
              <button
                className="count btn mx-3 "
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= maxallowed}
              >
                +
              </button>
            </div>

            <br />
            <div className="row">
              <div className="col-md-6">
                {walletConnected ? (
                  <button onClick={loadweb3} className="Mint-button">
                    MINT
                  </button>
                ) : (
                  <button onClick={connectWallet} className="Mint-button">
                    CONNECT
                  </button>
                )}
              </div>
              <div className="col-md-6 paper">
                <PaperCheckout
                  checkoutId="70e08b7f-c528-46af-8b17-76b0e0ade641"
                  display="DRAWER"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
