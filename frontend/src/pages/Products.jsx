import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";

function Products() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [item, setItem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      console.error("Token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/workouts/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
      setErrorMessage(data.length === 0 ? "No products available." : "");
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setErrorMessage("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      console.error("Token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/workouts/selected?title=${encodeURIComponent(
          item
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage("No matched products.");
        setSelected([]);
      } else {
        setSelected(data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setErrorMessage("Failed to fetch products.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
    console.log(selected);
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "30px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
            alignItems: "center", // Added to align items vertically
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: "12px 20px",
              fontSize: "16px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              outline: "none",
              transition: "border-color 0.3s",
              height: "48px", // Explicit height added
              boxSizing: "border-box", // Added to include padding in height
              ":focus": {
                borderColor: "#1aac83",
              },
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#1aac83",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
              height: "48px", // Matching input height
              width: "48px", // Made square for better appearance
              padding: "0", // Remove default padding
              marginTop: "-10px",
            }}
          >
            <img
              src="/icons/search.svg"
              alt="Search"
              style={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1)",
              }}
            />
          </button>
        </div>

        {errorMessage && (
          <p
            style={{
              color: "#e7195a",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            {errorMessage}
          </p>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {(selected.length > 0 ? selected : products).map((product) => (
          <div
            key={product._id}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
              ":hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <ProductDetails product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
