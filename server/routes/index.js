/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const User = require('../Models/User.model');
const Product = require('../Models/Product.model');

module.exports = function (app) {
  app.post('/api/new_user', async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body;
    const emailAvailable = await User.find({ email }).then(
      (r) => !(r.length > 0)
    );

    if (emailAvailable) {
      const newUser = new User({
        _id: new mongoose.mongo.ObjectId(),
        email,
        password,
        firstName,
        lastName,
        role
      });
      newUser.save().then(() => res.json('New user registered.'));
    } else {
      res.status(400).json({
        message: 'Email Taken'
      });
    }
  });

  app.get('/api/products', (req, res) => {
    Product.find().then((allProducts) => {
      res.json(allProducts);
    });
  });

  app.delete('/api/products/delete', (req, res) => {
    const { idsToDelete } = req.body;
    idsToDelete.forEach((id) => {
      Product.findByIdAndDelete(id).then(() =>
        console.log(`Id Deleted: ${id}`)
      );
    });
    res.json(`${idsToDelete} deleted`);
  });

  app.get('/api/details/:product_id', (req, res) => {
    // eslint-disable-next-line camelcase
    const { product_id } = req.params;
    Product.findById(product_id).then((product) => {
      res.json(product);
    });
  });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password }).then((u) => {
      if (u) {
        jwt.sign({ email, password }, 'secretkey', (err, token) => {
          res.json({
            token,
            role: u.role,
            username: u.firstName
          });
        });
      } else {
        res.status(400).json({
          message: 'Incorrect credentials'
        });
      }
    });
  });

  app.post('/api/products/new', (req, res) => {
    const {
      price,
      thumbnail,
      title,
      description,
      stock,
      rating,
      brand,
      discountPercentage,
      category
    } = req.body;
    const newProduct = new Product(
      {
        _id: new mongoose.mongo.ObjectId(),
        price,
        thumbnail,
        title,
        description,
        stock,
        rating,
        brand,
        discountPercentage,
        category
      },
      {
        versionKey: false
      }
    );
    newProduct.save().then(() => res.json('New product added.'));
  });

  app.put('/api/products/edit', async (req, res) => {
    const {
      _id,
      price,
      thumbnail,
      title,
      description,
      stock,
      rating,
      brand,
      discountPercentage,
      category
    } = req.body;
    const filter = { _id };
    const update = {
      price,
      thumbnail,
      title,
      description,
      stock,
      rating,
      brand,
      discountPercentage,
      category
    };
    try {
      const newProduct = await Product.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(400).json({
        message: 'Error while editing'
      });
    }
  });

  app.post('/api/create-payment-intent', async (req, res) => {
    const calculateOrderAmount = (cartItems) =>
      cartItems.reduce((acc, item) => acc + item.price, 0);
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });
};
