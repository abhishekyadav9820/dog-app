import React, { useEffect, useState } from "react";
import { Card, Row, Image, Button, Badge, Empty } from "antd";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCartData } from "./CartContex";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import './Home.css';


const predefinedPrices = [200, 300, 400, 500];
const Home = () => {
    const [dogImages, setDogImages] = useState([]);
    const {cart , setCart, history ,setHistory } = useCartData();
    const navigate = useNavigate();
    const [loading,setloading] = useState(false);
    
   
  
    const fetchDogImages = () => {
      setloading(true);
      axios
        .get("https://dog.ceo/api/breeds/image/random/4")
        .then((response) => { setDogImages(response.data.message)
          const historyData = response.data.message.map((data, index) => ({
               image: data,
               date : new Date(),
          }));
          setHistory([...history, ...historyData]);
          setloading(false);
          })
        .catch((error) => console.error(error));
    };

   
  
    useEffect(() => {
      let dbounce;
      dbounce = setTimeout(() => {
        fetchDogImages();
      }, 500);
      return () =>  clearTimeout(dbounce)
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
  
   
  
  return (
    <div>
      <section className="homePage">
      <div className="container">
        <h3>Dog Images</h3>
        <Spin spinning={loading}>
        <Card
          style={{ padding: "20px", display: "flex", justifyContent: "center" }}
        >
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Badge count={cart.length} offset={[10, 0]}>
              <Button
                type="primary"
                style={{ marginLeft: "10px", background: "#41bb41" }}
                onClick={() => navigate("/cart")}
              >
                View Cart
              </Button>
            </Badge>
          </Row>
          <Row gutter={16}>
            {dogImages && dogImages.length > 0 ? 
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
              )): <Empty />}
          </Row>
          <Row justify="end" style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={fetchDogImages}>
              Fetch Image
            </Button>
          </Row>
        </Card>
        </Spin>
      </div>
    
    </section>
    </div>
  )
}

export default Home