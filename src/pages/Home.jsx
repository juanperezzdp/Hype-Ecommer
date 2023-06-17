import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config/FireBase";
import Navbar from "../components/Navbar/Navbar";
import "./Home.scss";

function Home() {
  const [products, setProducts] = useState([]);

  const productsCollection = collection(db, "products");
  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-wrap">
        {products.map((product) => (
          <>
            <div className="container-pruducts" key={product.id}>
              <div>
                <img
                  className="container-img-products"
                  src={product.urls}
                  alt="Img"
                />
              </div>
              <div>
                <div className="container-title-products">
                  <div className="container-title-description">
                    <h3>{product.title.toString()}</h3>
                    <p className="price">
                      $
                      {typeof product.price === "string" &&
                        parseFloat(product.price).toLocaleString("es-CO")}
                    </p>
                  </div>

                  <p className="stock">-{product.stock}%</p>
                </div>
              </div>
              <div className="container-btn-shopping">
                <button className="btn-shopping">Añadir al carrito</button>
                <button className="btn-add">Ver detalles</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Home;
