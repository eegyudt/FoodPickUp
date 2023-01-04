require('dotenv').load();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const myNumber = process.env.MY_PHONE_NUMBER;
let textMessage = 'Luke! I am your father!';
const client = require('twilio')(accountSid, authToken);

const sendText = (message, phoneNumber) => {
  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: phoneNumber
    })
    .then(message => console.log(message.sid));
};

sendText(textMessage, myNumber);

module.exports = sendText;