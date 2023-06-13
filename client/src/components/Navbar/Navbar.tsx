import { Link, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useSignOut, useAuthUser } from 'react-auth-kit';
import UserDropdown from '../UserDropdown';

type NavbarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  const { getTotalQuantity } = useShoppingCart();
  const signOut = useSignOut();
  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();
  const auth = useAuthUser();

  const handleLogOut = () => {
    signOut();
    navigate('/login');
  };

  const isLogged = auth();

  if (isLogged) {
    return (
      <nav className="bg-white dark:bg-gray-900 text-2xl">
        <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-mono">
              steeL
            </span>
          </Link>
          <div className="block w-auto" id="navbar-dropdown">
            <ul className="flex flex-inline font-medium border-gray-100 rounded-lg bg-gray-50 border-none outline-none">
              <li>
                <UserDropdown handleLogOut={handleLogOut} user={auth() ?? {}} />
              </li>
              {totalQuantity > 0 && (
                <li className="font-sans block ml-4">
                  <button
                    className="relative flex hover:text-green-300"
                    onClick={() => setIsOpen(true)}>
                    <svg className=" w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                    </svg>
                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                      {totalQuantity}
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return <></>;
};

export default Navbar;
