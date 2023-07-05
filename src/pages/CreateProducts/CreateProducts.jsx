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
  const [selectedOption, setSelectedOption] = useState("");

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
      alert("Se han subido con éxito el productos");
      console.log(urls);

      const productsCollection = collection(db, `${selectedOption}`);
      await addDoc(productsCollection, {
        title: title,
        description: description,
        price: price,
        stock: stock,
        urls: urls,
      });

      handleFormReset();
    } catch (error) {
      alert("Intente más tarde");
    }
  };

  const handleFormReset = () => {
    setFiles(null);
    setTitle("");
    setDescription("");
    setPrice(0);
    setStock(0);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="background">
      <h1 className="h1">Crear productos en base de datos</h1>
      <form
        className="form-creater"
        onSubmit={handleSubmit}
        onReset={handleFormReset}
      >
        <div className="container-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="products">Sofas</option>
            <option value="camas">Camas</option>
            <option value="juego de comedor">Juego de comedor</option>
          </select>
        </div>
        <div>
          <label className="label-create" htmlFor="Titulo">
            Titulo:
          </label>
          <input
            className="input-create"
            placeholder="Titulo"
            type="text"
            name="Titulo"
            id="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="label-create" htmlFor="Precio">
            Precio:
          </label>
          <input
            className="input-create"
            placeholder="Precio"
            type="number"
            name="Precio"
            id="Precio"
            accept="image/*"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="label-create" htmlFor="discount">
            Descuento:
          </label>
          <input
            className="input-create"
            placeholder="discount"
            type="number"
            name="discount"
            id="discount"
            accept="image/*"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Descripcion"
          type=""
          name=""
          id=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="input-create"
          placeholder="Elegir Imagenes"
          type="file"
          name=""
          id=""
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
        <button className="button-create" type="submit">
          Subir Productos
        </button>
      </form>
    </div>
  );
}

export default CreateProducts;
