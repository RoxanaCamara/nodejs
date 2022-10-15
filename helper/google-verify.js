const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const verifyGoogle  = async(token='') => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  const { name, picture, email } = ticket.getPayload();
  return { name, picture, email }
}


module.exports ={
    verifyGoogle
}