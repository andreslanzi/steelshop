import React, { useState } from 'react';
import useCategories from '../../hooks/useCategories';

type FilterBarProps = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const FilterBar = ({ setFilter }: FilterBarProps) => {
  const [active, setActive] = useState('');
  const categories = useCategories();

  const activateFilter = (category: string) => {
    setActive(category);
    setFilter(category);
  };

  return (
    <div className="flex flex-col justify-center align-center items-center m-auto">
      <div className="lg:w-[60%] flex flex-inline justify-around m-auto align-center items-center content-center rounded-b-lg bg-sky-950">
        {categories?.map((c) => (
          <span
            onClick={() => activateFilter(c)}
            className={`cursor-pointer hover:underline underline-offset-8 py-2 text-sm ${
              active === c ? 'underline' : ''
            }`}>
            {c}
          </span>
        ))}
      </div>
      {active && (
        <span
          onClick={() => {
            setActive('');
            setFilter('');
          }}
          className="py-2 px-2 hover:text-red-500 rounded-b-lg cursor-pointer text-sm">
          Clear Filter
        </span>
      )}
    </div>
  );
};

export default FilterBar;
