import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../common/supabaseClient";
import { clearCache } from "../../common/utils";
import { BACKEND_URL } from "../../config";

type AddProductProps = {
  onProductAdded?: () => void;
};

const AddProduct = ({ onProductAdded }: AddProductProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceDOP, setPriceDOP] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [priceCash, setPriceCash] = useState("");
  const [sellingBy, setSellingBy] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles([...e.target.files]);
    }
  };

  const uploadFiles = async () => {
    const urls = [];
    for (const file of imageFiles) {
      // Example: upload the file to Supabase Storage
      const filePath = `products/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("products")
        .upload(filePath, file);
      if (error) {
        console.error("Error uploading file:", error);
        continue;
      }
      // Get public URL for the uploaded file
      const { data } = supabase.storage.from("products").getPublicUrl(filePath);
      const publicUrl = data?.publicUrl;
      urls.push(publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrls = await uploadFiles();

    const product = {
      name,
      description,
      price_dop: parseFloat(priceDOP),
      price_usd: parseFloat(priceUSD),
      price_cash: parseFloat(priceCash),
      images: imageUrls,
      available: true,
      selling_by: sellingBy,
    };

    const response = await fetch(`${BACKEND_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      setName("");
      setDescription("");
      setPriceDOP("");
      setPriceUSD("");
      setPriceCash("");
      setImageFiles([]);
      setSellingBy("");
      if (onProductAdded) {
        onProductAdded();
      }
      toast.success("Producto agregado correctamente");
    }
    clearCache("productsCache");
  };

  return (
    <div className="flex flex-col overflow-x-auto items-center justify-center w-11/12">
      <div className="m-4 w-2/3 flex justify-end">
        <Link to="/product-management" className="link-button-inside-text">
          Gestion de productos
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow max-w-xl"
      >
        <h2 className="text-4xl lg:text-xl font-bold mb-4 text-primary">
          Agregar Producto
        </h2>
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="file"
          multiple
          onChange={handleImageChange}
          required
        />
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="number"
          placeholder="Precio DOP"
          value={priceDOP}
          onChange={(e) => setPriceDOP(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="number"
          placeholder="Precio USD"
          value={priceUSD}
          onChange={(e) => setPriceUSD(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="number"
          placeholder="Precio Efectivo DOP"
          value={priceCash}
          onChange={(e) => setPriceCash(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="text"
          placeholder="Se vende por"
          value={sellingBy}
          onChange={(e) => setSellingBy(e.target.value)}
          required
        />
        <button type="submit" className="secondary-button mt-4">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
