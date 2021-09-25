import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const data = await axios.get(
        "https://point-of-sale-pos-application.herokuapp.com/home"
      );
      setData(data.data);
    };

    fecthData();
  }, []);

  return (
    <div>
      <Link className="navigationAdmin" to={"/"}>
        Home
      </Link>
      <Link className="navigationAdmin" to={"/create/"}>
        {" "}
        create{" "}
      </Link>
      <table className="table tableAdmin">
        <thead>
          <tr className="tableRowAdmin">
            <th className="tableColom" scope="col">
              Item Name
            </th>
            <th className="tableColom" scope="col">
              Item Price
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
            <tbody>
              <tr>
                <td className="tableData">{data.items}</td>
                <td className="tableData">{data.price}</td>
                <td className="tableData">{data.qty}</td>
                <td className="tableData">
                  <Link className="udpateAdmin" to={`/update/${data._id}`}>
                    Update
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

export default AdminDashboard;
