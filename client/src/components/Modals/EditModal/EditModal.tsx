import axios from 'axios';
import { Product } from '../../../types/Product';
import Loader from '../../Loader';
import { useEffect, useState } from 'react';

type EditModalProps = {
  editingProduct: Product;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  originalProduct: Product;
  setOriginalProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
};

const EditModal = ({
  editingProduct,
  setEditingProduct,
  originalProduct,
  setOriginalProduct
}: EditModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const [editSuccess, setEditSuccess] = useState<boolean>(false);
  const numberTypes = ['price', 'discountPercentage', 'stock', 'rating'];

  useEffect(() => {
    if (JSON.stringify(originalProduct) !== JSON.stringify(editingProduct)) {
      setTouched(true);
    }
    if (JSON.stringify(originalProduct) === JSON.stringify(editingProduct)) {
      setTouched(false);
    }
  }, [editingProduct, originalProduct]);

  const getInputType = (key: string) => {
    if (numberTypes.includes(key)) {
      return 'number';
    } else if (key === 'description') {
      return 'textarea';
    } else {
      return 'text';
    }
  };

  const handleFieldEdit = (e: React.ChangeEvent, key: string) => {
    const target = e.target as HTMLTextAreaElement;
    setEditingProduct({
      ...originalProduct,
      [key]: target.value
    });
  };

  const handleProductEdit = async () => {
    setIsLoading(true);
    const response = await axios.put('http://localhost:5005/api/products/edit', editingProduct);
    if (response.status === 200) {
      setOriginalProduct(editingProduct);
      setEditSuccess(true);
      setTimeout(() => {
        setEditSuccess(false);
      }, 3000);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  if (editingProduct) {
    return (
      <div className="flex flex-col" key={editingProduct._id}>
        <i
          onClick={() => setOriginalProduct(undefined)}
          className="fas fa-close text-xl text-red-800 cursor-pointer hover:text-red-600 text-end"
        />
        <h1 className="text-xl font-bold text-center m-auto mb-8">EDIT PRODUCT</h1>
        <div className="grid grid-cols-2 w-[800px] object-contain gap-3 justify-center align-center content-center items-cente">
          {Object.keys(editingProduct).map((key, idx) => {
            return (
              <div className="flex flex-col mb-2 w-[90%] justify-center align-center" key={idx}>
                <span>{key === '_id' ? 'ID'.toUpperCase() : key.toUpperCase()}</span>
                {key !== 'thumbnail' && key !== 'description' ? (
                  <input
                    type={getInputType(key)}
                    step={key === 'rating' ? '.01' : undefined}
                    className="px-1 py-1 rounded"
                    value={editingProduct[key as keyof Product]}
                    onChange={(e) => handleFieldEdit(e, key)}
                    disabled={key === '_id'}
                  />
                ) : (
                  <div className="flex inline-flex">
                    <textarea
                      className="px-2 py-2 rounded w-[90%]"
                      value={editingProduct[key]}
                      onChange={(e) => handleFieldEdit(e, key)}
                      rows={6}></textarea>
                    {editingProduct.thumbnail !== '' && key === 'thumbnail' && (
                      <div className="flex justify-center align-center items-center ml-4">
                        <img
                          src={editingProduct.thumbnail}
                          className="max-h-[130px] max-w-[130px] w-auto h-auto"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex inline-flex w-[40%] self-center justify-center align-center items-center mt-8">
          {/* <button
            className="bg-red-800 rounded px-2 py-2 text-sm w-[105px]"
            onClick={() => setEditingProduct(undefined)}>
            Discard
          </button> */}
          <button
            className={`${
              touched ? 'bg-blue-800' : 'bg-gray-500'
            } rounded px-2 py-2 text-md w-[125px]`}
            onClick={() => handleProductEdit()}
            disabled={!touched}>
            {isLoading ? <Loader isLoading={true} /> : 'Apply Changes'}
          </button>
        </div>
        {editSuccess ? (
          <span className="font-semi text-center text-blue-700 py-2 px-2 mt-2">
            Product has been updated
          </span>
        ) : (
          <span className="font-light text-center py-2 px-2 mt-2">
            Note: This changes will directly impact database.
          </span>
        )}
      </div>
    );
  }

  return <>No product to edit</>;
};

export default EditModal;
