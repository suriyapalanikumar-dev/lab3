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


const SearchOverview = () =>{
    const [ns, setns] = useState(false)
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
    <img src={process.env.REACT_APP_SERVER+"/image/"+'1647810590397-Party.jpg'} alt="example" style={{"width":"100%", "height":"80%"}}/>
    </Col>
    <Col span = {12}>
    <div>
    <h4 onClick={(e)=>navigateShop(e)}>BobsShop</h4>
    <h2> <Tooltip title="Set Favorite"><HeartOutlined  /></Tooltip> Glass Photo Frame</h2>
    <h4>Sales Count: 0</h4>
    <p>Glass Photo Frame</p>
    <label>Enter Quantity: </label>
    <Select size="large" defaultValue="0">
    <Option value="1">1</Option>
    <Option value="2">2</Option>
    <Option value="2">3</Option>
  </Select>
    <h2>USD 10.99</h2>
    <Button type="primary" size="large" onClick={(e)=>alert("Added to Cart")}>Add to Cart</Button>
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