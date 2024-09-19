import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@mui/material";
import { DLT } from "../redux/actions/action";

const Header = () => {
  const getdata = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [price, setPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getdata?.carts?.forEach((ele, k) => {
      price = ele.price * ele.qnty + price;
    });

    setPrice(price);
  };
  useEffect(() => {
    total();
  }, [getdata]);
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        style={{ height: "60px" }}
        className="navbar-fixed"
      >
        <Container>
          {/* <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink> */}
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>

          <Badge
            badgeContent={getdata.carts.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.carts.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr style={{ borderBottom: "2px solid darkgrey" }}>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody style={{ verticalAlign: "top" }}>
                  {getdata.carts.map((e, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid lightgrey" }}
                      >
                        <td style={{ paddingTop: "10px" }}>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img
                              src={e.imgdata}
                              style={{ width: "5rem", height: "5rem" }}
                              alt=""
                            />
                          </NavLink>
                        </td>
                        <td style={{ lineHeight: 1.2, paddingTop: 7 }}>
                          <p>{e.rname}</p>
                          <p> Price: ₹ {e.price}</p>
                          <p> Quantity: {e.qnty}</p>
                          <p
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: 20,
                            }}
                            onClick={() => {
                              e.id;
                            }}
                          >
                            {" "}
                            <i className="fa-solid fa-trash  smalltrash"></i>
                          </p>
                        </td>
                        <td
                          className="mt-3"
                          style={{
                            color: "red",
                            cursor: "pointer",
                            fontSize: 20,
                          }}
                          onClick={() => dlt(e.id)}
                        >
                          <i className="fa-solid fa-trash largetrash"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <p>Total: ₹ {price}</p>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "18rem", position: "relative" }}
            >
              <i
                className="fa-solid fa-xmark smallclose"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 3,
                  right: 22,
                  fontSize: 22,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 21 }}>Your cart is Empty</p>
              <img
                src="./cart.gif"
                alt="Cart"
                className="emptycart_img"
                style={{ width: "4rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
