import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, shopSelect } from '../../features/userSlice';

function hasSpecialChar(_string)
{
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(spChars.test(_string)){
      return true;
    } else {
      return false;
    }
}

const CheckName = () =>{
    const [shopName, setShopName] = useState("")
    const [successVisibility, setSuccessVisibility] = useState("hidden")
    const [colorVisibility, setColorVisibility] = useState("black")
    const [successMessage, setSuccessMessage] = useState("")
    const [isredirectShop, setredirectShop] = useState(false)
    const [isbuttonDisabled, setButtonDisabled] = useState(true)
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)

    const updateName = (e) =>{
        setShopName(e.target.value)
    }
    const checkNameAvailability = (e) =>{
        e.preventDefault();
        setSuccessVisibility("hidden")
        let data = {
            "shopname":shopName
        }
        axios.post(process.env.REACT_APP_SERVER+'/checkshopname', data, { headers: {"Authorization" : `Bearer ${loguser.token}`}})
        .then(function (response){
            if(!hasSpecialChar(shopName) && shopName.length>=5 && shopName.length<=15)
            {   
                if(response.status==200)
                {
                    dispatch(shopSelect({
                        "token" :loguser.token,
                        "userid":loguser.userid,
                        "username":loguser.username,
                        "isLoggedIn":loguser.isLoggedIn,
                        "shopname":shopName,
                        "email":loguser.email
                    }))
                    setSuccessMessage("Congratulations!"+shopName+" is available to create :)")
                    setColorVisibility("green")
                    setSuccessVisibility("visible")
                    setButtonDisabled(false)
                    // console.log(dd)

                }
            }
            else{
                alert("Entered shopname has not met the requirements")
                setButtonDisabled(true)
            }
        })
        .catch(function (err){
            setSuccessMessage("Sorry! The name '"+shopName+"' has already been taken:(")
            setColorVisibility("red")
            setButtonDisabled(true)
            setSuccessVisibility("visible")
        })  

    }

    const createShopProfile = (e) =>{
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER+'/createshopdetails', {'shopname':shopName},{ headers: {"Authorization" : `Bearer ${loguser.token}`}})
        .then(response=>{
            alert("Shop Profile Creation Successful")
        })
        setredirectShop(true)
    }

    if(isredirectShop)
    {
       return <Navigate replace to="/shopdetails" />;
    }

    return (
        <div>
        <Navbar/>
        <div className="App" style={{marginTop:"10%"}}>
        <Row>
            <Col span={3}></Col>
            <Col span={18}>
                <Card style={{borderColor:'grey'}}>
                    <h1 style={{fontFamily:"sans-serif",color:"#fc835b"}}><b>Name Your Shop</b></h1>
                    <h4>Choose a memorable name that reflects your style</h4>
                    <Input.Group compact>
                    <Input size="large" style={{ width: 'calc(100% - 200px)' }} placeholder='Type your shop name here' onChange= {e=>updateName(e)} />
                    <Button size="large" onClick={(e)=>checkNameAvailability(e)}>Check Availability</Button>
                  </Input.Group>
                  <br/>
                  <p align="center">Requirements: Name should have 5-15 characters with no special characters</p>
                  <br/>
                  <p align="center" style={{color:colorVisibility, visibility:successVisibility}}>{successMessage}</p>
                  <Button size="large" type="primary" shape="round" disabled= {isbuttonDisabled} onClick={(e)=>createShopProfile(e)}>Create Shop Profile</Button>
                </Card>
            </Col>

        </Row>
        </div>
        </div>
        
    )
}

export default CheckName;