const limpeza = ["papel", "sabonete", "pasta", "hidratante"];
const bebidas = ["refrigerante", "suco", "agua", "energetico"];
const cereais = ["aveia", "sucrilhos", "flocos", "nescalball"];

const testMarketData = {
  limpeza,
  bebidas,
  cereais,
};

const findPath = (listOfProducts, marketData) => {
  const path = [];
  const copy = listOfProducts;

  while (copy.length > 0) {
    const product = copy.shift();

    for (const row in marketData) {
      if (marketData[row].includes(product)) {
        !path.includes(row) && path.push(row);
        break;
      }
    }
  }

  return path;
};

module.exports = { findPath, testMarketData };
