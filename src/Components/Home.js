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

import MintBtn from "./MintBtn";

import Img1 from "../Components/Images/Logo.png";
import Img2 from "../Components/Images/card.gif";
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
    } else if (status == 3) {
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
    setWalletConnected(true);

   
  };

  return (
    <div className="MAIN_BG">
      <div className="container-fluid">
        <div className="row pt-3">
          <div className="col-md-1"></div>
          <div className="col-10">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid">
                <img className="Logo" src={Img1} />
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      {/* <button className="btn0">Connect</button> */}
                      {walletConnected ? (
                        <h1></h1>
                      ) : (
                        <button onClick={connectWallet} className="Mint-button">
                          CONNECT
                        </button>
                      )}
                    </li>
                  </ul>
                  <i class="px-2 mx-3 icon0 fa-brands fa-facebook-f"></i>
                  <i class="px-2 icon fa-brands fa-instagram"></i>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 text-center">
            <h1 className="pt-5">BRING THE KINGDOM</h1>
            <p className="text pt-3">
              The Bring The Kingdom NFT is a limited opportunity to partner with
              a record label
              <br /> and receive exclusive music, merchandise, access to shows
              and artists, and be part
              <br /> of a DAO with a vote on how money is spent to impact the
              industry.
            </p>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <div className="container-fluid ">
        <div className="row mx-1 pt-4 pb-5 align-items-center ">
          <div className="col-md-1"></div>
          <div className="col-md-4  background ">
            <div className="row ">
              <div className="col-6 text-left">
                <p>TOTAL MINTS: 1 / 1000</p>
              </div>
              <div className="col-6 text-right ">
                <p>BALANCE: 0.0000 ETH</p>
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-6 text-left">
                <p>MAX AMOUNT TO MINT:</p>
              </div>
              <div className="col-6 text-right  ">
                <p>500</p>
              </div>
            </div>
            <div className="row pt-2 ">
              <div className="col-6 text-left">
                <p>COST PER MINT:</p>
              </div>
              <div className="col-6 text-right">
                <p>1 Eth</p>
              </div>
            </div>
            {/* <div className="row pt-2 ">
              <div className="col-6 text-left">
                <p>TOTAL COST:</p>
              </div>
              <div className="col-6 text-right">
                <p>1.00 Eth</p>
              </div>
            </div> */}
            <div className="text-center">
              <MintBtn />
              {/* <button className="btn1">MINT</button> */}
            </div>
          </div>
          {/* <div className="col-md-2"></div> */}
          <div className="col-md-4 text-center model mx-auto pt-3  ">
            <img className="w-100 gif " src={Img2} />
            <p className="pt-4">
              Each BTK NFT is unique and includes a 3D model that <br />
              unlocks rewards
            </p>
          </div>
        </div>

        <div className="col-md-1"></div>
      </div>
    </div>
  );
}
