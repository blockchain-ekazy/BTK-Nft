import React from "react";
import "./Home.css";

import MintBtn from './MintBtn'

import Img1 from "../Components/Images/Logo.png";
import Img2 from "../Components/Images/card.gif";
export default function Home() {
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
                      <button className="btn0">Connect</button>
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
              <div className="col-6 text-right  " >
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
              <MintBtn/>
              {/* <button className="btn1">MINT</button> */}
            </div>
          </div>
          {/* <div className="col-md-2"></div> */}
          <div className="col-md-4 text-center model mx-auto pt-3  ">
            <img className="w-100 gif "  src={Img2} />
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
