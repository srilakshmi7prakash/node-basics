const { addition, substraction } = require('./math');

function calculator(add, diff) {

    const addValue = add(2,5);
    const diffValue = diff(15,7);
    return ({ addValue, diffValue })
}
module.exports = calculator(addition, substraction);

