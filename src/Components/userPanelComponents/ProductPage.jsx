import React, { useEffect, useState } from "react";
import MoreImages from "./MoreImages";
import { useParams } from "react-router-dom";
import ProductDescription from "./ProductDescription";
import DescriptionReviews from "./DescriptionReviews";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/productsById/${id}`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="custom-padding mt-8">
        <div className=" flex flex-col xs:flex-row gap-12">
          <div className="flex flex-col gap-4">
            <MoreImages images={product.images} />
          </div>
          <div><ProductDescription product={product}  /></div>
        </div>
        <div className="mt-16">
          <DescriptionReviews id={id} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
