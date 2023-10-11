import React, { useEffect, useRef } from 'react'
import Chart from "chart.js/auto";
import { useSelector } from 'react-redux';
const BarCharts: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const chartData = useSelector((state: any) => state.FileSlice.chartDataLen);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (Object.keys(chartData).length === 0) {
            return;
        }

        chartInstance.current = new Chart(ctx as CanvasRenderingContext2D, {
            type: 'bar',
            data: {
                labels: Object.keys(chartData),
                datasets: [{
                    label: "Analiz 2",
                    data: Object.values(chartData),
                    backgroundColor: ['gold', 'aqua', 'pink'],
                    borderColor: ['navy', 'blue', 'fuchsia'],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: false,
            },

        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <canvas style={{ width: 380, height: 380 }} ref={chartRef} />
        </div>
    );

}

export default BarCharts

