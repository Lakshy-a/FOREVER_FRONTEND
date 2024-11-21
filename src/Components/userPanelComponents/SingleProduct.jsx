import { useNavigate } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const navigate = useNavigate();

  const { _id, productName, productPrice, images } = product;
  return (
    <>
      <div
        className="mt-4 cursor-pointer"
        onClick={() => navigate(`/product/${_id}`)}
      >
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 duration-200 h-[225px] w-[190px] object-fill"
            src={images[0]}
            alt={productName}
          />
        </div>
        <h1 className="mt-2 text-sm font-normal">{productName}</h1>
        <div className="mt-2 text-sm font-bold">${productPrice}</div>
      </div>
    </>
  );
};

export default SingleProduct;
