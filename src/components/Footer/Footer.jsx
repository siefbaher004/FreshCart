import React, { useContext } from "react";
import style from "./Footer.module.css";
import paymentPartner1 from "../../assets/amazon.png"
import paymentPartner2 from "../../assets/paypal.png"
import paymentPartner3 from "../../assets/mastercart.png"
import applestore from "../../assets/applestore.png"
import googleplay from "../../assets/googleplay.png"
import { CartContext } from "../../Context/CartContext";

export default function Footer() {
  const{loading}=useContext(CartContext)  
  return (
    <>
      <footer className={loading?"bg-slate-100 py-10 px-20 fixed bottom-0 right-0 left-0":"bg-slate-100 py-10 px-20"}>
        <div className="container">
          <h2 className="text-4xl font-light pb-3">Get the FreshCart app</h2>
          <p className="text-slate-600 text-lg pb-3">
            We will send you a link , open it on your phone to download the app.
          </p>
          <div className="flex justify-between">
            <input
              type="text"
              id="small-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block  p-2.5 w-[80%]"
            />
            <button className="bg-emerald-500 text-white rounded-md py-3 px-5 capitalize text-2xl">
              Share app link
            </button>
          </div>
          <div className=" border-y my-5  flex justify-between">
            <ul className="flex gap-3 items-center">
              <li className="text-xl">Payment Partners</li>
              <li className="text-xl w-20 mt-8"><img src={paymentPartner1} alt="Payment Partners logos" className="w-full" /></li>
              <li className="text-xl w-20 "><img src={paymentPartner2} alt="Payment Partners logos" className="w-full" /></li>
              <li className="text-xl w-14"><img src={paymentPartner3} alt="Payment Partners logos" className="w-full" /></li>
            </ul>
            <ul className="flex gap-3 items-center">
              <li className="text-xl">Get deliveries with FrashCart</li>
              <li className="text-xl w-20 "><img src={applestore} alt="Payment Partners logos" className="w-full" /></li>
              <li className="text-xl w-20 "><img src={googleplay} alt="Payment Partners logos" className="w-full" /></li>
            </ul>
          </div>

        </div>
      </footer>
    </>
  );
}
