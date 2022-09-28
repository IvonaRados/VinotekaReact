const User = require("../Models/UserModel")
const {signJwt } = require('../jwt');


async function register(req, res) {
    try {
            const user_exsist = await User.find({email: req.body.email})
            /*let user = new User({email: req.body.email, password: req.body.password, role: req.body.role});
            user.save();*/
            //return res.json(user);
            console.log(user_exsist);
            if (user_exsist.length>0){
                return res.json("User vec postoji");
            }
            else{
                let user = new User({email: req.body.email, password: req.body.password, role: req.body.role});
                user.save();
                return res.json(user);
            }
    } catch (error) {
      res.status(404).send(error);
    }
  }


async function login(req, res) {
    try {
        
        const user = await User.find({email: req.body.email}) 
        if (user.length===0){
            return res.json("User ne postoji");
        }
        if (req.body.password !== user[0].password) {
            return res.send("Wrong password")
        }
        const token = signJwt(user[0]._id);

        return res.json({accessToken: token, user: user[0].email, role:user[0].role});
        
    } catch (error) {
      res.status(404).send(error);
    }
  }

module.exports = { login,register };

  