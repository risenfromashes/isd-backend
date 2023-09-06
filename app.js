import express from 'express';
import { v4 as uuid } from 'uuid';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { getLoginUser, registerUser, updateBasicInfo } from './Database/taxpayers/DB-taxpayer-api.js';


const app = express();
const port = process.env.PORT || 3500;


app.use(cookieParser())
app.use(express.json());


app.use(express.static(path.join(__dirname, 'VeriTax-FrontEnd', 'build')));

let authUsers = new Map();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'VeriTax-FrontEnd', 'build', 'index.html'));
});

app.post('/auth', async (req, res) => {
  console.log('attempting login');
  try {
    let r = await getLoginUser(req.body.user, req.body.pwd);
    let token = uuid();
    authUsers.set(token, r.clientID);
    res.cookie('Token', token, {
      httpOnly: true
    });
    res.json(r);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.post('/register', async (req, res) => {
  console.log('attempting login');
  try {
    let r = await registerUser(req.body.user, req.body.pwd);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
