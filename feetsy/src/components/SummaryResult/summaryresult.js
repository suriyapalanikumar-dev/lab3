import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Card, Input, Button, Select, Tooltip, InputNumber} from 'antd';
import 'antd/dist/antd.css';
import axios,{post} from 'axios';
import { Navigate } from 'react-router-dom';
import {
    HeartOutlined,
    HeartFilled,
    EditOutlined
  } from '@ant-design/icons';
import Navbar from '../Navbar/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { authenticateUser, login, logout, itemSelect } from '../../features/userSlice';
import noimage from "../../images/noimage.png";

const { Option } = Select;
const {Meta} = Card;


const SearchOverview = () =>{
    const dispatch = useDispatch();
   const loguser = useSelector(authenticateUser)
    const [ns, setns] = useState(false)
    const [shopdp, setShopdp] = useState(noimage)
    const [shopname, setshopname] = useState("")
    const [itemname, setitemname] = useState("")
    const [salescount, setsalescount] = useState("")
    const [salesdesc, setsalesdesc] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState("")
    useEffect(() => {
      axios.post(process.env.REACT_APP_SERVER + "/summaryItem",{"itemid":loguser.itemid})
      .then(response => {
        console.log(response.data)
        setShopdp(process.env.REACT_APP_SERVER + "/image/"+response.data["itemphoto"])
        setshopname(response.data.shopname)
        setitemname(response.data.itemname)
        setsalescount(response.data.itemcount)
        setsalesdesc(response.data.itemdesc)
        setPrice(response.data.price)
      })
      .catch(function (err) {
        alert(err)
        console.log(err)
      })
      
  }, []);

    const additemtocart = (e) =>{
      console.log(quantity)
      axios.post(process.env.REACT_APP_SERVER+'/addCart', {'itemid':loguser.itemid,"sellvalue":quantity}, { headers: {"Authorization" : `Bearer ${loguser.token}`} })
      .then(response=>{
          alert(response.data)
      })
    }
    const navigateShop = (e) =>{
      setns(true)
    }
    if(ns)
    {
      return <Navigate replace to="/shoppdetails"/>
    }
    return (
    <div>
    <Navbar/>
    <Row>
    <Col span= {12}>
    <img src={shopdp} alt="example" style={{"width":"100%", "height":"80%"}}/>
    </Col>
    <Col span = {12}>
    <div>
    <h4 onClick={(e)=>navigateShop(e)}><u>{shopname}</u></h4>
    <h2> <Tooltip title="Set Favorite"><HeartFilled  /></Tooltip> {itemname}</h2>
    <p>{salesdesc}</p>
    {/* <h4>Currently in Stock:{salescount}</h4> */}
    
    <label>Select Quantity: </label>
    <InputNumber min={0} max={salescount} defaultValue={0}  onChange={(e)=>setQuantity(e)} />
    <h2>{loguser.dollar} {price}</h2>
    <Button type="primary" size="large" onClick={(e)=>additemtocart(e)}>Add to Cart</Button>
    <br/>
    <br/>
    <Button type="primary" size="large" onDoubleClick={(e)=>alert("Order Placed. Please refer mypurchase page for more details")}>Proceed to check out</Button>
    </div>
    </Col>
    </Row>
    
    </div>
    )
}
export default SearchOverview;