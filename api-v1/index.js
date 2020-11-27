const express = require('express');
const app = express();
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB();

app.use(express.json({ extended: false }));

app.get('/', async (req, res) => {

    let user = new User({
        name: 'Leo'
    });

    const newUser = await user.save();

    res.send(`API activa ${newUser}`);
});

//TODO: Versionamiento de la API

app.use('/api/users', require('./controllers/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server iniciado en http://localhost:${PORT}`));