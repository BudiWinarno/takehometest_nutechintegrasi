import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [hargabeli, setBeli] = useState("");
  const [hargajual, setJual] = useState("");
  const [stok, setStok] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("hargabeli", hargabeli);
    formData.append("hargajual", hargajual);
    formData.append("stok", stok);
    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Nama Produk</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan Nama Produk"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Harga Beli Produk</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hargabeli}
                onChange={(e) => setBeli(e.target.value)}
                placeholder="Masukkan Harga Beli Produk"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Harga Jual Produk</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hargajual}
                onChange={(e) => setJual(e.target.value)}
                placeholder="Masukkan Harga Jual Produk"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Stok</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
