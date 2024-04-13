const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
	.connect(process.env.DATABASE_LOCAL, { family: 4 })
	.then(() => console.log('DB connected'))
	.catch((err) => console.log(err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`server listing to PORT ${PORT}`);
});
