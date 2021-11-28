import React, { useEffect, useContext, useReducer, ReactNode } from "react";
import reducer from "../reducers/filter_reducer";
import { ActionTypes } from "../types/action-types";

import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext({});

interface Props {
  children: ReactNode;
}

export const FilterProvider = ({ children }: Props): JSX.Element => {
  const { products }: any = useProductsContext();
  const [filterState, filterDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    filterDispatch({ type: ActionTypes.LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...filterState,
        filterDispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
