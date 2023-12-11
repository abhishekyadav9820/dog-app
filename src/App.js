import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Row, Image, Button, Badge, Modal } from "antd";
import axios from "axios";
import { ShoppingCartOutlined,DeleteOutlined } from "@ant-design/icons";

const predefinedPrices = [200, 300, 400, 500];

function App() {
  const [dogImages, setDogImages] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDogImages = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random/4")
      .then((response) => setDogImages(response.data.message))
      .catch((error) => console.error("Error fetching dog images:", error));
  };

  useEffect(() => {
    fetchDogImages();
  }, []);

  const handleAddToCart = (imageIndex) => {
    if (cart.length >= 6) {
      alert("Cannot add more than 6 items to the cart");
      return;
    }

    const selectedImage = dogImages[imageIndex];
    const selectedPrice = predefinedPrices[imageIndex];
    setCart([...cart, { image: selectedImage, price: selectedPrice }]);
    console.log(`Added Dog ${imageIndex + 1} to the cart`);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div className="App">
      <div className="container">
        <h3>Dog Images</h3>
        <Card
          style={{ padding: "20px", display: "flex", justifyContent: "center" }}
        >
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Badge count={cart.length} offset={[10, 0]}>
              <Button
                type="primary"
                onClick={showModal}
                style={{ marginLeft: "10px", background: "#41bb41" }}
              >
                View Cart
              </Button>
            </Badge>
          </Row>
          <Row gutter={16}>
            {dogImages &&
              dogImages.map((imageUrl, index) => (
                <div className="imageCard" key={index}>
                  <Card
                    className="p-0"
                    cover={
                      <Image
                        width={300}
                        height={300}
                        alt={`Dog ${index + 1}`}
                        src={imageUrl}
                      />
                    }
                    actions={[
                      <p
                        className="price"
                        style={{ fontWeight: "500" }}
                        key="price"
                      >
                        {" "}
                        Price: ₹{predefinedPrices[index]}
                      </p>,
                      <Button
                        key="addToCart"
                        type="primary"
                        style={{
                          backgroundColor: "green",
                          borderColor: "green",
                        }}
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(index)}
                      >
                        Add to Cart
                      </Button>,
                    ]}
                  />
                </div>
              ))}
          </Row>
          <Row justify="end" style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={fetchDogImages}>
              Fetch Image
            </Button>
          </Row>
        </Card>

        <Modal
          title="Shopping Cart"
          visible={modalVisible}
          onCancel={hideModal}
          footer={[
            <Button key="close" onClick={hideModal}>
              Close
            </Button>,
          ]}
        >
          <Row gutter={16}>
            {cart.map((item, index) => (
              <div className="imageCard" key={index} style={{margin:"5px"}}>
                <Card style={{padding:"0"}}>
                  <Image
                    width={150}
                    height={150}
                    alt={`Dog ${index + 1}`}
                    src={item.image}
                  />
                  <p style={{ fontWeight: "500",margin:"10px" }}>Price: {item.price}
                  <Button
                      type="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveFromCart(index)}
                      style={{ marginLeft: "32px",color: "#ff4d4f"  }}
                    />
  </p>
                </Card>
              </div>
            ))}
          </Row>
          <Row justify="end" style={{ marginTop: "10px" }}>
            <p style={{ fontWeight: "600" }}>Total Price: ₹{getTotalPrice()}</p>
          </Row>
        </Modal>
      </div>
    </div>
  );
}

export default App;
