import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from '../login/LoginScreen';

import { listProducts } from '../../../../redux/actions/product';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './DashboardScreen.css';

const DashboardScreen = () => {
  // TODO: Get logged in function to manage administrator session
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return isLoggedIn ? (
    <LoginScreen />
  ) : (
    <DashboardContainer>
      {/* TODO: Dashboard with edit, modify and delete functions */}
      <DashboardProductList list={products} />
    </DashboardContainer>
  );
};

const DashboardProductList = ({ list }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 300 }}>
      <AgGridReact
        rowData={list}
        defaultColDef={{ sortable: true, filter: true }}
      >
        <AgGridColumn field="name"></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
        <AgGridColumn field="category"></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

const DashboardContainer = ({ children }) => {
  return (
    <div className="container flex mx-auto justify-center">
      <div className="w-10/12 h-full mt-10">
        <div className="w-full h-96 bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
