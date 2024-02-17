import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function CategoryProduct() {
  const categories = useCategory();

  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <Link to={`/categories`} className="btn w-100">
              All Categories
            </Link>
          </div>
          {categories?.map((category) => (
            <div className="col-md-3 mb-3" key={category._id}>
              <div className="card h-100">
                <Link to={`/category/${category.slug}`} className="btn w-100">
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  className="card-img-top"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  style={{ height: "150px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">Rs. {p.price}</p>
                  <button
                    className="cartbtn ms-1 w-100"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
