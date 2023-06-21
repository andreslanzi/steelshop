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
  const getModalTitle = () =>
    selectedRows.length > 1 ? 'These items will be deleted' : 'This item will be deleted';
  return (
    <div>
      <h1 className="text-xl font-bold">{getModalTitle()}</h1>
      <h1 className="text-xl font-light text-red-800 mb-8">
        Please don't delete all products so that other person can also use this feature.
      </h1>
      {selectedRows.map((p) => (
        <div key={p._id}>
          <ul>
            <li>
              <span className="hover:cursor-default">{p.title}</span>
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
