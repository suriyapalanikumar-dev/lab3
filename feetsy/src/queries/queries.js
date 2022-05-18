import { gql } from 'apollo-boost';

const login_query = gql`
query($email: String,$password: String) {
  login(email:$email,password:$password){
    _id
    name
    email
    name
    token
  }
}
`;

const displayshop_query = gql`
query($shopname: String) {
    displayShopDetails(shopname:$shop_name)
}
`;
const fetchitemsummary_query = gql`
query($itemId: String) {
    fetchSummaryItem(itemId:$itemId)
    {
        itemname
        itemcount
        itemphoto
        itemcategory
        itemdesc
        price
        shopname
    }
}`;


const fetchfavorite_query = gql`
query($userId: String) {
    fetchFavorite(userId:$userId)
}`;

const fetchsearch_query = gql`
query($value: String) {
    fetchSearch(value:$value)
    {
        itemname
        itemcount
        itemphoto
        itemcategory
        itemdesc
        price
        shopname
    }
}`;

const fetchpurchase_query = gql`
query($userId: String) {
    myPurchase(userId:$userId)
    {
        itemid
        gift
        quantity
        price
        totalAmount
    }
}`;

const fetchcart_query = gql`
query($userId: String) {
    fetchCart(userId:$userId);
}`;


export {
  login_query,
  displayshop_query,
  fetchfavorite_query,
  fetchsearch_query,
  fetchcart_query,
  fetchitemsummary_query
};