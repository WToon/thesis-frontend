import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./App.scss";

import { configInit } from './config/init.config';
import { configServices } from './config/services.config';

import { serviceProvider, ServiceProviderContext } from './lib/service-provider-context';

configServices(serviceProvider);

configInit(serviceProvider).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <ServiceProviderContext.Provider value={serviceProvider}>
        <App />
      </ServiceProviderContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
