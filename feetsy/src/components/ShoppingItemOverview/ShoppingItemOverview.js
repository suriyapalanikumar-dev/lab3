import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Card, Input, Button, Select, Tooltip} from 'antd';
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

const { Option } = Select;
const {Meta} = Card;



const ShoppingItemOverview = () =>{
    const loguser = useSelector(authenticateUser)
    const dispatch = useDispatch();
    //const [itemid, setItemid] = useState(loguser.itemid)
    const [imgsrc, setImgSrc] = useState(null)
    const [salescount, setsalescount] = useState(0)
    const [itemname, setitemname] = useState("")
    const [price, setprice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [itemdesc, setitemdesc] = useState("")
    const [shopname, setShopname] = useState("")

    const handleQuantity = (e) =>{
        setsalescount(e.target.value)
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    // useEffect = (()=>{
    //     getItem()
    // })

    // const getItem = () =>{
    //     axios.post(process.env.REACT_APP_SERVER+"/fetchitem",{"itemid":loguser.itemid})
    //     .then(response=>{
    //         let temp = response.data
    //         setImgSrc(process.env.REACT_APP_SERVER+"/image/"+response.data["data"][0]["itemphoto"])
    //         setitemname(temp["data"][0]["itemname"])
    //         setprice(temp["data"][0]["price"])
    //         setsalescount(temp["data"][0]["itemcount"])
    //     })
    // }


    return (
    <div>
    <Navbar/>
    <Row>
    <Col span= {12}>
    <img src={loguser.itemphoto} alt="example" style={{"width":"100%", "height":"80%"}}/>
    </Col>
    <Col span = {12}>
    <div>
    <h4></h4>
    <h2> <Tooltip title="Set Favorite"><HeartOutlined  /></Tooltip> {loguser.itemname} </h2>
    <h4>Sales Count: {loguser.itemcount} </h4>
    <p>{loguser.itemdesc}</p>
    <label>Enter Quantity: </label>
    <Select size="large" defaultValue="0" onChange={handleChange}>
    <Option value="1">1</Option>
    <Option value="2">2</Option>
    <Option value="2">3</Option>
  </Select>
    <h2>{loguser.dollar} {loguser.price}</h2>
    <Button type="primary" size="large">Add to Cart</Button>
    </div>
    </Col>
    </Row>
       
    </div>
    )
}
export default ShoppingItemOverview;