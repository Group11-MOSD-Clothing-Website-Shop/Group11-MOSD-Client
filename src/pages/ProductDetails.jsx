import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../config";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import TransitionsModal from "../component/Modal";
const ProductDetails = () => {
  const [index, setIndex] = useState(-1);
  const myRef = useRef();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const cart = useSelector((state) => state.cart);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (product) {
      myRef.current.children[index].className = "active";
    }
  }, [index, product]);
  const { id } = useParams();
  useEffect(() => {
    const getProduct = async () => {
      const data = await publicRequest.get(`/products/product/${id}`);
      setProduct(data?.data);
    };
    setIndex(0);
    getProduct();
  }, [id]);

  const handleTab = (i) => {
    const images = myRef.current.children;
    if (index !== i)
      images[index].className = images[index].className.replace("active", "");
    setIndex(i);
  };
  const handleAddToCart = () => {
    if (cart?.products?.findIndex((item) => item?._id === product._id) !== -1) {
      return setOpenModal(true);
    }
    dispatch(addProduct({ ...product, quantity: 1 }));
  };
  if (!product) return <div>Loading</div>;
  return (
    <div className="product-detail-container">
      <TransitionsModal
        text="You already add this product to cart"
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
      <div className="details">
        <div className="big-img">
          <img src={product.images[index]?.url} alt="" />
        </div>
        <div className="box">
          <div className="row">
            <h2>{product.title}</h2>
            <span>${product.price}</span>
          </div>

          <div className="colors">
            {product?.color?.map((color, i) => (
              <button key={i} style={{ backgroundColor: color }}></button>
            ))}
          </div>
          <p>{product.description}</p>

          <div className="thumb" ref={myRef}>
            {product?.images.map((img, i) => (
              <img key={i} src={img.url} alt="" onClick={() => handleTab(i)} />
            ))}
          </div>
          <button onClick={handleAddToCart} className="add-btn">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
