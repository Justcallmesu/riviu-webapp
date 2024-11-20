import React, { useState } from "react";
import { setGlobalState } from "../pages/dashboard/state";

let seatArray = [];
let selectedSeat = false;
let price = 0;

function Seat({ children }) {
  const initialState = { price: 0 };
  //const [price, setPrice] = useGlobalState("price");

  let prop = children.props.children;
  //bongkar Props
  //console.log({ ...children.props });
  const [selected, setSelected] = useState(false);
  //   const [price, setPrice] = useState(0);

  //   useEffect(() => {
  //     setPrice(price + 55000);
  //   }, [selected]);

  function isSelected() {
    //setGlobalState("price", (price = price - 50000));
        
    seatArray.push(prop);
    setSelected(selected ? false : true);
    //setGlobalState("price", (price = price + 50000));
    selected
      ? setGlobalState("price", (price = price - 50000))
      : setGlobalState("price", (price = price + 50000));

    //seatArray.filter((seats) => seats.includes(prop));

    // console.log(localStorage.getItem("totalPrice"));
    // localStorage.setItem("totalPrice", price);
  }

  return (
    <>
      <button
        className={`${
          selected ? "bg-blue-500 text-white" : "bg-white"
        } border-lg rounded-lg px-5 py-5 shadow-lg`}
        onClick={isSelected}
      >
        {children}
      </button>
    </>
  );
}

export default Seat;
