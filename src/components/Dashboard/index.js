import React from 'react';
import HeaderSearchForm from '../HeaderSearchForm';

export const Dashboard = ({ children }) => (
  <>
    <HeaderSearchForm />
    <>{children}</>
  </>
);
