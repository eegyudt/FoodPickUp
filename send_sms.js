require('dotenv').load();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const myNumber = process.env.MY_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);


client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: twilioNumber,
    to: myNumber
  })
  .then(message => console.log(message.sid));