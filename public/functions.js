const pixelEnum = {
    0: ' ',
    1: '-',
    2: '|'
};

/**
* This funciton decodes the symbols and prints the output to the shape div.
* @param {Array<Array<number>>} arraToPrint Array of Arrays to be printed.
* @return {null} 
*/
function print(arrayToPrint) {
    let pResult = arrayToPrint.map((row) => {
        return row.map((col) => {
            return pixelEnum[col]
        }).join("")
    }).join("\n")

    document.getElementById("shape").innerHTML = pResult
}

 /**
   * Function to send ajax call to the backend draw function.
   * @param {string} width An even number greater than or equal to 20 representing the width of the shape.
   * @param {number} height An even number greater than or equal to 20 representing the height of the shape.
   * @param {number} padding An even number greater than or equal to 4 representing the padding of the shape.
   * @return {Promise} Returns a promise which resolves to the Array<Array<number>>.
   */
function draw(width, height, padding) {
    return new Promise((resolve, reject) => {
        let testFileName = `/draw?height=${height}&width=${width}&padding=${padding}`
        let xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText))
            }   
        };
    
        xhttp.open("GET", testFileName, true);
        xhttp.send();
    })
}

 /**
    * Function to validate the input.
    * @param {number} height The height input for the shape.
    * @param {number} width The width input for the shape.
    * @param {number} padding The padding input for the shape.
    * @return {boolean} whether the input is valid.
   */
function isInputValid(height, width, padding) {
    if (!height || isNaN(height) || height < 20 || height % 2 != 0) {
        alert("Height should be an even number greater than or equal to 20")
        return false
    }

    if (!width || isNaN(width) || width < 20 || width % 2 != 0) {
        alert("Width should be an even number greater than or equal to 20")
        return false
    }

    if (!padding || isNaN(padding) || padding < 4 || padding % 2 != 0) {
        alert("Padding should be an even number greater than or equal to 20")
        return false
    }

    return true

}

 /**
   * Function to be called on click of draw.
   * @return {null} 
   */
function startDrawing() {
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    let padding = document.getElementById("padding").value;

    if (isInputValid(height, width, padding)) {
        draw(width, height, padding).then((result) => {
            console.log("result : ", JSON.stringify( result))
            print(result)
        }).catch((err) => {
            alert(err)
        })
    }
}




