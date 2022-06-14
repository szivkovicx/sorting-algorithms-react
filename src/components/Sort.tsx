import React from "react";

// Chart.js
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

// MUI
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// Algorithms
import { bubbleSort, selectionSort, quickSort, mergeSort } from "../sorting-algorithms";

// Types
import { Input } from "../../types";

// Helpers
import { generateArray } from "../utils";

ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Sort = () => {
    const [size, setSize] = React.useState<number>(10);
    const [array, setArray] = React.useState<Input>(generateArray(size));
    const [time, setTime] = React.useState<number>(0.0);

    const sort = (algorithm: 'bubble' | 'selection' | 'merge' | 'quick') => {
        const startTime = performance.now()
        switch (algorithm) {
            case 'bubble':
                setArray(pre => [...bubbleSort(pre)]);
                break;
            case 'selection':
                setArray(pre => [...selectionSort(pre)]);
                break;
            case 'merge':
                setArray(pre => [...mergeSort(pre)]);
                break;
            case 'quick':
                quickSort(array, 0, array.length - 1);
                setArray([...array]);
                break;
        }
        const endTime = performance.now()
        setTime(endTime - startTime);
    }

    React.useEffect(() => {
        setArray(generateArray(size))
    }, [size]);

    return (
        <Stack direction="column">
            <Bar data={{
                labels: array,
                datasets: [{
                    label: 'Dataset',
                    data: array,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            }} />
            <Stack spacing={5} justifyContent="center" alignItems="center" direction="row">
                <Stack sx={{ width: 400 }}>
                    <Typography gutterBottom>
                        Dataset size: {size}
                    </Typography>
                    <Slider
                        step={10}
                        min={10}
                        max={5000}
                        value={size}
                        onChange={(e: any, v: any) => setSize(v)}
                    />
                </Stack>
                <Button onClick={() => setArray(generateArray(size))}>Reset dataset</Button>
                <Button onClick={() => sort('bubble')}>Bubble sort</Button>
                <Button onClick={() => sort('selection')}>Selection sort</Button>
                <Button onClick={() => sort('merge')}>Merge sort</Button>
                <Button onClick={() => sort('quick')}>Quick sort</Button>
                <Typography>Estimated time: {time.toFixed(2)}ms</Typography>
            </Stack>
        </Stack>
    )
}

export default Sort;
