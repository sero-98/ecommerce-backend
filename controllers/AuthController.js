const bcrypt = require('bcrypt');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    
    // Check if the email exists
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({
        message: 'User / Password are not correct - email'
      })
    }

    // IF the user is active
    if ( !user.state ) {
      return res.status(400).json({
        msg: 'User / Password are not correct - state: false'
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync( password, user.password );
    if(!validPassword){
      return res.status(400).json({
        message: 'User / Password are not correct - password'
      })
    }
    
    
    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }

}

module.exports = {
  login,
}