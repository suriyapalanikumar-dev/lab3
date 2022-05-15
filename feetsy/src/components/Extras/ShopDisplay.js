import React, {Component, useEffect, useState} from 'react';
import {Row, Col, Card, Input, Button, Modal} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    ShopOutlined, EditOutlined, FileAddOutlined, UnorderedListOutlined
  } from '@ant-design/icons';

import ItemUpdate from '../SellItems/ItemUpdate';

import Navbar  from '../Navbar/Navbar';


const {Meta} = Card;

const ShoppDisplay = () =>{
    const [modal5Visible, setmodal5Visible] = useState(false)
    const editItem = (e) =>{
        e.preventDefault();
        setmodal5Visible(true)
    }

    const updateItems = () =>{
        setmodal5Visible(false)
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
            style={{ width: 150}}
            cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+'1647810039479-shop1.jpg'} />}
        >
            <Meta title="BobsShop" />
        </Card>
            </div>
            </Col>
            <Col span={9}>
           {/* <div style={{padding:"1%"}}>
            <Button type="primary"  onClick={(e) =>setmodal3Visible(true)} icon={<EditOutlined /> } >Edit Shop</Button>
</div> */}
            <div style={{padding:"1%"}}>
            <Button type="primary" icon={<FileAddOutlined />}  > Add Item </Button>
            </div>
            <div style={{padding:"1%"}}>
            <Button type="primary" icon={<EditOutlined />} onClick={(e)=>editItem(e)} > Edit Item </Button>
            </div>
            <div style={{padding:"1%"}}>
            <Button type="primary" icon={<UnorderedListOutlined />} > View Item Listing </Button>
            </div>
            </Col>
            <Col span={6}>
            </Col>
            <Col span={6}>
            <h2>Owner Details</h2>
            <p>Name:<span>Bob Holland</span></p>
            <p>Contact Email: <span>bob.holland@gmail.com</span></p>
            </Col>
        </Row>

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

export default ShoppDisplay;

