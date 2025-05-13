import { Inventory } from './inventory.entity';

export const inventoryProviders = [
  {
    provide: 'INVENTORY_REPOSITORY',
    useValue: Inventory,
  },
]; 