const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`API Base URL: http://localhost:${PORT}`);
  console.log(`Dogs endpoint: http://localhost:${PORT}/api/dogs`);
  console.log(`Cats endpoint: http://localhost:${PORT}/api/cats`);
});