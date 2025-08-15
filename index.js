
 

const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
const db = require('./models');
db.sequelize.authenticate()
    .then(() => console.log('MySQL connected'))
    .catch(err => console.error('DB connection failed', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth');

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);

// Protected route
app.get('/api/protected', auth, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}` });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
