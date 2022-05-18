import { gql } from 'apollo-boost';

const signup_mutation = gql`
  mutation signUp($name: String, $email: String, $password: String) {
    signup(name: $name, email: $email, password: $password){
      _id
      email
      name
      error
    }
  }
`;

const updateprofile_mutation = gql`
  mutation updateProfile($userDetails: userInput) {
    updateUserProfile(
      userDetails: $userDetails) {
      _id
      email
      name
      password
      profileURL
      phone
      address
      city
      zip
      state
      dob
      about,
      profileURL,
      token
      error
    }
}
`;


const createitem_mutation = gql`
  mutation addItemDetails($itemname:String, 
    $itemcount:String,
    $itemphoto:String,
    $itemcategory:String,
    $itemdesc:String,
    $price:String,
    $shopname:String) {
        addItemDetails(itemname:$itemname, itemcount:$itemcount,itemphoto:$itemphoto,itemcategory:$itemcategory,itemdesc:$itemdesc,price:$price,shopname:$shopname
    )
  }
`;


const createshop_mutation = gql`
  mutation createShopDetails($ownerId: String, $shopName: String, $shopphoto:String) {
    createShopDetails(ownerId: $ownerId, shopName: $shopName,shopphoto:$shopName
    )
  }
`;


const edititem_mutation = gql`
  mutation editItemDetails($itemname:String, $itemcount:String,$itemdesc:String,$price:String,) {
    editItemDetails(itemname:$itemname, itemcount:$itemcount,itemdesc:$itemdesc,price:$price
    )
  }
`;


const makefavorite_mutation = gql`
  mutation makeFavorite($itemname:String, $userId:String) {
    makeFavorite(itemname:$itemname,
      userId:$userId
    )
  }
`;

const addcart_mutation = gql`
  mutation addCart($itemname:String, $userId:String, $quantity:String) {
    addCart(itemname:$itemname,
      userId:$userId,
      quantity:$quantity
    )
  }
`;

const purchase_mutation = gql`
  mutation proceedCheckout($itemId:String, $quantity:String, $gift:String, $price:String) {
    proceedCheckout(itemId:$itemId,
      quantity:$quantity,
      gift:$gift,
      price:$price
    )
  }
`;

export {
  signup_mutation,
  updateprofile_mutation,
  createitem_mutation,
  createshop_mutation,
  edititem_mutation,
  makefavorite_mutation,
  addcart_mutation,
  purchase_mutation
};