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

const fetchUsersQuery = gql`
query{
  fetchUsers{
    name
    email
    _id
  }
}`;


const getAllExpensesQuery = gql`
query($group_id: String) {
  getAllExpenses(group_id:$group_id){
    group_id
    description
    paid_by
    amount
    created_date
    updated_date
    paid_to_users{
      paid_to
      amount
      settled
      _id
    }
  }
}`;


const getAllIndividualExpensesQuery = gql`
query($group_id: String) {
  getAllIndividualExpensesQuery(group_id:$group_id){
    group_id
    description
    paid_by
    amount
    created_date
    updated_date
    paid_to_users{
      paid_to
      amount
      settled
      _id
    }
  }
}`;


export {
  login_query,
  fetchGroupsQuery,
  fetchUsersQuery,
  getAllExpensesQuery,
  getAllIndividualExpensesQuery,
};