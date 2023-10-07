import React, { useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import { useSelector } from 'react-redux';

const PieCharts: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<any>(null);
    const chartData = useSelector((state: any) => state.FileSlice.chartData);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (Object.keys(chartData).length === 0) {
            return;
        }

        const labels = Object.keys(chartData);
        const data = Object.values(chartData);
        const faiz = Object.values(chartData).map((count: any) => {
            const total = labels.reduce((acc, label) => acc + chartData[label], 0);
            const percentage = (count / total) * 100;
            return percentage.toFixed(2) + "%";
        });

        const combinedLabels = labels.map((label, index) => `${label} : ${faiz[index]}`);
        const backgroundColors = ['rgb(22, 19, 212)', 'rgb(134, 12, 235)', 'rgb(25, 205, 86)'];



        chartInstance.current = new Chart(ctx as CanvasRenderingContext2D, {
            type: 'doughnut',
            data: {
                labels: combinedLabels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                }]
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
            <canvas ref={chartRef} />
        </div>
    );
}

export default PieCharts;
