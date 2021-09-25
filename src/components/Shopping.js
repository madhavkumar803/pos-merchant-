import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import axios from "axios";
import "./css/Shopping.css";
const Shopping = (props) => {
  const [responseData, setResponse] = useState([]);
  const [totalAmount, settotalAmount] = useState(0);
  // const [set, setSet] = useState([]);
  {
    console.log(props.location.state.id);
  }
  useEffect(() => {
    const setdata = async () => {
      let response = await axios.get(
        "https://point-of-sale-pos-application.herokuapp.com/cartData"
      );
      setResponse(response.data);
    };
    setdata();
  }, []);

  const handleBuy = async () => {
    let data2 = await axios.post(
      "https://point-of-sale-pos-application.herokuapp.com/cart/delete"
    );
    if (data2.status === 200) {
      alert("Order Placed Successfully");
      props.history.push("/");
    }
  };

  return (
    <div className="shoppingContainer">
      <Link to="/" className="navigationAdmin">
        Login Page
      </Link>
      <h1 className="shoppingH1">Cart page</h1>
      <table className="tableShopping">
        <thead className="shoppingTableHead">
          <tr>
            <th>
              <span className="shoppingCol">Product title</span>
              <span className="shoppingCol">Product price</span>
              <span className="shoppingColAlter"></span>
              <span className="shoppingCol">Quantity</span>
              <span className="shoppingColAlter"></span>
              <span className="shoppingCol">Stock Status</span>
              <span className="shoppingCol">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((data) => {
            return (
              <tr key={data._id}>
                <td>
                  <Cart
                    key={data._id}
                    props={{
                      title: data.items,
                      price: data.price,
                      qty: data.qty,
                      id: data.id,
                      parrentId: props.location.state.id,
                    }}
                    incrementAmount={(total) =>
                      settotalAmount(totalAmount + total)
                    }
                    decrementAmount={(total) =>
                      settotalAmount(totalAmount - total)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="buttonShopping"
        onClick={() => {
          handleBuy();
        }}
      >
        Buy
      </button>
      <p className="shoppingTotal">Toata anount = {totalAmount}</p>
    </div>
  );
};

export default Shopping;
