// function composition
const compose = (...rest) => x => rest.reduceRight((y, f) => f(y), x)

export default compose;