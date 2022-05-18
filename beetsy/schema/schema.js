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

const PurchaseType = new GraphQLObjectType({
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
  userId:{
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
          ShopModel.findOne({"shopname":args.shopname}, function(err, result) {
            let res = {};
            if (err) {
              resolve(err);
            }
            else{
            resolve(result);
            }
          });
        });
      },
    },

    fetchFavorite:{
      type: UserType,
      args: {
        userId: {type:GraphQLString}
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          UserModel.find({ '_id':args.userId }, function(err, result) {
            let res = {};
            if (err) {
              resolve(err);
            }
            else{
            resolve(result);
            }
          });
        });
      },
    },

    fetchSearch:{
      type: ItemType,
      args: {
        value: {type:GraphQLString}
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          const resp = []
          const val = args.value.toLowerCase()
          var temp1 = ItemModel.find({}, function(err, result){
            //console.log(temp1)
            if(err)
            {
              resolve(err);
            }
            result.forEach(element => {
            if(element["itemname"].toLowerCase().includes(val))
            {
              resp.push(element)
            }
          });
          resolve(resp)
          });
        });
      },
    },

    fetchCart:{
      type: UserType,
      args: {
        userId: {type:GraphQLString},
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          UserModel.findOne({"_id":args.userId}, function(err, result){
            ItemModel.find({'_id':{ $in: result["cart"] }}, function(err, resp){
              if(err)
              {
                resolve(err)
              }
              else{
                resolve(resp)
              }
            })
          });
        });
      },
    },

    fetchSummaryItem:{
      type: ItemType,
      args: {
        itemId: {type:GraphQLString},
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          ItemModel.find({'_id': args.itemId}, function(err, resp){
            if(err)
            {
              resolve(err)
            }
            else{
              resolve(resp)
            }
          })
        });
      },
    },

    myPurchase:{
      type: PurchaseType,
      args: {
        userId: {type:GraphQLString},
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          PurchaseModel.find({'userId': args.userId}, function(err, resp){
            if(err)
            {
              resolve(err)
            }
            else{
              resolve(resp)
            }
          })
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
        UserModel.findOneAndUpdate({"_id":args.userId}, {"DOB":args.dob, "address":args.address,
        "state":args.state, "country":args.country, "city":args.city, "phone":args.phone}, function (err, result){
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
      let newShop = new ShopModel({"shopname":args.shopname, "ownerID":args.ownerId, "shopphoto":args.shopphoto})
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
      let res = {};
      let newItem = new ItemModel({"itemname":args.itemname, "itemcount":args.itemcount,"itemphoto":args.itemphoto, 
      "itemcategory":args.itemcategory,"itemdesc":args.itemdesc,"price":args.price,"shopname":args.shopname})
      if(newItem)
      {
        res = newItem.save();
      }
      else{
        res.error = "Unable to add items"
      }
      resolve(res)
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
       data["itemcount"] = args.itemcount
     }
     if(itemdesc)
     {
       data["itemdesc"] = args.itemdesc
     }
     if(price)
     {
       data["price"] = args.price
     }
     ItemModel.findOneAndUpdate({"itemname":args.itemname},data, function(err, result){
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
    UserModel.findOne({"_id":args.userId}, function(err, result){
      if(err)
    {
      resolve(err)
    }
    else{
      result["favorites"].push(args.itemid)
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
    UserModel.findOne({"_id":args.userId}, function(err, result){
    if(err)
    {
      resolve(err)
    }
    if(!result["cart"].includes(args.itemid))
    {
      result["cart"].push(args.itemid)
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
      let purchase = new PurchaseModel({"itemid": args.itemId, "gift":args.gift, "quantity":args.quantity,"price":args.price})
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

