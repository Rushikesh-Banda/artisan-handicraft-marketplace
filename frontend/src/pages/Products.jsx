import React,
{
  useEffect,
  useState
} from "react";

import ProductCard
from "../components/ProductCard";

import Loader
from "../components/Loader";

import {
  getProducts
} from "../api/productApi";

import {
  useSearchParams
} from "react-router-dom";


const Products = () => {
   
  const [searchParams] =
  useSearchParams();

  const [products, setProducts] =
    useState([]);

  const [filteredProducts,
    setFilteredProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [visibleProducts,
    setVisibleProducts] =
    useState(8);

  const [search,
  setSearch] =
  useState(
    searchParams.get("search") || ""
  );


  // FETCH PRODUCTS
  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const data =
            await getProducts();

          const allProducts =

            Array.isArray(data)
              ? data
              : data.products || [];

          setProducts(allProducts);

          setFilteredProducts(
            allProducts
          );

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);
        }
      };

    fetchProducts();

  }, []);


  useEffect(() => {

  const query =
    searchParams.get("search") || "";

  setSearch(query);

  const filtered =
    products.filter((product) =>

      (product?.title || "")
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
    );

  setFilteredProducts(filtered);

}, [products, searchParams]);

  // INFINITE SCROLL
  useEffect(() => {

    const handleScroll = () => {

      if (

        window.innerHeight +
        document.documentElement.scrollTop + 1

        >=

        document.documentElement.scrollHeight

      ) {

        setVisibleProducts(
          (prev) => prev + 8
        );
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>

      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);


  if (loading) {
    return <Loader />;
  }


  return (

    <div
      style={{
        padding: "2rem"
      }}
    >

      {/* PRODUCTS */}
      <div className="products-grid">

        {filteredProducts
          .slice(0, visibleProducts)
          .map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />
        ))}

      </div>


      {/* NO PRODUCTS */}
      {filteredProducts.length === 0 && (

        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "3rem"
          }}
        >
          No products found
        </h2>

      )}

    </div>
  );
};

export default Products;