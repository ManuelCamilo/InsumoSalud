export interface InventoryItem {
  id: string;
  name: string;
  category: 'PSICOFARMACOS' | 'ANTIMICROBIANOS';
  requestedQuantity: number;
  deliveredQuantity: number;
  deliveryDate: string;
  monthlyConsumption: number;
  currentStock: number;
  missing: number;
  requestedAmount: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ChartData {
  time: string;
  value: number;
}