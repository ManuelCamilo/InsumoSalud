import React, { useState } from 'react';
import { InventoryItem } from '../types/inventory';
import { ArrowUpDown, Search, BarChart2 } from 'lucide-react';

interface InventoryTableProps {
  data: InventoryItem[];
  onSelectItem: (item: InventoryItem) => void;
}

export default function InventoryTable({ data, onSelectItem }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof InventoryItem>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<'PSICOFARMACOS' | 'ANTIMICROBIANOS'>('PSICOFARMACOS');
  const itemsPerPage = 10;

  const filteredData = data
    .filter(item => 
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sortDirection === 'asc' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedCategory('PSICOFARMACOS')}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === 'PSICOFARMACOS'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Psicofármacos
          </button>
          <button
            onClick={() => setSelectedCategory('ANTIMICROBIANOS')}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === 'ANTIMICROBIANOS'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Antimicrobianos
          </button>
        </div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full p-2 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th 
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Nombre</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3">Stock Actual</th>
              <th className="px-6 py-3">Consumo Mensual</th>
              <th className="px-6 py-3">Precio Unitario</th>
              <th className="px-6 py-3">Precio Total</th>
              <th className="px-6 py-3">Análisis</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr 
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.currentStock.toLocaleString()}</td>
                <td className="px-6 py-4">{item.monthlyConsumption.toLocaleString()}</td>
                <td className="px-6 py-4">$ {item.unitPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="px-6 py-4">$ {item.totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelectItem(item)}
                    className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                    title="Ver análisis"
                  >
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} items
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}