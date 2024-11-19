import { InventoryItem } from '../types/inventory';

export const inventoryData: InventoryItem[] = [
  {
    id: '1',
    category: 'PSICOFARMACOS',
    name: 'ALPRAZOLAM 1 MG, COMPRIMIDO',
    requestedQuantity: 8000,
    deliveredQuantity: 3000,
    deliveryDate: '2024-10-06',
    monthlyConsumption: 14640,
    currentStock: 19310,
    missing: 45000,
    requestedAmount: 50000,
    unitPrice: 37.84,
    totalPrice: 1892000.00
  },
  {
    id: '2',
    category: 'PSICOFARMACOS',
    name: 'ALPRAZOLAM 2 MG, COMPRIMIDO',
    requestedQuantity: 9000,
    deliveredQuantity: 54000,
    deliveryDate: '2024-10-06',
    monthlyConsumption: 18810,
    currentStock: 0,
    missing: 0,
    requestedAmount: 35000,
    unitPrice: 61.42,
    totalPrice: 2149700.00
  },
  {
    id: '3',
    category: 'PSICOFARMACOS',
    name: 'AMITRIPTILINA, CLORHIDRATO 25 MG, COMPRIMIDO',
    requestedQuantity: 6000,
    deliveredQuantity: 36000,
    deliveryDate: '2024-05-21',
    monthlyConsumption: 17305,
    currentStock: 12235,
    missing: 0,
    requestedAmount: 54000,
    unitPrice: 63.80,
    totalPrice: 3445200.00
  },
  {
    id: '4',
    category: 'ANTIMICROBIANOS',
    name: 'ACICLOVIR 200 MG, COMPRIMIDO',
    requestedQuantity: 16500,
    deliveredQuantity: 5500,
    deliveryDate: '2024-05-20',
    monthlyConsumption: 1575,
    currentStock: 13620,
    missing: 0,
    requestedAmount: 0,
    unitPrice: 0,
    totalPrice: 0
  },
  {
    id: '5',
    category: 'ANTIMICROBIANOS',
    name: 'ACICLOVIR 500 MG, POLVO PARA RECONSTITUIR INYECTABLE',
    requestedQuantity: 2250,
    deliveredQuantity: 750,
    deliveryDate: '',
    monthlyConsumption: 838,
    currentStock: 0,
    missing: 2250,
    requestedAmount: 0,
    unitPrice: 0,
    totalPrice: 0
  }
];