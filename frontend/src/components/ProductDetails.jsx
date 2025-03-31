import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  return (
    <div className="workout-details">
      <h4>{product.title}</h4>
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
