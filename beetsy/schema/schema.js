const graphql = require('graphql');

 
const { GraphQLObjectType, GraphQLString,
      GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

 

 
var fakeBookDatabase = [
   { name:"Book 1", pages:432 , id:1},
   { name: "Book 2", pages: 32, id: 2},
   { name: "Book 3", pages: 532, id: 3 }
]

 
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
       id: { type: GraphQLID  },
       name: { type: GraphQLString },
       pages: { type: GraphQLInt }
   })
});
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       book: {
           type: BookType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return fakeBookDatabase.find((item) => { return item.id == args.id});
           }
       }
   }
});
 
//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use it when they are making requests.
module.exports = new GraphQLSchema({
   query: RootQuery
});