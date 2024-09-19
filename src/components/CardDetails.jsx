import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DLT, ADD, REMOVE } from "../redux/actions/action";

const CardDetails = () => {
  const { id } = useParams();
  const getdata = useSelector((state) => state.cart);
  const [Data, setData] = useState([]);

  const compare = () => {
    let compareData = getdata.carts.filter((e) => e.id === parseInt(id));
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id, getdata.carts]);

  const dispatch = useDispatch();
  const history = useNavigate();

  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center">Items Details Page</h2>
      <section className="container mt-3">
        <div className="itemsdetails">
          {Data.map((ele) => {
            return (
              <div key={ele.id} className="d-flex align-items-center">
                <div className="items_img">
                  <img src={ele.imgdata} alt="Food Image" />
                </div>
                <div className="details">
                  <Table>
                    <tbody style={{ verticalAlign: "middle" }}>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant :</strong> {ele.rname}
                          </p>
                          <p>
                            <strong>Price :</strong> ₹ {ele.price}
                          </p>
                          <p>
                            <strong>Dishes :</strong> {ele.address}
                          </p>
                          <p>
                            <strong>Total :</strong> ₹ {ele.price * ele.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 24, paddingLeft: 15 }}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span
                              style={{ fontSize: 24, paddingRight: 15 }}
                              onClick={() => send(ele)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating :</strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "0 7px",
                                borderRadius: "5px",
                                marginLeft: "7px",
                              }}
                            >
                              {ele.rating}
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>
                            <span>{ele.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove :</strong>
                            <span style={{ marginLeft: 8 }}>
                              <i
                                className="fa-solid fa-trash"
                                onClick={() => dlt(ele.id)}
                                style={{
                                  color: "red",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CardDetails;
