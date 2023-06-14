import { useState } from "react";
import { storage, db } from "../../firebase.config/FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";

import "./CreateProducts.scss";

function CreateProducts() {
  const [files, setFiles] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

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

  return (
    <div className="background">
      <h1>Crear productos en base de datos</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titulo"
          type="text"
          name=""
          id=""
          onChange={(e) => setTitle(e.target.value)}
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
        <textarea
          placeholder="Descripcion"
          type=""
          name=""
          id=""
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Elegir Imagenes"
          type="file"
          name=""
          id=""
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
        <button>Subir Productos</button>
      </form>
    </div>
  );
}

export default CreateProducts;
