const limpeza = ["papel", "sabonete", "pasta", "hidratante"];
const bebidas = ["refrigerante", "suco", "agua", "energetico"];
const cereais = ["aveia", "sucrilhos", "flocos", "nescalball"];

const marketData = {
  limpeza,
  bebidas,
  cereais,
};

const userProducts = ["aveia", "hidratante", "agua"];

const findPath = (listOfProducts) => {
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

console.log(findPath(userProducts));
