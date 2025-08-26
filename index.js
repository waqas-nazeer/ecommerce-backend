
 

const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit : '10mb' }));

// DB Connection
const db = require('./models');
db.sequelize.authenticate()
    .then(() => console.log('MySQL connected'))
    .catch(err => console.error('DB connection failed', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const auth = require('./middleware/auth');
const productRoutes = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes')


app.get('/', (req, res) => {
    res.send('API is running...');
});
//APIs
app.use('/api/users', userRoutes);
app.use('api/admin', adminRoutes)
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRouter );
app.use('/api/orders', orderRoutes);
app.use("/uploads", express.static("uploads"));

// Protected route
app.get('/api/protected', auth, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}` });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
