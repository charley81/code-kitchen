const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/recipes', function (req, res, next) {
  db.Recipes.findAll({
    include: [
      {
        model: db.Categories,
        through: {
          attributes: [],
        },
      },
    ],
  }).then((data) => {
    res.json(data);
  });
});

router.get('/recipes/:id', (req, res) => {
  db.Recipes.findByPk(req.params.id, {
    include: [
      {
        model: db.Categories,
        through: {
          attributes: [],
        },
      },
    ],
  }).then((data) => {
    res.json(data);
  });
});

router.post('/recipes', (req, res) => {
  const {
    name,
    review,
    description,
    url,
    likes,
    vegetarian,
    vegan,
    glutenfree,
    categories,
  } = req.body;

  if (!name) {
    res.status(400).json({ error: 'name field is required' });
  }
  if (!review) {
    res.status(400).json({ error: 'review field is required' });
  }
  if (!url) {
    res.status(400).json({ error: 'url field is required' });
  }

  db.Recipes.create({
    name,
    review,
    description: description || '',
    url,
    likes: likes || 0,
    vegetarian: vegetarian || false,
    vegan: vegan || false,
    glutenfree: glutenfree || false,
  })
    .then((recipe) => {
      return recipe.addCategories(categories).then((categories) => {
        res.status(201).json(recipe);
      });
    })
    .catch((error) => {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.json({ error: 'could not find all categories' });
      } else {
        res.json({ error: 'Server Error' });
        console.log(error);
      }
    });
});

router.delete('/recipes/:id', (req, res) => {
  db.Recipes.destroy({
    where: {
      id: req.params.id,
    },
  }).then((number) => {
    if (number > 0) {
      res.status(204).json({});
    } else {
      res.json({ error: `could not find recipe with ID: ${req.params.id}` });
    }
  });
});

module.exports = router;
