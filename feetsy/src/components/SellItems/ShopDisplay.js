import React, {Component, useEffect, useState} from 'react';
import {Row, Col, Card, Input, Button, Modal} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    ShopOutlined, EditOutlined, FileAddOutlined, UnorderedListOutlined
  } from '@ant-design/icons';
import ShopProfilePicture from './ShopProfilePicture';
import ItemDisplay from './ItemDisplay';
import ItemDisplayAdmin from './ItemDisplayadmin';
import ItemEnrollment from './ItemEnrollment';
import ItemUpdate from './ItemUpdate';
import noimage from "../../images/noimage.png";
import shopi from "../../images/shop1.jpg";
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, shopSelect, shopDisplay } from '../../features/userSlice';
import Navbar  from '../Navbar/Navbar';
import { useTable } from 'react-table';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";

const {Meta} = Card;

const ShopDisplay = () =>{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    const [modal3Visible, setmodal3Visible] = useState(false)
    const [modal4Visible, setmodal4Visible] = useState(false)
    const [modal5Visible, setmodal5Visible] = useState(false)
    const [shopdp, setshopdp] = useState(noimage)
    const [shopname, setShopName] = useState(loguser.shopname)
    const [ownername, setOwnerName] = useState("")
    const [owneremail, setownerEmail] = useState("")
    const [isOwner, setOwner] = useState(false)
    const [isClick, setisClick] = useState("hidden")

    const columns = [{  
        Header: 'Name',  
        accessor: 'Name'  
        },{  
        Header: 'Category',  
        accessor: 'Category'  
        },
        {
        Header: 'Price',  
        accessor: 'Price' 
        },
        {
        Header: 'Sold',  
        accessor: 'Sold',
        show:false  
        }]

    useEffect(() => {
        let data={
            "shopname" : loguser.shopname
        }
        axios.post(process.env.REACT_APP_SERVER+"/displayshopdetails",data,{ headers: {"Authorization" : `Bearer ${loguser.token}`}})
        .then(response=>{
            // dispatch(shopSelect({
            //     "token" :loguser.token,
            //     "username":loguser.username,
            //     "shopname":loguser.shopName,
            //     "email":loguser.email,
            //     "isOwner":response["data"]["isOwner"]
            // }))
            //console.log(response)
            setOwnerName(loguser["username"])
            setownerEmail(loguser["email"])
            setOwner(response["data"]["isOwner"])
            if(response["data"]["shop"]["shopphoto"]!="")
            {
                
                setshopdp(process.env.REACT_APP_SERVER+"/image/"+response["data"]["shop"]["shopphoto"])
            }
        })
        .catch(function (err){
            //alert(err)
            console.log(err)})
    });
    const handleUpload = (e) =>{
        e.preventDefault();
        let data = {"shopname":loguser["shopname"]}
        //setshopdp(shopi)
        setmodal3Visible(false)
    }

    const addItems = () =>{
        setmodal4Visible(false)
    }

    const updateItems = () =>{
        setmodal5Visible(false)
    }

    const addItem = (e) =>{
        e.preventDefault();
        setmodal4Visible(true)
    }

    const editItem = (e) =>{
        e.preventDefault();
        setmodal5Visible(true)
    }
    return (
        <div >
        <Navbar/>
        <div style={{margin:"3%", borderColor:"black", borderStyle:"solid"}}>
        <Row style={{marginLeft:"2%"}}>
            <Col span = {3}>
            <div >
        {/*  <ShopOutlined style={{fontSize:"500%"}}/>
    <h2><b>{shopname}</b></h2>*/}
            <Card
            hoverable
            onClick={(e) =>setmodal3Visible(true)}
            style={{ width: 150}}
            cover={<img alt="example" src={shopdp} />}
        >
            <Meta title={shopname} />
        </Card>
            </div>
            </Col>
            <Col span={9}>
           {/* <div style={{padding:"1%"}}>
            <Button type="primary"  onClick={(e) =>setmodal3Visible(true)} icon={<EditOutlined /> } >Edit Shop</Button>
</div> */}
            <div style={{padding:"1%"}}>
            <Button type="primary" icon={<FileAddOutlined />} onClick={(e)=>addItem(e)} disabled={!isOwner}> Add Item </Button>
            </div>
            <div style={{padding:"1%"}}>
            <Button type="primary" icon={<EditOutlined />} onClick={(e)=>editItem(e)} disabled={!isOwner}> Edit Item </Button>
            </div>
            <div style={{padding:"1%"}}>
            <Button type="primary" icon={<UnorderedListOutlined />} onClick={(e)=>setisClick("visible")}> View Item Listing </Button>
            </div>
            </Col>
            <Col span={6}>
            </Col>
            <Col span={6}>
            <h2>Owner Details</h2>
            <p>Name:<span>{ownername}</span></p>
            <p>Contact Email: <span>{owneremail}</span></p>
            </Col>
        </Row>
        <div style={{visibility:isClick}}>
        <p>Item Listing:</p>
        {/* <ItemDisplayAdmin/> */}
        <ReactTable  
            columns={columns}  
            defaultPageSize = {2}  
            pageSizeOptions = {[2,4, 6]}  
        /> 
        </div>
        <Modal
        visible={modal3Visible}
        onOk = {handleUpload}
        onCancel = {handleUpload}
        footer={null}
        >
            <ShopProfilePicture/>
        </Modal>

        <Modal
        visible={modal4Visible}
        onOk = {addItems}
        onCancel = {addItems}
        footer={null}
        >
            <ItemEnrollment/>
        </Modal>
        <Modal
        visible={modal5Visible}
        onOk = {updateItems}
        onCancel = {updateItems}
        footer={null}
        >
            <ItemUpdate/>
        </Modal>
        </div>
        </div>
    )
}

export default ShopDisplay;

