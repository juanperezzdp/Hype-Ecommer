import { useEffect, useState } from "react";
import { storage, db } from "../firebase.config/FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Home() {
  const [files, setFiles] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [products, setProducts] = useState([]);

  const uploadFile = async (file) => {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urls = await Promise.all(files.map(uploadFile));
      alert("Se han subido con éxito las imágenes");
      console.log(urls);

      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        title: title,
        description: description,
        price: price,
        stock: stock,
        urls: urls,
      });
    } catch (error) {
      alert("Intente más tarde");
    }
  };

  ///////////////////////////////////////////////////////
  const productsCollection = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProducts();
  }, []);
  //////////////////////////////////////////////////////////

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Titulo"
          type="text"
          name=""
          id=""
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Descripcion"
          type="text"
          name=""
          id=""
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Precio"
          type="number"
          name=""
          id=""
          accept="image/*"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Stock"
          type="number"
          name=""
          id=""
          accept="image/*"
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="file"
          name=""
          id=""
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
        <button>Subir</button>
      </form>
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
    </>
  );
}

export default Home;
