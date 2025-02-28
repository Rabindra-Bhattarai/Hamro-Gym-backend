const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const classRoutes = require('./routes/classRoutes');
const userRoutes =require('./routes/userRoutes');
const ScheduledClassesRoutes = require('./routes/ScheduledClassesRoutes')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/users', userRoutes);
app.use('/api/scheduled', ScheduledClassesRoutes)

// Sync database and start the server
const PORT = process.env.PORT || 3010;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });