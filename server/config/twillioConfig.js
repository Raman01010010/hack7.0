const accountSid = 'AC610e41c78ac5db8ea8d430ea8b2f31a3';
const authToken = '9ef4d4798afe84e01851a9a03cb6af3e';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'raman',
        from: '+12563447753',
        to: '+918053842320'
    })
    .then(message => {
        console.log(message.sid);
        console.log("rama");
    })
    .catch(error => console.error(error));
