import { useState } from 'react';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import { Product } from '../../types/Product';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductFormPage = () => {
  const [productToAdd, setProductToAdd] = useState<Product>({
    price: '',
    thumbnail: '',
    title: '',
    description: '',
    stock: 0,
    rating: 0,
    brand: '',
    discountPercentage: 0,
    category: ''
  });
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const formValidated =
    productToAdd.price &&
    productToAdd.thumbnail &&
    productToAdd.title &&
    productToAdd.description &&
    productToAdd.stock &&
    productToAdd.rating &&
    productToAdd.brand &&
    productToAdd.discountPercentage &&
    productToAdd.category;

  const handleAddProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formValidated) {
      axios
        .post('http://localhost:5005/api/products/new', productToAdd)
        .then((res) => {
          if (res.status === 200) {
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    } else {
      setFormError('All fields must be completed');
    }
  };

  const handleRatingChange = (e: React.ChangeEvent) => {
    const min = 0;
    const max = 5;
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    const ratingValue = Math.max(min, Math.min(max, Number(value)));
    setProductToAdd({ ...productToAdd, rating: ratingValue });
  };

  const handleNumberChange = (e: React.ChangeEvent, key: string) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    if (typeof value === 'string') {
      setProductToAdd({ ...productToAdd, [key]: 0 });
    }
    setProductToAdd({ ...productToAdd, [key]: Number(value) });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-8 px-4">
        <form className="grid grid-cols-2 w-[100%] gap-4 justify-center m-auto align-center items-center">
          <label className="text-right">Title</label>
          <input
            className="rounded w-full"
            onChange={(e) => setProductToAdd({ ...productToAdd, title: e.target.value })}
            type="text"
            required
          />
          <label className="text-right">Thumbnail URL</label>
          <input
            required
            className="rounded w-full"
            onChange={(e) => setProductToAdd({ ...productToAdd, thumbnail: e.target.value })}
          />
          <label className="text-right">Description</label>
          <textarea
            required
            className="rounded w-full"
            onChange={(e) => setProductToAdd({ ...productToAdd, description: e.target.value })}
          />
          <label className="text-right">Brand</label>
          <input
            required
            className="rounded w-full"
            onChange={(e) => setProductToAdd({ ...productToAdd, brand: e.target.value })}
          />
          <label className="text-right">Category</label>
          <input
            required
            className="rounded w-full"
            onChange={(e) => setProductToAdd({ ...productToAdd, category: e.target.value })}
          />
          <label className="text-right">Price</label>
          <input
            required
            className="rounded w-full"
            onChange={(e) => setProductToAdd({ ...productToAdd, price: e.target.value })}
            type="number"
          />
          <label className="text-right">Rating</label>
          <input
            required
            className="rounded w-full"
            onChange={handleRatingChange}
            step=".01"
            type="number"
            min={0}
            max={5}
            value={productToAdd.rating > 0 ? productToAdd.rating : ''}
          />
          <label className="text-right">Stock</label>
          <input
            required
            className="rounded w-full"
            onChange={(e) => handleNumberChange(e, 'stock')}
            type="number"
          />
          <label className="text-right">Discount Percentage</label>
          <input
            required
            className="rounded w-full"
            onChange={(e) => handleNumberChange(e, 'discountPercentage')}
            type="number"
          />
        </form>
        <ProductDetailsCard product={productToAdd} isNew />
      </div>
      <div className="flex flex-col justify-center w-full m-auto align-center items-center">
        <button
          className="rounded px-2 py-2 text-md w-[125px] bg-blue-800 mb-4 hover:bg-blue-600"
          type="submit"
          onClick={(e) => handleAddProduct(e)}>
          Add Product
        </button>
        {formError && <span className="font-medium text-red-800 text-xl">{formError}</span>}
      </div>
    </>
  );
};

export default ProductFormPage;
