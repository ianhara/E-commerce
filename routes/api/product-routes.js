const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get one product by its `id` value with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }]
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, category_id, tags } = req.body;

    const newProduct = await Product.create({
      product_name,
      price,
      stock,
      category_id
    });

    if (tags && tags.length > 0) {
      await Promise.all(tags.map(async tagId => {
        const tag = await Tag.findByPk(tagId);
        if (tag) {
          await ProductTag.create({
            product_id: newProduct.id,
            tag_id: tag.id
          });
        }
      }));
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// update product by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const existingProduct = await Product.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const [rowsAffected, updatedProduct] = await Product.update(productData, {
      where: { id: productId },
      returning: true,
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
