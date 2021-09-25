import React, { useState } from "react";
import axios from "axios";
import "./css/Cart.css";
import { useHistory } from "react-router";

const Cart = (props) => {
  let history = useHistory();
  const [name] = useState(props.props.title);
  const [price] = useState(props.props.price);
  const [qty] = useState(props.props.qty);
  const [item, setItem] = useState(0);
  const [id] = useState(props.props.id);
  const [parrentid] = useState(props.props.parrentId);
  const [dummyData, setDummyData] = useState([]);

  const handleplus = async () => {
    const newItem = { qty: qty - item, id: parrentid };
    let res = await axios.post(
      `https://point-of-sale-pos-application.herokuapp.com/cart/stock/update/`,
      newItem
    );
    if (res.status === 200) {
      setDummyData(res);
    }
  };
  const handleminus = async () => {
    const newItem = { qty: qty + item, id: parrentid };
    let res = await axios.post(
      `https://point-of-sale-pos-application.herokuapp.com/cart/stock/update/`,
      newItem
    );
    if (res.status === 200) {
      setDummyData(res);
    }
  };
  const deleteData = async () => {
    let data = await axios.post(
      `https://point-of-sale-pos-application.herokuapp.com/cart/delete/${id}`
    );
    if (data.status == 200) {
      alert("Delete please refresh the browser ");
      history.push("/shopping/");
    }
    data = data.data;
  };

  return (
    <div className="cartContainer">
      <p scope="col">{name}</p>
      <p scope="col">{price}</p>
      <p>
        <button
          className="buttonCart"
          onClick={() => {
            setItem(item > 0 ? item - 1 : 0);
            props.decrementAmount(item > 0 ? price : 0);
            if (item > 0) {
              handleminus();
            }
          }}
        >
          -
        </button>
      </p>
      <p>{item}</p>
      <p>
        <button
          className="buttonCart"
          onClick={() => {
            setItem(item < qty ? item + 1 : qty);
            props.incrementAmount(item < qty ? price : 0);
            if (item < qty) {
              handleplus();
            }
          }}
        >
          +
        </button>
      </p>
      <p>
        {item}/{qty}
      </p>
      <p>
        <button
          className="buttonCartDelete"
          onClick={() => {
            deleteData();
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Cart;
