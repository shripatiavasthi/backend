var unirest = require("unirest");


const sendSms = async options => {
  var req = unirest("GET",`https://2factor.in/API/V1/e0e264c8-edda-11ee-8cbb-0200cd936042/SMS/${options.to}/${options.otp}/LOGIN+OTP`)

    req.type("json");
    req.send()
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
      });
}

module.exports = sendSms