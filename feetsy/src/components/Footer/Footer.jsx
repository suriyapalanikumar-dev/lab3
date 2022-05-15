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
  const { Option } = Select;

const {Meta} = Card;



const Footer = () =>{
    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    return (
    <div style={{
        height: "50px",
        marginTop: "100%",
        backgroundColor:"blue",
    color:"white",
    padding:"0%"}}>
        <Row>
        <Col span={3}>
        <h4 style={{color:"white", padding:"3%"}}><b><span>United States | English(US)</span></b></h4>
        </Col>
        <Col span = {3}>
        <Select defaultValue="USD" style={{ width: 120, padding:"3%" }} onChange={handleChange}>
      <Option value="GBP">GBP</Option>
      <Option value="INR">INR</Option>
    </Select>
        </Col>
        </Row>
    </div>
    )
}
export default Footer;