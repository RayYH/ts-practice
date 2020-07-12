export interface CityStore {
  cities: string[];
}

const store: CityStore = {
  cities: [],
};

export function initializeCityDatabase(store: CityStore): void {
  store.cities = ['Vienna', 'San Juan', 'Beijing', 'Shanghai'];
}

export function pushCity(store: CityStore): void {
  store.cities.push('Nanjing');
}

export function popCity(store: CityStore): void {
  store.cities.pop();
}

export function clearCityDatabase(store: CityStore): void {
  store.cities = [];
}

export function isCity(store: CityStore, city: string): boolean {
  return store.cities.indexOf(city) !== -1;
}

export function getStore(): CityStore {
  return store;
}

export default { isCity, initializeCityDatabase, clearCityDatabase, getStore };
