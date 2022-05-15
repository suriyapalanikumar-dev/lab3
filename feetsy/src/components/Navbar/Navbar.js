import React, {Component, useState} from 'react';
import '../../App.css';
import { Row, Col,  Input, Button, Modal, Tooltip, Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import '../../css/custom.css';
import Login from '../Login/Login.js';
import {
    ShoppingCartOutlined, HeartOutlined, ShopOutlined, LoginOutlined, UserOutlined, RightSquareFilled
  } from '@ant-design/icons';

import {Navigate} from 'react-router-dom'; 
import { useDispatch,useSelector } from 'react-redux';
import { authenticateUser, login, logout, searchCriteria } from '../../features/userSlice';
const { Search } = Input;

const Navbar  = () =>
{
    const [modal2Visible, setModal2Visible] = useState(false)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [isSellEnabled, setSellEnabled] = useState(false)
    const [isFavoriteEnabled, setisFavoritenabled] = useState(false)
    const [isCartEnabled, setCartEnabled] = useState(false)
    const [isLoggedOut, setLogout] = useState(false)
    const [isFrame, setisFrame] = useState(false)
    const [isProfilePage, setProfilePage] = useState(false)
    const [isReturn,setReturn] = useState(false)
    const [myPurchase, setPurchasePage] =useState(false)
    const loguser = useSelector(authenticateUser)
    const dispatch = useDispatch();
    
    const setPanel = () =>{
        setModal2Visible(false)
        if(loguser)
        {
            setisLoggedIn(true)
        }

        
    }

    const sellroute = (e) =>{
        setSellEnabled(true)
    }

    const favoriteroute = (e) =>{
        setisFavoritenabled(true)
    }

    const cartroute = (e) =>{
        setCartEnabled(true)
    }

    const logroute = (e) =>{
        setLogout(true)
    }
    if(isSellEnabled)
    {
        return <Navigate replace to="/sell" />
    }

    if(isFavoriteEnabled)
    {
        return <Navigate replace to="/favorites" />
    }

    if(isCartEnabled)
    {
        return <Navigate replace to="/cart"/>
    }
    if(isReturn)
    {
        return <Navigate replace to="/dashboard"/>
    }

    const logoutUser = () =>{
        dispatch(logout({
            User:null
        }))
        setisLoggedIn(false)
        //setReturn(true)
    }

    const previewOverview = (value) =>{
        //alert(value)
        let data = {
            "username" : loguser.username,
            "userid" : loguser.userid,
            "token":loguser.token,
            "isLoggedIn":loguser.isLoggedIn,
            "email":loguser.email,
            "dollar":loguser.dollar,
            "search":value
          }
        dispatch(searchCriteria(
            data
        ))
        setisFrame(true)
    }

    if(isFrame)
    {
        return <Navigate replace to="/searchoverview"/>
    }
    // if(isFrame=="Mobile")
    // {
    //     return <Navigate replace to="/searchoverrview"/>
    // }


    if(isProfilePage)
    {
        return <Navigate replace to="/profile"/>
    }

    if(myPurchase)
    {
        return <Navigate replace to="/purchase"/>
    }

    const menu = (
        
        <Menu>
          <Menu.Item>
            <p>Welcome {loguser?loguser.username:null}</p>
          </Menu.Item>
          <Menu.Item>
            <p onClick={(e)=>setProfilePage(true)}>Edit User Profile</p>
          </Menu.Item>
          <Menu.Item>
          <p onClick={(e)=>setPurchasePage(true)}>My Purchases</p>
        </Menu.Item>
          <Menu.Item>
            <Button size="large" onClick={(e)=>logoutUser(e)}>Log Out</Button>
          </Menu.Item>
          
        </Menu>
      );

    return (
        <div className="navf">
            <Row>
                <Col span={3}>
                    <span className="appname" onClick={(e)=>setReturn(true)}>Etsy</span>
                </Col>
                <Col span={18}>
                <Search size="large" placeholder="Search Anything" onSearch={(value)=>previewOverview(value)}  />
                </Col>

                <Col span={3}>
                    
                        {(!loguser || !loguser.isLoggedIn )  ?
                            <Row>
                            <Col span={24} style={{padding:"0px"}}>
                            <Tooltip title="Sign In">
                                <Button type="dashed" className="signin" onClick={() => setModal2Visible(true)}>Sign In</Button>
                            </Tooltip>
                            </Col>
                            </Row>
                            :
                            <Row>
                            <Col span={6} style={{padding:"0px"}}>
                            <Tooltip title="Favorite">
                                <Button icon={<HeartOutlined />} size="large" onClick={(e) =>favoriteroute(e)} />
                            </Tooltip>
                            </Col>
                            <Col span={6} style={{paddingRight:"0px"}}> 
                            <Tooltip title="Sell Items">
                                <Button icon={<ShopOutlined />} size="large" onClick={(e) =>sellroute(e)}/>
                            </Tooltip> 
                            </Col>
                            <Col span={6} style={{padding:"0px"}}>
                            <Tooltip title="Cart">
                                <Button icon={<ShoppingCartOutlined />} size="large"onClick={(e) =>cartroute(e)}  />
                            </Tooltip>
                            </Col>
                            <Col span={6} style={{padding:"0px"}}>
                           
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <Button icon={<UserOutlined />} size="large" onClick={(e) =>logroute(e)} />
                            </Dropdown>
                            </Col>
                        </Row>
                        }
                </Col>
            </Row>
            <Modal
                visible={modal2Visible}
                onOk={() => setPanel()}
                onCancel={() => setPanel()}
                >
                    <Login/>
            </Modal>
        </div>            
    )

}

export default Navbar;
