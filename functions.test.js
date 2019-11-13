const functions = require('./functions')
let data = require('./test_data')

describe("test with data", () => {
    for (let i = 0; i < data.length; i++) {
        it('should be equal to expected result from data file', () => {
            
            let input = data[i].input.split(',')
            let res = functions.draw(parseInt(input[0]), parseInt(input[1]), parseInt(input[2]))
           
            expect(res).toStrictEqual(JSON.parse(data[i].pixelArrayJson))
        })
    }
})