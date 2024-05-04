# E-Commerce Backend

Welcome to our e-commerce backend project, built with Express.js and Sequelize! This project provides a simple API for managing products, categories, and tags in your online store.

## Getting Started

To start using this project, follow these easy steps:

1. **Clone this repository** to your local machine:

   ```bash
   git clone <repository_url>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up your database**:
   
   - Create a MySQL database using the schema provided in `db/schema.sql`.
   - Update the database configuration in `.env` with your MySQL credentials.

4. **Seed the database** (optional):

   ```bash
   npm run seed
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

6. You're good to go! Start using the API.

## API Endpoints

- **GET** `/api/products`: Get all products.
- **GET** `/api/products/:id`: Get a single product by ID.
- **POST** `/api/products`: Create a new product.
- **PUT** `/api/products/:id`: Update a product by ID.
- **DELETE** `/api/products/:id`: Delete a product by ID.

Similar endpoints are available for categories and tags.


