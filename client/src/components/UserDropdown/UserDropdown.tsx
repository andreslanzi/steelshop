import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import './UserDropdown.css';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';

type UserDropdownProps = {
  handleLogOut: () => void;
  user: AuthStateUserObject;
};

const getItems: (handleLogOut: () => void, isAdmin: boolean) => MenuProps['items'] = (
  handleLogOut,
  isAdmin
) =>
  isAdmin
    ? [
        {
          label: <Link to="/new">Add new product</Link>,
          key: '0'
        },
        {
          label: <Link to="/manage">Manage stock</Link>,
          key: '1'
        },
        {
          label: <button onClick={() => handleLogOut()}>Log Out</button>,
          key: '2'
        }
      ]
    : [
        {
          label: <button onClick={() => handleLogOut()}>Log Out</button>,
          key: '2'
        }
      ];

const UserDropdown = ({ handleLogOut, user }: UserDropdownProps) => {
  const isAdmin = user?.role === 'admin';

  return (
    <Dropdown menu={{ items: getItems(handleLogOut, isAdmin) }} trigger={['hover']}>
      <div className="cursor-pointer bg-primary flex flex-inline justify-center align-center items-center m-auto">
        <span className="text-xl mr-2">{user.username}</span>
        <i className="fas fa-chevron-down text-[12px]" />
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
