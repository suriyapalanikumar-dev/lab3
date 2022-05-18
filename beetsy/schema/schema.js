const graphql = require('graphql');
const UserModel = require('../model/user');
const ShopModel = require('../model/shop')
const ItemModel = require('../model/item')
const PurchaseModel = require('../model/purchase')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { resolve } = require('path');

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
    token: { type: GraphQLString},
    profileUrl:{
        type:GraphQLString
    },
    about :{
        type:GraphQLString
    },
    favorites: [{
      type:GraphQLString
  }],
  cart: [{
    type:GraphQLString
  }],
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

 const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
  itemname:{
      type: GraphQLString
  },
  itemcount:{
      type: GraphQLInt
  },
  itemphoto:{
      type: GraphQLString
  },
  itemcategory : {type:GraphQLString},
  itemdesc: {type:GraphQLString},
  price : {type:GraphQLInt},
  shopname : {type:GraphQLString},
  isFavorite:{type:GraphQLString},
  itemsold:{
      type: GraphQLInt
  },
  createdAt:{
      type:GraphQLString
  }
})
})

const PurchaseSchema = new GraphQLObjectType({
  name: 'Purchase',
  fields: () => ({
  itemid:{
      type: GraphQLString
  },
  gift:{
      type:GraphQLString
  },
  quantity:{
      type:GraphQLInt
  },
  price:{
      type:GraphQLInt
  },
  totalAmount:{type:GraphQLString}, 
  createdAt:{
      type: GraphQLString
  }
})
})

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
          UserModel.findOne({ email: args.email }, function (err, result) {
            let res = {};
            if (err) {
              resolve(err);
            }
            if (result.matchPassword(args.password)) {
              UserModel.findOneAndUpdate({"_id":result["_id"]},{"token":genToken(result)}, function(err, resp){
                  res = resp
                  if(err) {
                    res.error = "Unsuccessful Login";
                  }
              })
            } 
            resolve(res);
          });
        });
      },
    },

    displayShopDetails: {
      type: ShopType,
      args: {
        shopname: {type:GraphQLString}
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          Shop.findOne({"shopname":shopname}, function(err, result) {
            let res = {};
            if (err) {
              resolve(err);
            }
            else{
            resolve(res);
            }
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
            type: UserType,
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
                return newUser.save()
        },
    },

    updateProfile:{
      type: UserType,
      args: {
        userId : {type:new GraphQLNonNull(GraphQLString)},
        address: { type: GraphQLString },
        city:{ type: GraphQLString }, 
        state:{ type: GraphQLString}, 
        zip:{ type: GraphQLInt }, 
        dob:{ type: GraphQLString },
        phone:{ type: GraphQLInt }, 
        country: { type: GraphQLString },
        profileURL: {type:GraphQLString}
      },
      resolve(parent, args) {
        User.findOneAndUpdate({"_id":userId}, {"DOB":dob, "address":address,"state":state, "country":country, "city":city, "phone":phone}, function (err, result){
          if (err) {
            resolve(err);
          }
          else{
            resolve(result)
          }
        })
    }
  },

  createShopDetails: {
    type: ShopType,
    args: {
        ownerId: { type: new GraphQLNonNull(GraphQLString) },
        shopName: { type: new GraphQLNonNull(GraphQLString) },
        shopphoto : {type: GraphQLString}
    },
    resolve(parent, args) {
      let newShop = new Shop({"shopname":shopname, "ownerID":ownerId, "shopphoto":shopphoto})
      return newShop.save()
  },
  },

  addItemDetails: {
    type: ItemType,
    args: {
      itemname: {type: GraphQLString}, 
      itemcount: {type: GraphQLInt},
      itemphoto: {type: GraphQLString},
      itemcategory: {type: GraphQLString},
      itemdesc: {type: GraphQLString},
      price: {type: GraphQLInt},
      shopname: {type: GraphQLString}
    },
    resolve(parent, args) {
      let newItem = new Item({"itemname":itemname, "itemcount":itemcount,"itemphoto":itemphoto, "itemcategory":itemcategory,"itemdesc":itemdesc,"price":price,"shopname":shopname})
      return newItem.save()
  },
  },

  editItemDetails: {
    type: ItemType,
    args: {
    itemname: {type: GraphQLString}, 
    itemcount: {type: GraphQLString},
    itemdesc: {type: GraphQLString},
    price: {type: GraphQLInt}
    },
    resolve(parent, args) {
    let data = {}
     if(itemcount)
     {
       data["itemcount"] = itemcount
     }
     if(itemdesc)
     {
       data["itemdesc"] = itemdesc
     }
     if(price)
     {
       data["price"] = price
     }
     Item.findOneAndUpdate({"itemname":itemname},data, function(err, result){
      if(err)
      {
        resolve(err);
      }
      else{
        resolve(result)
      }
     })
     
  },
  },

  makeFavorite: {
    type: UserType,
    args: {
    userId: {type: GraphQLString},
    itemId:  {type: GraphQLString},
    },
    resolve(parent, args) {
    User.findOne({"_id":userId}, function(err, result){
      if(err)
    {
      resolve(err)
    }
    else{
      result["favorites"].push(itemid)
      return result.save()
    }
    })
  },
  },

  addCart: {
    type: UserType,
    args: {
    userId: {type: GraphQLString},
    itemId:  {type: GraphQLString},
    quantity:{type:GraphQLInt}
    },
    resolve(parent, args) {
    User.findOne({"_id":userId}, function(err, result){
    if(err)
    {
      resulve(err)
    }
    if(!result["cart"].includes(itemid))
    {
      result["cart"].push(itemid)
      return result.save()
    }
    })
    },
  },

  proceedCheckout:{
    type: PurchaseType,
    args: {
    itemId:  {type: GraphQLString},
    quantity:{type:GraphQLInt},
    gift:{type:GraphQLString},
    price:{type:GraphQLInt}
    },
    resolve(parent, args) {
      let purchase = new Purchase({"itemid": itemId, "gift":gift, "quantity":quantity,"price":price})
      return purchase.save()
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

