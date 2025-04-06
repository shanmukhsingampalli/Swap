import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <h4>{product.title}</h4>
      <div
        className="image-container"
        style={{
          width: "100%",
          maxWidth: "200px",
          margin: "15px auto",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          },
        }}
      >
        <img
          src={product.url}
          alt={product.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
            transition: "all 0.3s ease",
          }}
          onClick={() => window.open(product.url, "_blank")}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.filter = "brightness(1.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.filter = "brightness(1)";
          }}
        />
      </div>
      <p>
        <strong>Quantity: </strong>
        {product.quantity}
      </p>
      <p>
        <strong>Contact Number: </strong>
        {product.num}
      </p>
      <p>
        {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default ProductDetails;
