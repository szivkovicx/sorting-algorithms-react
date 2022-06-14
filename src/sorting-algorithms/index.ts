// Types
import { Index, SortingFunction, Input } from "../../types"

// Helper
import { isSorted, swapElements, divide, conquer, partition } from "../utils";

const bubbleSort: SortingFunction = (input) => {
    for (let i = 0; i < input.length; i++)
    {
        if (i !== input.length) {
            const [curr, next] = [input[i], input[i+1]];

            if (next < curr)
            {
                swapElements(input, i, i+1)
            }
        }
    }

    // Instead of statically defining steps, calculate them
    if (!isSorted(input))
    {
        return bubbleSort(input);
    }

    return input;
}

const selectionSort: SortingFunction = (input) => {
    for (let i = 0; i < input.length; i++)
    {
        let smallestIndex: Index = i;

        for (let y = i; y < input.length; y++)
        {

            if (input[y] < input[smallestIndex])
            {
                smallestIndex = y;
            }

        }

        swapElements(input, i, smallestIndex);

    }

    return input;
}

const mergeSort: SortingFunction = (input) => {
    const division = divide(input);
    const conquered = conquer(division);

    return conquered[0];
}

const quickSort = (input: Input, l: number, h: number): void => {
    if (l < h) {
        let pi = partition(input, l, h);
 
        quickSort(input, l, pi - 1);
        quickSort(input, pi + 1, h);
    }
}

export {
    bubbleSort,
    selectionSort,
    mergeSort,
    quickSort
};
