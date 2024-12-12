import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Selecciona un archivo primero");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/api/tes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Imagen subida con éxito: " + response.data.filePath);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <div>
      <h1>Subir Imagen</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Vista previa" width="200" />}
        <button type="submit">Subir</button>
      </form>
    </div>
  );
};

export default ImageUploader;
