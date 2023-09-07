import express from 'express';
import { v4 as uuid } from 'uuid';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { getBasicInfo, getLoginUser, registerUser, updateBasicInfo, updateProfile, getProfile } from './Database/taxpayers/DB-taxpayer-api.js';
import { getExemptionRules } from './Database/rules/DB-exemption-rules-api.js';


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'VeriTax-FrontEnd', 'build')));

let authUsers = new Map();



app.post('/auth', async (req, res) => {
  console.log('attempting login');let token = req.cookies.Token;

  if (req.body.user != undefined) {
    try {
      let r = await getLoginUser(req.body.user, req.body.pwd);
      let token = uuid();
      authUsers.set(token, r.clientID);
      res.cookie('Token', token, {
        httpOnly: true
      });
      res.json({ id: r.clientID });
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  } else if (token == undefined || authUsers.get(token) == undefined) {
    res.sendStatus(401);
  } else {
    res.json({ id: authUsers.get(token) });
  }
});

app.post('/register', async (req, res) => {
  console.log('attempting login');
  try {
    let r = await registerUser(req.body.user, req.body.pwd);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    if (e.message == "Username taken") {
      res.sendStatus(409);
    } else {
      res.sendStatus(400);
    }
  }
});

app.post('/getbasicinfo', async (req, res) => {
  console.log('attempting login');
  let token = req.cookies.Token;
  if (token == undefined || authUsers.get(token) == undefined) {
    res.sendStatus(401);
  } else {
    let id = authUsers.get(token);
    try {
      let r = await getBasicInfo(id);
      res.json(r);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
});

app.post('/basicinfo', async (req, res) => {
  console.log('attempting login');
  let token = req.cookies.Token;
  if (token == undefined || authUsers.get(token) == undefined) {
    res.sendStatus(401);
  } else {
    let id = authUsers.get(token);
    try {
      let r = await updateBasicInfo(id, req.body.fullname, req.body.tin, req.body.nid, 
        req.body.contactNumber, req.body.gender, req.body.dateOfBirth, req.body.presentAddress, 
        req.body.permanentAddress, req.body.taxZone, req.body.taxCircle, req.body.maritalStatus);
      res.json(r);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
});


app.post('/getProfile', async (req, res) => {
  console.log('attempting login');
  let token = req.cookies.Token;
  if (token == undefined || authUsers.get(token) == undefined) {
    res.sendStatus(401);
  } else {
    let id = authUsers.get(token);
    try {
      let r = await getProfile(id);
      res.json(r);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
});

app.post('/profile', async (req, res) => {
  console.log('attempting login');
  let token = req.cookies.Token;
  if (token == undefined || authUsers.get(token) == undefined) {
    res.sendStatus(401);
  } else {
    let id = authUsers.get(token);
    try {
      let r = await updateProfile(id, req.body.fullname, req.body.tin, req.body.nid,  req.body.username, req.body.password,
        req.body.contactNumber, req.body.gender, req.body.dateOfBirth, req.body.presentAddress, 
        req.body.permanentAddress, req.body.taxZone, req.body.taxCircle, req.body.maritalStatus);
      res.json(r);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
});

app.post('/exemption', async (req, res) => {
  console.log('fetching exemptions');
  let token = req.cookies.Token;
  if (token == undefined || authUsers.get(token) == undefined) {
    res.sendStatus(401);
  } else {
    console.log(req.body);
    try {
      let r = await getExemptionRules(req.body.year);
      res.json(r);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
});

app.post('/logout', async (req, res) => {
  console.log('logout request');
  let token = req.cookies.Token;
  if (token == undefined || authUsers.get(token) == undefined) {
    res.sendStatus(200);
  } else {
    console.log(req.body);
    authUsers.delete(token);
    res.sendStatus(200);
  }
});

app.get('/*', (req, res) => {
  let token = req.cookies.Token;
  console.log({token});
  res.sendFile(path.join(__dirname, 'VeriTax-FrontEnd', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
