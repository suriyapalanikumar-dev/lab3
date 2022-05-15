const graphql = require('graphql');
const UserModel = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

genToken = user => {
  return jwt.sign({
    iss: 'suriya',
    sub: user.id,
    email: user.email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'TOP_SECRET');
}

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt,GraphQLSchema,
    GraphQLList,GraphQLNonNull, GraphQLDa
 } = graphql;

 
const UserType = new GraphQLObjectType({
   name: 'User',
   fields: () => ({
    id: { type: GraphQLID  },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    DOB: {type:GraphQLString},
    city: {type:GraphQLString},
    state : {type:GraphQLString},
    country : {type:GraphQLString},
    address : {type:GraphQLString},
    phone : {type:GraphQLInt},
    profileUrl:{
        type:GraphQLString
    },
    about :{
        type:GraphQLString
    },
})
});

const ShopType = new GraphQLObjectType({
    name: 'Shop',
    fields: () => ({
        id: { type: GraphQLID  },
        shopname:{
            type: GraphQLString,
        },
        ownerID:{
            type: GraphQLString,
        },
        shopphoto:{
            type: GraphQLString,
        },
        createdAt:{
            type: GraphQLString
        }
 })
 });

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {


    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
            // let foundUser = await User.findOne({ email });
            // console.log(password)
            // console.log(foundUser.password)
            // if(await foundUser.matchPassword(password))
            // {
            //   console.log("matched")
            //   let token = genToken(foundUser)
            //   console.log(typeof foundUser)
            //   console.log(foundUser)
            //   res.status(200).json({foundUser, "token":token})
            // }

          UserModel.findOne({ email: args.email }, function (err, result) {
            let res = {};
            if (err) {
              resolve(err);
            }
            if (result.matchPassword(args.password)) {
              res = result;
            } else {
              res.error = "Unsuccessful Login";
            }
            resolve(res);
          });
        });
      },
    },
}
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUp: {
            type: GraphQLString,
            args: {
                //GraphQLNonNull make these fields required
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                //Check If User Exists
                UserModel.findOne({ email: args.email }, function (err, result) {
                    let res = {};
                    if (err) {
                      resolve(err);
                    }

                })
                const newUser = new UserModel({ "name":args.name,"email": args.email,"password": args.password})
                newUser.save()
                return "Hai testing"
        },
    }
}
 })
 
//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use it when they are making requests.
module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});