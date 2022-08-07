import React, { useState } from "react";
import abi from "./abi.json";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { MerkleTree } from "merkletreejs";
// import keccak256 from "keccak256";
// import { white } from "./whitelist.js";

import "./Home.css";
import "./MintBtn.css";

export default function Home() {
  const REACT_APP_CONTRACT_ADDRESS =
    "0x4060B84A4Fbf6F6Ef982780ac3482E1E9DF48830";
  const SELECTEDNETWORK = "4";
  const SELECTEDNETWORKNAME = "Ethereum";

  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState(0);
  const [price, setPrice] = useState("X");
  const [maxallowed, setMaxallowed] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  let ct, web3;
  // const leaf = white.map((addr) => keccak256(addr));
  // const merkleTree = new MerkleTree(leaf, keccak256, { sortPairs: true });

  // function checkWhitelist(a) {
  //   const check = keccak256(a);
  //   const proof = merkleTree.getHexProof(check);
  //   const root = merkleTree.getRoot();

  //   return merkleTree.verify(proof, check, root);
  // }

  // function getProof(a) {
  //   const check = keccak256(a);
  //   return merkleTree.getHexProof(check);
  // }
  const loadweb3 = async () => {
    if (!initializeWeb3()) return;
    if (!connectWallet()) return;

    let p = price * quantity;
    if ((await web3.eth.getBalance(metamaskAddress)) < p) {
      toast.error("Insufficient Funds!");
      return;
    }

    // let m = await ct.methods.balanceOf(metamaskAddress).call();

    // if (m >= maxallowed) {
    //   toast.error("Already Minted Maximum Allowed!");
    //   return;
    // }

    if (status == 1) {
      await toast.promise(
        ct.methods
          .phase1mint(quantity)
          .send({ from: metamaskAddress, value: p }),
        {
          pending: "Mint in Progress!!",
          success: "Mint Success!!",
          error: "Mint Failed!!",
        }
      );
      return;
    }  else if (status == 2) {
      await toast.promise(
        ct.methods.mint(quantity).send({ from: metamaskAddress, value: p }),
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
      setStatus(await ct.methods.status().call());
      setPrice(await ct.methods.PRICE().call());
      setMaxallowed(await ct.methods.MAX_PER_Transtion().call());
      return true;
    } else {
      toast.error(
        "Non-Ethereum browser detected. Please use a crypto wallet such as MetaMask!"
      );
      return false;
    }
  };

  const connectWallet = async () => {
    // console.log(merkleTree.getRoot().toString("hex"));
    if (!initializeWeb3()) return false;
    await window.ethereum.enable();
    let m = await web3.eth.getAccounts();
    m = m[0];
    setMetamaskAddress(m);

    if (status == 0) {
      toast.error("Sale not Started!");
      return false;
    }  else if (status == 2) {
      setWalletConnected(true);
    }
  };

  return (
    <div className="">
      <div className="container-fluid  ">
       

        <div className="row hy  px-2 justify-content-center">
          <div className="col-12 ">
            {/* <h4 className="text-white py-4">
              <small>
                {status == 1 || status == 2
                  ? "PRE SALE ACTIVE"
                  : status == 3
                  ? "PUBLIC SALE ACTIVE"
                  : "SALE NOT ACTIVE"}
              </small>
              <small>
              Price: {((price / 10 ** 18) * quantity).toFixed(2)}ETH
              </small>
              <br />
              <small>Max per Address: {maxallowed}</small>
            </h4> */}
            
            <br />
            <div className="row pt-2 ">
              <div className="col-6 text-left">
                <p className="  text-gold">TOTAL COST:</p>
              </div>
              <div className="col-6 text-right">
              <p className="text-gold">
                {((price / 10 ** 18) * quantity).toFixed(2)}ETH
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
            <br />

         
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
        </div>
      </div>
      
    </div>
  );
}
