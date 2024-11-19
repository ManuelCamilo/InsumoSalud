import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { InventoryItem } from '../types/inventory';

interface InventoryChartProps {
  item: InventoryItem;
}

export default function InventoryChart({ item }: InventoryChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const areaSeries = chart.addAreaSeries({
      title: 'Stock y Consumo',
      lineColor: '#2196F3',
      topColor: '#2196F3',
      bottomColor: 'rgba(33, 150, 243, 0.1)',
    });

    // Crear datos para el gráfico
    const chartData = [];
    const today = new Date();
    
    // Agregar datos históricos (3 meses atrás)
    for (let i = 3; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      const timeStr = date.toISOString().split('T')[0];
      
      // Calcular valores basados en el consumo mensual y stock actual
      const monthlyRate = item.monthlyConsumption || 0;
      const baseStock = item.currentStock || 0;
      const estimatedStock = Math.max(0, baseStock - (monthlyRate * i));
      
      if (!isNaN(estimatedStock)) {
        chartData.push({
          time: timeStr,
          value: estimatedStock
        });
      }
    }

    // Agregar proyección futura (3 meses adelante)
    if (item.requestedAmount > 0) {
      for (let i = 1; i <= 3; i++) {
        const date = new Date(today);
        date.setMonth(date.getMonth() + i);
        const timeStr = date.toISOString().split('T')[0];
        
        const projectedStock = Math.max(0, (item.requestedAmount || 0) - ((item.monthlyConsumption || 0) * i));
        
        if (!isNaN(projectedStock)) {
          chartData.push({
            time: timeStr,
            value: projectedStock
          });
        }
      }
    }

    // Solo establecer datos si hay puntos válidos
    if (chartData.length > 0) {
      areaSeries.setData(chartData);
      chart.timeScale().fitContent();
    }

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [item]);

  const formatNumber = (value: number) => {
    return value ? value.toLocaleString() : '0';
  };

  const formatCurrency = (value: number) => {
    return value ? `$ ${value.toLocaleString(undefined, {minimumFractionDigits: 2})}` : '$ 0.00';
  };

  return (
    <div className="space-y-6">
      <div ref={chartContainerRef} />
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded">
          <h4 className="font-medium text-gray-700">Información General</h4>
          <dl className="mt-2 space-y-1">
            <div className="flex justify-between">
              <dt className="text-gray-600">Stock Actual:</dt>
              <dd className="font-semibold">{formatNumber(item.currentStock)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Consumo Mensual:</dt>
              <dd className="font-semibold">{formatNumber(item.monthlyConsumption)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Cantidad Solicitada:</dt>
              <dd className="font-semibold">{formatNumber(item.requestedAmount)}</dd>
            </div>
          </dl>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h4 className="font-medium text-gray-700">Información de Precios</h4>
          <dl className="mt-2 space-y-1">
            <div className="flex justify-between">
              <dt className="text-gray-600">Precio Unitario:</dt>
              <dd className="font-semibold">{formatCurrency(item.unitPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Precio Total:</dt>
              <dd className="font-semibold">{formatCurrency(item.totalPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Fecha de Entrega:</dt>
              <dd className="font-semibold">{item.deliveryDate || 'No disponible'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}