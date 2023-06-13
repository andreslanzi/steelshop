import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  if (isOpen) {
    return (
      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    );
  }
  return <></>;
};

export default ShoppingCart;
