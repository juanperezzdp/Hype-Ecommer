import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config/FireBase";
//import { useNavigate } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const { user, logout, loading } = useAuth();

  // const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    // navigate("/login");
  };

  if (loading) {
    return <h1>cargando...</h1>;
  }

  const productsCollection = collection(db, "products");
  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Usuario: {user?.displayName || user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>

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
