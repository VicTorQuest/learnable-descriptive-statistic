class measureOfCentralTendency {
    constructor (array) {
        this.data = array
    }

    mean () {
        // total number of values in the dataset
        const n = this.data.length

        // getting the sum total of all the values in the given dataset
        let total = 0
        for (let i = 0; i < n; i++) {
            total += this.data[i]
        }

        // calculating the mean
        let mean = total / n
        
        return mean
    }

    median () {
        // rearrange the dataset in ascending order
        const sortedData = this.data.sort((a, b) => a - b)
        const n = sortedData.length

        // if the number of values in the dataset is even
        if (n % 2 == 0) {
            // Find the two middle values
            const middleIndex1 = Math.floor((n - 1) / 2);
            const middleIndex2 = middleIndex1 + 1;


            const middleValue1 = sortedData[middleIndex1];
            const middleValue2 = sortedData[middleIndex2];

            // calculating the median by taking the average of the two middle values
            let median = (middleValue1 + middleValue2) / 2;
            
            return median

        // if the number of values in the dataset is odd
        } else {

            // Find the two middle value
            let middleIndex = Math.floor(n / 2)
            let median = sortedData[middleIndex]
            return median
        }
    }

    mode () {
        // we are going the check and acountthe frequency of each number using and object
        // the key would be the number and the values will be how many times they appeared(frequncy)
        const frequencyCount = {}
        let numbers = this.data
        for (const number of numbers) {
            // if the number is undefined the it'll be 0 + 1
            // if it's defined in the object then we'll just add 1 to whatever value it currently is
            frequencyCount[number] = (frequencyCount[number] || 0) + 1;
        }

        
        let maxFrequency = 0;
        let mode;

        // looping through the frequency count
        for (const number in frequencyCount) {
            if (frequencyCount[number] > maxFrequency) {
                // if we reach a number with higher frequency than the current number 
                // it becomes the new max frequency
                maxFrequency = frequencyCount[number]

                // number with the max frequency becomes the mode
                mode = number
            }
        }

        return(mode)
    }
}

const calculateMCT = new measureOfCentralTendency([11, 2, 17, 11, 1, 9, 12, 17, 21, 15, 14, 11, 18])







class measureOfDispersion {
    constructor (array) {
        this.data = array
    }

    range () {
        // getting highest value
        const highestValue = Math.max(...this.data)

        // getting lowest value
        const lowestValue = Math.min(...this.data)

        // range is the difference between the highest and lowest value
        let range = highestValue - lowestValue
        return range
    }


    variance () {
        // get the mean first
        let getMean = new measureOfCentralTendency(this.data)
        const mean = Math.floor(getMean.mean())

        // Calculate the squared differences
        const squaredDifferences = this.data.map(value => Math.pow(value - mean, 2));

        // Find the average of squared differences (variance)
        const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / this.data.length;

        return variance;
    }

    standardDeviation () {
        // this is the swuare root of the variance 
        const standardDev = Math.sqrt(this.variance())
        return standardDev
    }

    meanAbsoluteDeviation () {
        // get the mean first
        let getMean = new measureOfCentralTendency(this.data)
        const mean = Math.floor(getMean.mean())

        // Calculate the absolute differences
        const absoluteDifferences = this.data.map(value => Math.abs(value - mean));

        // Step 3: Find the average of absolute differences (MAD)
        const mad = absoluteDifferences.reduce((sum, value) => sum + value, 0) / this.data.length;

        return mad
    }

    interquartileRange () {
        // sort in ascending order
        const sortedData = this.data.sort((a, b) => a - b)

        // find Q1 and Q2
        const middleIndex = Math.floor(sortedData.length / 2);
        const lowerHalf = sortedData.slice(0, middleIndex);
        const upperHalf = sortedData.slice(middleIndex + (sortedData.length % 2 === 0 ? 0 : 1))

        let getMedian = new measureOfCentralTendency(lowerHalf)
        const q1 = Math.floor(getMedian.median())

        getMedian = new measureOfCentralTendency(upperHalf)
        const q3 = Math.floor(getMedian.median())

        const iqr = q3 - q1

        return iqr

    }
}

const calculateMOD = new measureOfDispersion([4, 9, 17, 1, 11, 6, 12, 13, 5, 25, 17, 15, 9, 7, 8, 12, 23, 6, 12])


// exmaples

console.log('The mean for your given data is:', calculateMCT.mean())
console.log('The median for the given date is:', calculateMCT.median())
console.log('the mode of the given dataset is:', calculateMCT.mode())


console.log('--------')


console.log('The range for the given data is:', calculateMOD.range())
console.log('The variance for the given data is:', calculateMOD.variance())
console.log('The standard deviation for the given data is:', calculateMOD.standardDeviation())
console.log('The mean absolute deviation for the given data is:', calculateMOD.meanAbsoluteDeviation())
console.log('The inter quartile range for the given data is:', calculateMOD.interquartileRange())
