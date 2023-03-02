const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: Product });
    if (!category) {
      res.status(404).json({ message: 'Category is not found' });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category is not found' });
    } else {
      const updatedCategory = await category.update(req.body);
      res.status(200).json(updatedCategory);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category is not found' });
    } else {
      await category.destroy();
      res.status(200).json({ message: 'Category deleted' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
