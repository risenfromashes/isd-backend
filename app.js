const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


// Serve static files (e.g., React app) from the "build" folder
app.use(express.static(path.join(__dirname, 'VeriTax-FrontEnd', 'build')));

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'VeriTax-FrontEnd', 'build', 'index.html'));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
