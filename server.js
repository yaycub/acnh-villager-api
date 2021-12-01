import dotenv from 'dotenv';
import connect from './lib/utils/connect.js';
import app from './lib/viewApp.js';

dotenv.config();

connect(process.env.MONGODB_URI);

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
