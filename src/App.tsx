import React, { useState } from 'react';
import { Package2, X } from 'lucide-react';
import { inventoryData } from './data/mockData';
import InventoryTable from './components/InventoryTable';
import InventoryChart from './components/InventoryChart';
import type { InventoryItem } from './types/inventory';

function App() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleCloseChart = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Package2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Sistema de Inventario - Ministerio de Salud de Córdoba
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Inventario</h2>
          <InventoryTable 
            data={inventoryData} 
            onSelectItem={setSelectedItem}
          />
        </div>

        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Análisis de Inventario: {selectedItem.name}</h3>
                <button
                  onClick={handleCloseChart}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                <InventoryChart item={selectedItem} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;