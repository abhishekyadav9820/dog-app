import React, { useEffect, useState } from "react";
import './App.css';
import { Card, Row, Image } from "antd";
import axios from 'axios';

function App() {
  const [dogImages, setDogImages] = useState([]);

  const fetchDogImages = () => {
    axios.get("https://dog.ceo/api/breeds/image/random/4")
      .then(response => setDogImages(response.data.message))
      .catch(error => console.error('Error fetching dog images:', error));
  };

  useEffect(() => {
    fetchDogImages();
  }, []); 

  return (
    <div className="App">
      <div className="container">
        <h3>Dog Images</h3>
        <Card style={{ padding: "20px",display: "flex", justifyContent: "center" }}>
          <Row gutter={16}>
            {dogImages && dogImages.map((imageUrl, index) => (
              <div className="imageCard">
              <Image
                key={index}
                width={300}
                height={300}
                src={imageUrl}
                alt={`Dog ${index + 1}`}
              />
              </div>
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default App;
