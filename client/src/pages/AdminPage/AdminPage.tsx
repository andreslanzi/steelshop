import Loader from '../../components/Loader/Loader';
import Table from '../../components/Table';
import useProducts from '../../hooks/useProducts';

const AdminPage = () => {
  const products = useProducts();
  if (!products) {
    return <Loader isLoading={true} />;
  }
  return (
    <div className="px-8 py-4 overflow-x-auto">
      <Table products={products} />
    </div>
  );
};

export default AdminPage;
