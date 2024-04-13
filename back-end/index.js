const express = require('express');
const app = express();
const cors = require('cors');

const mockProducts =  [
    { id: 1, name: 'Produto' },
    { id: 2, name: 'Produto' },
    { id: 3, name: 'Produto' },
    { id: 4, name: 'Produto' },
    { id: 5, name: 'Produto' },
    { id: 6, name: 'Produto' },
    { id: 7, name: 'Produto' },
    { id: 8, name: 'Produto' },
    { id: 9, name: 'Produto' },
    { id: 10, name: 'Produto' },
    { id: 11, name: 'Produto' },
    { id: 12, name: 'Produto' },
    { id: 13, name: 'Produto' },
    { id: 14, name: 'Produto' },
    { id: 15, name: 'Produto' },
    { id: 16, name: 'Produto' },
    { id: 17, name: 'Produto' },
    { id: 18, name: 'Produto' },
    { id: 19, name: 'Produto' },
    { id: 20, name: 'Produto' }
  ]

// Dados mockados de saldo em estoque
const mockStock = [
  { productId: 1, quantity: 15 },
  { productId: 2, quantity: 20 },
  { productId: 3, quantity: 25 },
  { productId: 4, quantity: 10 },
  { productId: 5, quantity: 30 },
  { productId: 6, quantity: 5 },
  { productId: 7, quantity: 50 },
  { productId: 8, quantity: 15 },
  { productId: 9, quantity: 20 },
  { productId: 10, quantity: 10 }
];

// Função para paginar os resultados
function paginateResults(data, page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return data.slice(startIndex, endIndex);
}

app.use(cors())

// Rota para obter os produtos paginados
app.get('/api/produtos', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const totalPages = Math.ceil(mockProducts.length / pageSize);
  const hasNext = page < totalPages;

  const paginatedResults = paginateResults(mockProducts, page, pageSize);

  res.json({
    hasNext: hasNext,
    items: paginatedResults
  });
});

// Rota para obter o saldo em estoque de um produto específico
app.get('/api/estoque', (req, res) => {
  
  res.json({
    hasNext: false,
    items: mockStock   
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
