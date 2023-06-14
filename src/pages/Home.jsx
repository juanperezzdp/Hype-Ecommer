import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config/FireBase";
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

  const authentication = useAuth();
  console.log(authentication);

  return (
    <div>
      {products.map((product) => (
        <div
          style={{ border: "solid black 2px", margin: "1rem" }}
          key={product.id}
        >
          <h2>Productos: {product.title.toString()}</h2>
          <h2>Descripcion: {product.description.toString()}</h2>
          <h2 style={{ color: "green" }}>
            Precio:
            {product.price.toLocaleString("es-CO")}
          </h2>
          <div>
            {product.urls ? (
              product.urls.map((url, index) => (
                <img
                  style={{ width: "10rem" }}
                  key={index}
                  src={url}
                  alt={`Imagen ${index + 1}`}
                />
              ))
            ) : (
              <img style={{ width: "10rem" }} src={product.url} alt="Img" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
