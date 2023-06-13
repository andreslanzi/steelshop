import { Product } from '../../../types/Product';

type DeleteModalProps = {
  selectedRows: Product[];
  setDeletingProducts: React.Dispatch<React.SetStateAction<boolean>>;
  handleProductsDelete: () => void;
};

const DeleteModal = ({
  selectedRows,
  setDeletingProducts,
  handleProductsDelete
}: DeleteModalProps) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-8">These items will be deleted</h1>
      {selectedRows.map((p) => (
        <div key={p._id}>
          <ul>
            <li>
              <span>{p.title}</span>
            </li>
          </ul>
        </div>
      ))}
      <div className="flex flex-inline justify-center items-center align-center mt-8">
        <button
          className="bg-blue-800 rounded py-1 px-2 mr-8"
          onClick={() => setDeletingProducts(false)}>
          Cancel
        </button>
        <button className="bg-red-800 rounded py-1 px-2" onClick={handleProductsDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
