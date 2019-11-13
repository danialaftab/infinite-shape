var cloneDeep = require('lodash.clonedeep');
const functions = {
    /**
     * Function to validate the input.
     * @param {number} height The height input for the shape.
     * @param {number} width The width input for the shape.
     * @param {number} padding The padding input for the shape.
     * @return {boolean} whether the input is valid.
     */
    isInputValid: function (height, width, padding) {
        if (!height || isNaN(height) || height < 20 || height % 2 != 0) {
            return false
        }

        if (!width || isNaN(width) || width < 20 || width % 2 != 0) {
            return false
        }

        if (!padding || isNaN(padding) || padding < 4 || padding % 2 != 0) {
            return false
        }

        return true
    },

    /**
    * A function that returns the loop condition based on the character to render.
    * @param {number} charToRender The character to render.
    * @param {number} iterator The loop iterator variable.
    * @param {number} multiplier A number to add.
    * @return {boolean} returns true or false based on condition.
    */
    getLoopCondition: function (charToRender, iterator, threshold) {
        if (charToRender === 1) {
            return (iterator < threshold)
        } else {
            return (iterator <= threshold)
        }
    },

    /**
    * Function to create a single row for the shape.
    * @param {string} halfWidth Half of the width of the shape/half of the length of row.
    * @param {string} multiplier The number rows from top.
    * @param {string} halfPadding The padding needed on sides.
    * @param {string} charToRender Determines if this is an empty row (value : 0) or a row with a shape inside (value 1).
    * @return {Array} The row to be added to shape.
    */
    createRow: function (halfWidth, multiplier, halfPadding, charToRender) {
        let row = [],
            charCount = 0,
            endIndex = (halfWidth * 2) - 1

        for (let i = 0; functions.getLoopCondition(charToRender, i, multiplier); i++) {
            if (charCount >= halfWidth)
                break;
            //adding side border for shape
            row[charCount] = 2
            row[endIndex] = 2
            endIndex--
            charCount++

            //adding padding on sides
            for (let j = 0; j < halfPadding; j++) {
                if (charCount >= halfWidth)
                    break;

                row[charCount] = 0
                row[endIndex] = 0
                endIndex--
                charCount++
            }
        }

        //adding either shape or top border for a shape in the middle
        for (charCount; charCount < halfWidth; charCount++) {
            row[charCount] = charToRender
            row[endIndex] = charToRender
            endIndex--
        }

        return row
    },

    /**
    * Function to create the top and bottom rows for the outermost shape.
    * @param {number} length The length of row.
    * @return {array} The row to be added to the shape with full border.
    */
    createRowWithTopOnly: function (length) {
        let row = []
        for (let i = 0; i < length; i++) {
            row.push(1)
        }

        return row
    },

    /**
    * Function to create the the shape.
    * @param {string} width An even number greater than or equal to 20 representing the width of the shape.
    * @param {number} height An even number greater than or equal to 20 representing the height of the shape.
    * @param {number} padding An even number greater than or equal to 4 representing the padding of the shape.
    * @return {Array} An array of arrays representing the shape.
    */
    draw: function (width, height, padding) {
        let result = [],
            multiplier = 0,
            halfPadding = padding / 2,
            halfHeight = height / 2,
            halfWidth = width / 2
            startIndex = 0,
            endIndex = height - 1

        //Creating and adding first and last rows    
        result.push(functions.createRowWithTopOnly(width))
        result[endIndex] = cloneDeep(result[startIndex])
        startIndex++
        endIndex--

        for (let j = 0; j < halfHeight; j++) {

            for (let i = 0; i < halfPadding; i++) {
                if (startIndex >= halfHeight)
                    break;
                //adding vertical padding rows
                result[startIndex] = functions.createRow(halfWidth, multiplier, halfPadding, 0)
                result[endIndex] = cloneDeep(result[startIndex])
                startIndex++
                endIndex--
            }

            multiplier++

            if (startIndex >= halfHeight)
                break;

            //adding rows with shape's top and bottom borders
            result[startIndex] = functions.createRow(halfWidth, multiplier, halfPadding, 1)
            result[endIndex] = cloneDeep(result[startIndex])
            startIndex++
            endIndex--
        }

        return result
    }
}

module.exports = functions