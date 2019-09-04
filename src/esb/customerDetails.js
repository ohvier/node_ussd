const fs = require("fs");
const xml2js = require("xml2js");
const request = require("request");
const URL = "http://10.102.33.46:2160/getAccountDetails";

const ACCOUNT = "000400067342612";
const Id = "ACCOUNT";
const namSpaceValue =
  "http://www.developer.bk.rw/serviceprovider/frontend/client";

const username = "RETJpSDzwYQLBwujnpOVEJnI";
const password = "vuTYUExpMRilFQMkvpfHzeDMpmDQuejffTOe";

const object = {
  "ns1:getDetails": {
    $: {
      "xmlns:ns1": namSpaceValue
    },
    "ns1:Value": ACCOUNT,
    "ns1:Id": Id
  }
};

const builder = new xml2js.Builder();
const body = builder.buildObject(object);
//console.log(body);

const options = {
  method: "POST",
  url: URL,
  auth: {
    username,
    password
  },
  body
};
request(options, (error, response, body) => {
  // console.log("error:", error);
  // console.log("statusCode:", response && response.statusCode);
  console.log(body);

  const jsonResponse = new xml2js.Parser({
    xmlns: false,
    ignoreAttrs: true,
    trim: true,
    explicitArray: false
  });

  jsonResponse.parseString(body, (err, result) => {
    const fin = JSON.stringify(result);
    console.log(stripPrefix(fin));
  });

  // return body;
});

const stripPrefix = async input => {
  return input.split("ns5:").join("");
};
