// Types
import { Input, Index, Output } from "../../types";

const isSorted = (input: Input): boolean => {
    for (let i = 0; i <= input.length; i++)
    {
        if (input[i === 0 ? 1 : i] < input[i === 0 ? 0 : i - 1])
        {
            return false;
        }
    }

    return true;
}

const swapElements = (input: Input, a: Index, b: Index): void => {
    const temp = input[a];

    input[a] = input[b];
    input[b] = temp;
}

const divide = (input: Input): Output[] => {
    if (input.length <= 1)
    {
        return [input];
    }

    const halfLength = Math.ceil(input.length/2);

    return divide(input.slice(0, halfLength)).concat(divide(input.slice(halfLength)));
}

const conquer = (input: Input[]): Output[] => {
    let output: Output[] = [];

    for (let i = 0; i < input.length; i+=2)
    {
        if (i !== input.length - 1)
        {
            const [curr, next] = [input[i], input[i+1]];

            output.push([...curr, ...next].sort((a, b) => a - b));
        } else {
            output.push([...input[i]].sort((a, b) => a - b));
        }
    }

    if (output.length !== 1)
    {
        output = conquer(output);
    }

    return output;
}

const partition = (input: Input, low: number, high: number) => {
    const pivot = input[high];

    let i = (low - 1);
 
    for (let j = low; j <= high - 1; j++)
    {
        if (input[j] < pivot) {
 
            i++;
            swapElements(input, i, j);
        }
    }

    swapElements(input, i + 1, high);
    return (i + 1);

}

const generateArray = (length: number): Output => {
    return Array.from({length}, () => Math.floor(Math.random() * length));
}

export {
    isSorted,
    swapElements,
    divide,
    conquer,
    partition,
    generateArray
};
