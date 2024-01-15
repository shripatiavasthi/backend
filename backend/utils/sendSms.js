

const sendSms = async options => {
    const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
            body: `${options.body}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: options.to
        }).then(() => {
            console.log("success")
        }).catch(err => {
            console.log(err,"fail")
        })
}

module.exports = sendSms