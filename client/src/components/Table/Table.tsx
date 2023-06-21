import DataTable, { TableColumn, createTheme } from 'react-data-table-component';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DeleteModal from '../Modals/DeleteModal';
import EditModal from '../Modals/EditModal';
import { Product } from '../../types/Product';
import { useDeleteProductsById } from '../../hooks/useProducts';

type TableProps = {
  products: Product[];
};

type DataRow = Product;

export type SelectedRowsInfo =
  | {
      allSelected: boolean;
      selectedCount: number;
      selectedRows: Product[];
    }
  | undefined;

const getColumns = (
  setOriginalProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
): TableColumn<DataRow>[] => [
  {
    name: 'Edit',
    selector: (row: Product) => (
      <button onClick={() => setOriginalProduct(row)}>
        <i className="far fa-edit" />
      </button>
    ),
    maxWidth: '48px',
    minWidth: '48px',
    center: true
  },
  {
    name: 'Thumbnail',
    selector: (row: Product) => (
      <div className="flex justify-start items-start align-start w-[100%] ">
        <img src={row.thumbnail} className="max-h-[100px]" />
      </div>
    ),
    maxWidth: '150px',
    center: true
  },
  {
    name: 'Title',
    selector: (row: Product) => row.title,
    sortable: true,
    maxWidth: '450px'
  },
  {
    name: 'Price',
    selector: (row: Product) => `$ ${row.price}`,
    sortable: true,
    maxWidth: '80px',
    minWidth: '80px',
    style: 'padding: 0px'
  },
  {
    name: 'Stock',
    selector: (row: Product) => row.stock,
    sortable: true,
    maxWidth: '80px',
    minWidth: '80px'
  },
  {
    name: 'Rating',
    selector: (row: Product) => row.rating ?? 0,
    sortable: true,
    maxWidth: '80px',
    minWidth: '80px'
  },
  {
    name: 'Discount',
    selector: (row: Product) => `${row.discountPercentage}%`,
    sortable: true,
    maxWidth: '80px',
    minWidth: '80px'
  },
  {
    name: 'Brand',
    selector: (row: Product) => row.brand,
    sortable: true,
    maxWidth: '80px',
    minWidth: '80px'
  },
  {
    name: 'Category',
    selector: (row: Product) => row.category,
    sortable: true,
    maxWidth: '100px',
    minWidth: '100px'
  },
  {
    name: 'Description',
    selector: (row: Product) => (
      <div style={{ whiteSpace: 'pre-wrap' }} className="py-4 px-2">
        {row.description}
      </div>
    ),
    maxWidth: '400px',
    center: true
  }
];

createTheme('dark', {
  background: {
    default: 'transparent'
  }
});

const customStyles = {
  rows: {
    style: {
      minHeight: '130px' // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '0px', // override the cell padding for head cells
      paddingRight: '0px'
    }
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px'
    }
  }
};

const Table = ({ products }: TableProps) => {
  const [selectedRowsInfo, setSelectedRowsInfo] = useState<SelectedRowsInfo>(undefined);
  const [toggleClearRows] = useState<boolean>(false);
  const [originalProduct, setOriginalProduct] = useState<Product | undefined>(undefined);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [deletingProducts, setDeletingProducts] = useState<boolean>(false);

  const selectedProductsIds = selectedRowsInfo?.selectedRows.reduce(
    (acc: string[], curr: Product) => [...acc, curr?._id ?? ''],
    []
  );

  const { mutateAsync } = useDeleteProductsById(selectedProductsIds ?? []);

  const closeEditModal = () => {
    setOriginalProduct(undefined);
  };
  const closeDeleteModal = () => {
    setDeletingProducts(false);
  };

  useEffect(() => {
    setEditingProduct(originalProduct);
  }, [originalProduct]);

  const handleRowSelected = (selectedRowsInfo: SelectedRowsInfo) => {
    setSelectedRowsInfo(selectedRowsInfo);
  };

  const toggleDelete = () => {
    setDeletingProducts(true);
  };

  const customStyles2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'black'
    }
  };

  const handleProductsDelete = async () => {
    mutateAsync();
    setDeletingProducts(false);
  };

  const getModalContent = (key: string) => {
    switch (key) {
      case 'delete':
        return (
          <DeleteModal
            selectedRows={selectedRowsInfo?.selectedRows || []}
            setDeletingProducts={setDeletingProducts}
            handleProductsDelete={handleProductsDelete}
          />
        );
      case 'edit':
        if (editingProduct && originalProduct) {
          return (
            <EditModal
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              originalProduct={originalProduct}
              setOriginalProduct={setOriginalProduct}
            />
          );
        }
        return undefined;
      default:
        return;
    }
  };

  return (
    <>
      <div className="flex flex-inline mb-4 h-[30px]">
        {selectedRowsInfo && selectedRowsInfo?.selectedRows?.length > 0 && (
          <button onClick={toggleDelete} className="bg-red-800 px-2 rounded font-medium">
            Delete
          </button>
        )}
      </div>

      <DataTable
        columns={getColumns(setOriginalProduct)}
        data={products}
        theme="dark"
        selectableRows
        subHeaderWrap
        dense
        striped
        pagination
        customStyles={customStyles}
        responsive
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleClearRows}
      />

      {editingProduct && (
        <Modal
          isOpen={editingProduct !== undefined}
          onRequestClose={closeEditModal}
          contentLabel="Edit Product"
          style={customStyles2}
          ariaHideApp={false}>
          {getModalContent('edit')}
        </Modal>
      )}
      {deletingProducts && (
        <Modal
          isOpen={deletingProducts}
          onRequestClose={closeDeleteModal}
          contentLabel="Edit Product"
          style={customStyles2}
          ariaHideApp={false}>
          {getModalContent('delete')}
        </Modal>
      )}
    </>
  );
};

export default Table;
