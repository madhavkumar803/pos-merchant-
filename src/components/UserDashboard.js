import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/UserDashboard.css";

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [dummyData, setDummyData] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const data = await axios.get(
        "https://point-of-sale-pos-application.herokuapp.com/home",
        { headers: { authorization: "", "Content-Type": "applcation/json" } }
      );
      setData(data.data);
    };

    fecthData();
  }, []);

  return (
    <div className="userDashboardContainer">
      <div>
        <Link to="/" className="navigationAdmin">
          Login Page
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr className="tableRow1">
            <th className="tableColom" scope="col">
              Item Price
            </th>
            <th className="tableColom" scope="col">
              Item Name
            </th>
            <th className="tableColom" scope="col">
              Item Quantity
            </th>
            <th className="tableColom" scope="col">
              Action
            </th>
          </tr>
        </thead>
        {data.map((data) => {
          return (
            <tbody key={data._id}>
              <tr className="tableRow">
                <td className="tableData">{data.items}</td>
                <td className="tableData">{data.price}</td>
                <td className="tableData">{data.qty}</td>
                <td>
                  <Link
                    className="udpateAdmin"
                    onClick={async () => {
                      let dummyData = await axios.post(
                        "https://point-of-sale-pos-application.herokuapp.com/cart/add",
                        {
                          items: data.items,
                          price: data.price,
                          qty: data.qty,
                          id: data._id,
                        }
                      );
                      setDummyData(dummyData);
                    }}
                    to={{
                      pathname: `/shopping/`,
                      state: {
                        items: data.items,
                        price: data.price,
                        qty: data.qty,
                        id: data._id,
                      },
                    }}
                  >
                    Buy
                  </Link>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default UserDashboard;
