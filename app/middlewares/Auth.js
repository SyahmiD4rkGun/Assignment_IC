const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token =req.headers[ "Acces Token"];

    if(!token){
        res.status(403).send({ message: "No Token Provided"})
    }

    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({message: "Access Denied!"});
        }
        req.userId = decoded.id;
        next();
    });
};

Admin = (req, res,next) => {
    User.findById(req.userId).exec((err, user) =>{
        if(err) {
            res.status(500).send({ messgae: err});
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles}
            },
            (err, roles) => {
                if(err) {
                    res.status(500).send({ message: err});
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                      next();
                      return;
                    }
                }
                res.status(403).send({message: "Require Admin role!"});
                return;
            }
        );
    });
};

Moderator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    });
  };
  
  const authJwt = {
    verifyToken,
    Admin,
    Moderator
  };
  module.exports = authJwt;