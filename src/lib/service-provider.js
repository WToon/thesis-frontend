export class ServiceProvider {
  services;

  constructor() {
    this.services = [];
  }

  register(service) {
    this.services.push(service);
  }

  get(serviceType) {
    const foundService = this.services.find(service => service instanceof serviceType);
    return foundService;
  }
}
