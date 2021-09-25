import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./css/UpdateItems.css";

const EditItems = (props) => {
  const history = useHistory();
  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);
  const [qty, setQty] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `https://point-of-sale-pos-application.herokuapp.com/home/${props.match.params.id}`
      );
      response = response.data;
      setName(response.items);
      setPrice(response.price);
      setQty(response.qty);
    };
    fetchData();
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      items: name,
      price: price,
      qty: qty,
    };

    axios
      .post(
        `https://point-of-sale-pos-application.herokuapp.com/update/${props.match.params.id}`,
        newItems
      )
      .then((res) => {
        if (res.status == 200) {
          alert("Product Update");
          history.push("/adminDashboard");
        }
      });
  };
  return (
    <div className="navigationUpdate">
      <Link
        className="navigationAdmin
      "
        to={"/"}
      >
        Home{" "}
      </Link>
      <Link
        className="navigationAdmin
      "
        to={"/create/"}
      >
        {" "}
        create{" "}
      </Link>
      <form className="updateItemForm" onSubmit={onSubmit}>
        <h3 className="updateH3">Update Product</h3>
        <label className="lableUpdate">Product Title</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="inputUpdate"
        />
        <br />
        <label className="lableUpdate">Product price</label>
        <input
          type="Number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          className="inputUpdate"
        />
        <br />
        <label className="lableUpdate">Product quantity</label>
        <input
          type="Number"
          onChange={(e) => {
            setQty(e.target.value);
          }}
          value={qty}
          className="inputUpdate"
        />
        <br />
        <input type="submit" className="inputUpdate submitUpdate" />
      </form>
    </div>
  );
};

export default EditItems;
