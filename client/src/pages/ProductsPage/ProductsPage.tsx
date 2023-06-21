import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard';
import FilterBar from '../../components/FilterBar';

const ProductsPage = ({
  filter,
  setFilter
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const products = useProducts();

  return (
    <>
      <FilterBar setFilter={setFilter} />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 object-contain gap-4 py-4 px-4 justify-center align-center content-center items-center">
        {products
          ?.filter((p) => (filter ? p.stock > 0 && p.category === filter : p.stock > 0))
          .map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
      </div>
    </>
  );
};

export default ProductsPage;
