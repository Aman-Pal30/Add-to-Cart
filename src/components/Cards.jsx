import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cardsdata from "./CardsData";
import "./Style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = () => {
  const [data, setData] = useState(Cardsdata);

  const dispatch = useDispatch();

  const notifySuccess = (item) => {
    toast.success(`Item has been added`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const send = (item) => {
    dispatch(ADD(item));

    notifySuccess(item);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart</h2>

      <div
        className="row d-flex justify-content-center align-item-center"
        style={{ paddingTop: "0.7rem" }}
      >
        {data.map((element, index) => {
          return (
            <Card
              key={index}
              style={{ width: "21rem", border: "none" }}
              className="mx-2 mt-4 card_style"
            >
              <Card.Img
                variant="top"
                src={element.imgdata}
                style={{ height: "16rem" }}
                className="mt-3"
              />
              <Card.Body>
                <Card.Title>{element.rname}</Card.Title>
                <Card.Text>Price: ₹ {element.price}</Card.Text>
                <div className="button_div d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={() => send(element)}
                    className="col-lg-12"
                    style={{ background: "#212529" }}
                  >
                    Add to cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Cards;
