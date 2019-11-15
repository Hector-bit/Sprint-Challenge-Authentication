const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('./authModel');

router.post('/register', (req, res) => {
  let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
    // res.status(400).json({ 
    //   message: "please add user info"
    // })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function getJwtToken(user) {
  console.log('SHOULD HAVE A DEP', user)
const payload = {
  user
  // role: "student" // this will probably come from db
};

const secret = process.env.JWT_SECRET || "is it secret";

const options = {
  expiresIn: '1d'
}

return jwt.sign(payload, secret, options);
}

module.exports = router;
