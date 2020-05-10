import * as React from 'react';
import { ServiceProvider } from './service-provider';

export const serviceProvider = new ServiceProvider();
export const ServiceProviderContext = React.createContext(serviceProvider);