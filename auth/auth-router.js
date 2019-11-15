const router = require('express').Router();
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  let user = req.body;

  if(req.body){
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ 
      message: "please add user info"
    })
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token
        const token = getJwtToken(user);

        //send the token to the client
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

module.exports = router;
