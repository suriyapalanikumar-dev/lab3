import {Row, Col, Card, Input, Button, Select, Table, InputNumber, Checkbox} from 'antd';
import 'antd/dist/antd.css';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import Navbar from '../Navbar/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { authenticateUser, login, logout, itemSelect } from '../../features/userSlice';
import axios,{post} from 'axios';
import React, {Component, useState, useEffect} from 'react';
const Cart = () =>
{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser) 
    const [cartdetails, setCartdetails] = useState([])
    const [ordervalue, setOrderValue] = useState(0)
     
    useEffect(() => {
        //alert("car")
        axios.get(process.env.REACT_APP_SERVER + "/fetchCart",{ headers: {"Authorization" : `Bearer ${loguser.token}`} })
        .then(response => {
          console.log(response.data)
          var tt = 0
          response.data.forEach(element => {
              tt = tt+(element["itemsold"]*element["price"])
          });
          setOrderValue(tt)
          setCartdetails(response.data)
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
        
    }, []);
    const deleteCart=(e)=>{
        axios.post(process.env.REACT_APP_SERVER + "/deleteCart",{"itemid":e},{ headers: {"Authorization" : `Bearer ${loguser.token}`} })
        .then(response => {
          console.log(response.data)
          setCartdetails(response.data)
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
    }
    const checkout = () =>{
      axios.post(process.env.REACT_APP_SERVER + "/proceedCheckout",{},{ headers: {"Authorization" : `Bearer ${loguser.token}`} })
      .then(response => {
        console.log(response.data)
        alert("Order Placed. Order ID is "+response.data)
      })
    }
    const saveCart=(itemid,e)=>{
        
        axios.post(process.env.REACT_APP_SERVER + "/saveCart",{"itemid":itemid, "sellvalue":3},{ headers: {"Authorization" : `Bearer ${loguser.token}`} })
        .then(response => {
          console.log(response.data)
        //   var tt = 0
        //   response.data.forEach(element => {
        //       tt = tt+(3*element["price"])
        //   });
        //   setOrderValue(tt)
          //setCartdetails(response.data)
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
    }

    const savedesc=(itemid,e)=>{
        axios.post(process.env.REACT_APP_SERVER + "/saveDesc",{"itemid":itemid, "sellvalue":e},{ headers: {"Authorization" : `Bearer ${loguser.token}`} })
        .then(response => {
          console.log(response.data)
          //setCartdetails(response.data)
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
    }
      const onChange = (value)=>{
          console.log(value.target.checked)
      }
      return (  
        <div>  
            <Navbar/>
            {/*<ReactTable  
                data={data}  
                columns={columns}  
                defaultPageSize = {2}  
                pageSizeOptions = {[2,4, 6]}  
                style={{marginTop:"2%"}}
            />  
            <br/>
            <Button type="primary" size="large" onClick={(e)=>alert("Order placed your purchase ID is:0f0f9934-e055-454e-b83a-7ed8ed1d0c2e")}>Proceed to Checkout USD 310.99</Button> */}
            <div style={{marginLeft:"10%",marginTop:"2%",width:"80%", borderStyle:"solid",borderColor:"black"}}>
            <Row>
                <Col span= {4}>
                    <h2><b><u>Name</u></b></h2>
                </Col>
                <Col span= {4}>
                    <h2><b><u>Price</u></b></h2>
                </Col>
                <Col span= {4}>
                    <h2><b><u>Quantity</u></b></h2>
                </Col>
                <Col span= {4}>
                    <h2><b><u>Gift Option</u></b></h2>
                </Col>
                <Col span= {4}>
                    <h2><b><u>Gift Description</u></b></h2>
                </Col>
            </Row>
            {
                cartdetails.map((element)=>
                    <Row>
                    <Col span = {4}>
                        <p style={{fontSize:"20px"}}>{element.itemname}</p>
                    </Col>
                    <Col span = {4}>
                        <p style={{fontSize:"20px"}}>USD {element.price}</p>
                    </Col>
                    <Col span = {4}>
                        <InputNumber min={0} max={10} defaultValue={1} onChange={(e)=>saveCart(element._id,e)}/>
                    </Col>
                    <Col span = {4}>
                            <Checkbox onChange={(e)=>onChange(e)}>Need Gift?</Checkbox>
                    </Col>
                    <Col span = {4}>
                            <Input onChange={(e)=>savedesc(element._id,e.target.value)}/>
                    </Col>

                    <Col span = {4}>
                           {/* <Button type="primary">Save</Button> */}
                           <Button danger onClick={(e)=>deleteCart(element._id)}>Delete</Button>
                    </Col>
                </Row>
                )
            }
            
            </div>     
            <br/>
            <h4><b>Your total order value is {ordervalue}</b></h4>
            <Button size="large" type="primary" onClick={(e)=>checkout(e)}>Proceed to Checkout</Button>           
            </div>       
    )  

}

export default Cart;

// import React, {Component, useState, useEffect} from 'react';
// import {Row, Col, Card, Input, Button, Select, Tooltip, InputNumber} from 'antd';
// import 'antd/dist/antd.css';
// import axios,{post} from 'axios';
// import { Navigate } from 'react-router-dom';
// import {
//     HeartOutlined,
//     HeartFilled,
//     EditOutlined
//   } from '@ant-design/icons';
// import Navbar from '../Navbar/Navbar';
// import { useDispatch,useSelector } from 'react-redux';
// import { authenticateUser, login, logout, itemSelect } from '../../features/userSlice';
// import noimage from "../../images/noimage.png";

// const { Option } = Select;
// const {Meta} = Card;


// const Cart = () =>{
//     const dispatch = useDispatch();
//    const loguser = useSelector(authenticateUser)
//     const [ns, setns] = useState(false)
//     const [shopdp, setShopdp] = useState(noimage)
//     const [shopname, setshopname] = useState("")
//     const [itemname, setitemname] = useState("")
//     const [salescount, setsalescount] = useState("")
//     const [salesdesc, setsalesdesc] = useState("")
//     const [quantity, setQuantity] = useState(0)
//     const [price, setPrice] = useState("")
//     useEffect(() => {
//       axios.get(process.env.REACT_APP_SERVER + "/fetchCart",{ headers: {"Authorization" : `Bearer ${loguser.token}`}})
//       .then(response => {
//         console.log(response.data)
//       })
//       .catch(function (err) {
//         alert(err)
//         console.log(err)
//       })
      
//   }, []);

//     const additemtocart = (e) =>{
//       console.log(quantity)
//       axios.post(process.env.REACT_APP_SERVER+'/addCart', {'itemid':loguser.itemid,"sellvalue":quantity}, { headers: {"Authorization" : `Bearer ${loguser.token}`} })
//       .then(response=>{
//           alert(response.data)
//       })
//     }
//     const navigateShop = (e) =>{
//       setns(true)
//     }
//     if(ns)
//     {
//       return <Navigate replace to="/shoppdetails"/>
//     }
//     return (
//     <div>
//     <Navbar/>
//     <Row>
//     <Col span= {12}>
//     <img src={shopdp} alt="example" style={{"width":"100%", "height":"80%"}}/>
//     </Col>
//     <Col span = {12}>
//     <div>
//     <h4 onClick={(e)=>navigateShop(e)}><u>{shopname}</u></h4>
//     <h2> <Tooltip title="Set Favorite"><HeartFilled  /></Tooltip> {itemname}</h2>
//     <p>{salesdesc}</p>
//     {/* <h4>Currently in Stock:{salescount}</h4> */}
    
//     <label>Select Quantity: </label>
//     <InputNumber min={0} max={salescount} defaultValue={0}  onChange={(e)=>setQuantity(e)} />
//     <h2>{loguser.dollar} {price}</h2>
//     <Button type="primary" size="large" onClick={(e)=>additemtocart(e)}>Add to Cart</Button>
//     <br/>
//     <br/>
//     <Button type="primary" size="large" onDoubleClick={(e)=>alert("Order Placed. Please refer mypurchase page for more details")}>Proceed to check out</Button>
//     </div>
//     </Col>
//     </Row>
       
//     </div>
//     )
// }
// export default Cart;