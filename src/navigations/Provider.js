import React from 'react';
import { AuthProvider } from './AuthProvider';
import NavigationMain from './NavigationMain';

const Provider = () => {
    return (
      <AuthProvider>
        <NavigationMain />
      </AuthProvider>
    );
  };
  export default Provider;