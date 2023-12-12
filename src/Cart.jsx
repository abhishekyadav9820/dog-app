// Cart.js
import React from "react";
import { useCartData } from "./CartContex";
import { Card, Row, Image, Button, Divider, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./Cart.css";

const Cart = () => {
  const { cart, setCart } = useCartData();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div>
      <section className="cartSection">
        <Card>
          <h3>My Cart</h3>
          <hr></hr>

          <Row gutter={16}>
            {cart && cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  className="imageCard"
                  key={index}
                  style={{ margin: "5px" }}
                >
                  <Card
                    style={{
                      padding: "0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      width={200}
                      height={200}
                      alt={`Dog ${index + 1}`}
                      src={item.image}
                    />
                    <p style={{ fontWeight: "500", margin: "10px" }}>
                      Price: {item.price}
                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveFromCart(index)}
                        style={{ marginLeft: "32px", color: "#ff4d4f" }}
                      />
                    </p>
                  </Card>
                </div>
              ))
            ) : (
              <Empty style={{margin:"auto"}} description="No Cart" />
            )}
          </Row>
          {/* <hr></hr> */}
          <Row justify="end" style={{ marginTop: "10px" }}>
            <p style={{ fontWeight: "600", margin: "0 10px" }}>
              Total Price: ₹{getTotalPrice()}
            </p>
          </Row>
        </Card>
      </section>
    </div>
  );
};

export default Cart;
