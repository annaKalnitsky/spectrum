import { Link } from 'react-router-dom';
import Logo from '../../utils/images/logo.png';
import Cart from '../../utils/images/grocery.png';
import './menu.scss';
import { useCart } from '../../services/functions';

const Menu = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, currentItem) => acc + currentItem.quantity, 0);

  return (
    <div className="menu">
      <Link className="menu_logo" to="/">
        <img src={Logo} alt="logo" />
      </Link>

      <div className="menu__wrapper">
        <Link className="menu__home" to="/">
          Home
        </Link>
        <div className="cart__icon">
          <Link to="/cart">
            <img src={Cart} alt="cart" />
          </Link>
          <div className="cart__icon-num">{totalItems}</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
