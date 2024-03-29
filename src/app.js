const express = require('express');
const app = express();
const userRouter = require('./routers/usersRouter');
const transactionsRouter = require('./routers/transactionsRouter');
const transactionHistoryRouter = require('./routers/transactionHistoryRouter');
const sequelize = require('./database/db'); 
const errHandler = require('./middlewares/errHandler');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errHandler);

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})(); 

// Routes
app.use('/', userRouter);
app.use('/', transactionsRouter);
app.use('/', transactionHistoryRouter);

// Homepage
app.get('/bank', (req, res) => {
  res.send('Bank!!!! ');
});


module.exports = app;
