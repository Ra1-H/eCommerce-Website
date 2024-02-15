import React, { useState } from "react";
import { useCommerceStore } from "../../store";

function AddProduct() {
  const { token } = useCommerceStore();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    pictures: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);

    product.pictures.forEach((picture: File) => {
      formData.append('product-pictures', picture);
    });

    try {
      const response = await fetch('http://localhost:3001/api/v1/products/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product created:', data);
      } else {
        console.error('Failed to create product:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="form-container w-[30%]">
      <form className="flex flex-col gap-3">
        <span className="form-span">
          <label htmlFor="product-name" style={{ color: "#a6a6a6" }}>
            Product Name
          </label>
          <input
            className="form-inputs"
            type="text"
            name="product-name"
            id="product-name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </span>
        <span className="form-span">
          <label htmlFor="product-price" style={{ color: "#a6a6a6" }}>
            Price
          </label>
          <input
            className="form-inputs"
            type="number"
            name="product-price"
            id="product-price"
            value={product.price || 0}
            onChange={(e) =>
              setProduct({ ...product, price: parseInt(e.target.value) })
            }
          />
        </span>
        <span className="form-span">
          <label htmlFor="product-category" style={{ color: "#a6a6a6" }}>
            Category
          </label>
          <input
            className="form-inputs"
            type="text"
            name="product-category"
            id="product-category"
            value={product.category || ""}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
        </span>
        <span className="form-span">
          <label htmlFor="product-description" style={{ color: "#a6a6a6" }}>
            Description
          </label>
          <input
            className="form-inputs"
            type="text"
            name="product-description"
            id="product-description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </span>

        <span className="form-span">
          <label htmlFor="product-pictures" style={{ color: "#a6a6a6" }}>
            Pictures
          </label>
          <input
            className="form-inputs"
            type="file"
            name="product-pictures"
            id="product-pictures"
            // @ts-ignore
            onChange={(e) => e.target.files && setProduct({ ...product, pictures: Array.from(e.target.files) })}
            multiple={true}
          />
        </span>


      </form>

      <div className="w-80">
        <button onClick={handleSubmit} type="button" className="form-button">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
