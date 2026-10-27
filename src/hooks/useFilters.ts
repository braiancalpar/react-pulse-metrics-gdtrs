import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, resetFilters } from '../redux/actions/filterActions';

// Mistura useState local com Redux - confuso
export function useFilters(initial?: any) {
  const dispatch = useDispatch();
  const [localFilters, setLocalFilters] = useState(initial ?? {});

  const updateFilter = (key: string, value: any) => {
    setLocalFilters((prev: any) => ({ ...prev, [key]: value }));
    dispatch(setFilter(key, value)); // sincroniza com Redux também
  };

  const reset = () => {
    setLocalFilters({});
    dispatch(resetFilters());
  };

  return { filters: localFilters, updateFilter, reset };
}
