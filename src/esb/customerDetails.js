const fs = require('fs');
const xml2js = require('xml2js');
const request = require('request');
const URL = 'http://10.102.33.46:2160/getAccountDetails';
const template = '';
const object = {
  'ns1:getDetails': {
    $: {
      'xmlns:ns1': 'http://www.developer.bk.rw/serviceprovider/frontend/client'
    },
    'ns1:Value': '000409104324251',
    'ns1:Id': 'ACCOUNT'
  }
};

const builder = new xml2js.Builder();
const xml = builder.buildObject(object);
console.log(xml);

const options = {
  method: 'POST',
  url: URL,
  auth: {
    username: 'RETJpSDzwYQLBwujnpOVEJnI',
    password: 'vuTYUExpMRilFQMkvpfHzeDMpmDQuejffTOe'
  },
  headers: {
    'Content-Type': 'text/xml'
  },
  body: xml
};
const answer = request(options, (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body', body);
});

console.log(answer);

// const builder = new xml2js.Builder();
// const xml = builder.buildObject(object);
console.log(xml);
