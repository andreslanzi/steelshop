import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard';
// import Loader from '../../components/Loader/Loader';

const ProductsPage = () => {
  const products = useProducts();

  // if (!products) {
  //   return <Loader isLoading={true} />;
  // }

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 object-contain gap-4 py-4 px-4 justify-center align-center content-center items-center">
      {products
        ?.filter((p) => p.stock > 0)
        .map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
    </div>
  );
};

export default ProductsPage;
