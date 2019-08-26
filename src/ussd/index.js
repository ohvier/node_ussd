const express = require('express');
const format =require('string-template');
const config = require('../config');
const logger = require('../config/logger');
const router = express.Router();
const MENU = require('./menu');
const DB = require('../db');
const KINY=0,ENG =1;

/**
 * {
 *  userMessage:/....
 *  levelStr: ...
 *  msisdn: /....
 * }
 */
router.post('/', async (req, res, next) => {
  req.assert('msisdn', 'Invalid phone').isRwandanPhone();
  let errors = req.validationErrors();
  if (errors) return res.status(400).send(errors[0].msg);
  const phone = req.body.msisdn,isFirstVisit =req.body.levelStr==0
  try {
    let session = await getSession(phone);// session means DB results
    if (!session ||  isFirstVisit) return firstVisitMenu(req, res);
    switch(session.step){
      case MENU.FIRST_VISIT.step: return languageSelected(session,req,res);
      case MENU.CHOOSE_ORG.step: return orgSelected(session,req,res);
      case MENU.CHOOSE_SERVICE.step: return serviceSelected(session,req,res);
      case MENU.ENTER_NID.step: return nidIsProvided(session,req,res);
      case MENU.CONFIRM_NID.step: return nidIsConfirmed(session,req,res);
     // case MENU.SUCCESS.step: return everythingIsFine(session,req,res);//not needed
      
    }
  } catch (error) {
    return res.send({text:MENU.SYSTEM_FAILURE.text[ENG],action:MENU.SYSTEM_FAILURE.action});
  }

});
const firstVisitMenu = async(req,res)=>{
  try {
    let ok = await saveSession(req.body.msisdn,{step:MENU.FIRST_VISIT.step});
    return res.send({text:MENU.FIRST_VISIT.text[KINY],action:MENU.FIRST_VISIT.action});
  } catch (error) {
    return res.send({text:MENU.SYSTEM_FAILURE.text[ENG],action:MENU.SYSTEM_FAILURE.action});
  }
}
const languageSelected =async (session,req,res)=>{
  const input= req.body.userMessage;
  if(input-1!= ENG && input-1!= KINY) return firstVisitMenu(req,res);
  try {
    let lang = input==ENG+1? ENG:KINY;
    //updates
    session.step=MENU.CHOOSE_ORG.step;
    session.lang=lang
    let ok = await saveSession(req.body.msisdn,session);
    return res.send({text:MENU.CHOOSE_ORG.text[lang],action:MENU.CHOOSE_ORG.action});
  } catch (error) {
    return res.send({text:MENU.SYSTEM_FAILURE.text[lang],action:MENU.SYSTEM_FAILURE.action});
  }
}

const orgSelected =async (session,req,res)=>{
  try {
    session.step =MENU.CHOOSE_SERVICE.step;
    let ok = await saveSession(req.body.msisdn,session);
    return res.send({text:MENU.CHOOSE_SERVICE.text[session.lang],action:MENU.CHOOSE_SERVICE.action});
  } catch (error) {
    return res.send({text:MENU.SYSTEM_FAILURE.text[session.lang],action:MENU.SYSTEM_FAILURE.action});
  }
}

const serviceSelected =async (session,req,res)=>{
  try {
    session.step =MENU.ENTER_NID.step; // this is the next step
    let ok = await saveSession(req.body.msisdn,session);
    return res.send({text:MENU.ENTER_NID.text[session.lang],action:MENU.ENTER_NID.action});
  } catch (error) {
    return res.send({text:MENU.SYSTEM_FAILURE.text[session.lang],action:MENU.SYSTEM_FAILURE.action});
  }
}

const nidIsProvided =async (session,req,res)=>{
  const nid =req.body.userMessage;
  if(!/^\d{16}$/.test(nid)) return serviceSelected(session,req,res);
  try {
    session.step =MENU.CONFIRM_NID.step;
    session.nid =nid
    let ok = await saveSession(req.body.msisdn,session);
    return res.send({text:format(MENU.CONFIRM_NID.text[session.lang],[session.nid]),action:MENU.CONFIRM_NID.action});
  } catch (error) {
    return res.send({text:MENU.SYSTEM_FAILURE.text[session.lang],action:MENU.SYSTEM_FAILURE.action});
  }
}

const nidIsConfirmed =async (session,req,res)=>{
  const input =req.body.userMessage;
  if(input !==1 && input !==2) return res.send({text:format(MENU.CONFIRM_NID.text[session.lang],[session.nid]),action:MENU.CONFIRM_NID.action});
  else if(input == 2) return serviceSelected(session,req,res);
  try {
    return res.send({text:MENU.SUCCESS.text[session.lang],action:MENU.SUCCESS.action});
  } catch (error) {
    return res.send({text:MENU.SYSTEM_FAILURE.text[session.lang],action:MENU.SYSTEM_FAILURE.action});
  }
}




saveSession = (phone, object) => {
  return new Promise((resolve, reject) => {
    DB.set(phone, object, config.expires, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

getSession = phone => {
  return new Promise((resolve, reject) => {
    DB.get(phone, (err, reply) => {
      if (err) reject(err);
      else resolve(reply);
    });
  });
};

clearPhoneSession = phone => {
  return new Promise((resolve, reject) => {
    DB.del(phone, err => {
      if (err) reject(err);
      else resolve;
    });
  });
};
module.exports = router;
