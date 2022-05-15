import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Card, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { authenticateUser, login, logout, shopSelect, shopImg } from '../../features/userSlice';

const { Option } = Select;
const ItemUpdate = () =>{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    const [ddvalues, setddvalues] = useState(null)
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState(null)
    const [quantity, setquantity] = useState(null)
    const [iname, setiname] = useState(null)
    // useEffect(() => {
    //     axios.get(process.env.REACT_APP_SERVER+"/getuniqueItems/"+loguser.shopname)
    //     .then(response=>{
    //         setddvalues(response.data)
    //     })
    //     .catch(function (err){
    //         //alert(err)
    //         console.log(err)})
    // });
    const updateItem =(e) =>{
        let data = {
            "itemname" : iname,
            "itemdesc":desc,
            "price":price,
            "itemcount": quantity,
        }
        console.log(data)
        axios.post(process.env.REACT_APP_SERVER+'/editItem', data)
        .then(response=>{
           alert("Item details has been updated")
        })
    }

    return (
        <div>
            <h4><b>Update Item</b></h4>
            <label>Enter the item name to be edited:</label>
            <Input size="large" placeholder="Enter Item Name" onChange={(e)=>setiname(e.target.value)}/>
            <br/>
            <br/>
            <label>Edit Quantity Available</label>
            <Input size="large" placeholder="Enter quantity" onChange={(e)=>setquantity(e.target.value)}/>
            <br/>
            <br/>
            <label>Edit Price</label>
            <Input size="large" placeholder="Enter Price" onChange={(e)=>setPrice(e.target.value)}/>
            <br/>
            <br/>
            <label>Edit Description</label>
            <Input size="large" placeholder="Enter description" onChange={(e)=>setDesc(e.target.value)}/>
            <br/>
            <br/>
            <Button type="primary" size="large" onClick={(e)=>updateItem(e)}>Update Details</Button>
        </div>
    )
}

export default ItemUpdate;