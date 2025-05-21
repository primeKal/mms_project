import { Procurement } from './procurement.entity';

export const procurementProviders = [
  {
    provide: 'PROCUREMENT_REPOSITORY',
    useValue: Procurement,
  },
]; 