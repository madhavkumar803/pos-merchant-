import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/Create.css";

const Create = () => {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      items: name,
      price: price,
      qty: qty,
    };

    axios
      .post(
        "https://point-of-sale-pos-application.herokuapp.com/create",
        newItems
      )
      .then((res) => {
        if (res.status == 200) alert("ho gya");
      });
  };
  return (
    <div>
      <Link className="navigationAdmin" to={"/"}>
        Home{" "}
      </Link>
      <Link className="navigationAdmin" to={"/create/"}>
        {" "}
        create{" "}
      </Link>
      <h3 className="createH3">Create product page</h3>
      <form className="createForm" onSubmit={onSubmit}>
        <label className="createLabel">Product name</label>

        <input
          className="createInpute"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label className="createLabel">Product price</label>

        <input
          className="createInpute"
          type="Number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <label className="createLabel">Product quantity</label>

        <input
          className="createInpute"
          type="Number"
          onChange={(e) => {
            setQty(e.target.value);
          }}
        />
        <br />
        <input className="createSubmit" type="submit" />
      </form>
    </div>
  );
};

export default Create;
