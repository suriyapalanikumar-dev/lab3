import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, shopSelect } from '../../features/userSlice';
import {
    HeartOutlined,
    HeartFilled,
    EditOutlined
  } from '@ant-design/icons';

const {Search} = Input;
const Enhancements = () =>{
    return (
        <div>
        <Navbar/>
        <div  style={{marginTop:"2%"}}>
        <h2><b>Bob Holland</b></h2>
        <Button type="primary" icon={<EditOutlined/>}>Edit User</Button>
        <br/><br/>
        <Search placeholder="search.."  style={{ width: 200 }} />
        <Row>
        <Col span={6} style={{paddingLeft:"2%"}}>
        <Card
          hoverable
          style={{ width: "75%", height: "50%" }}
          cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+'1647805276530-decor1.jpg'} />}
          
        >
          <div>
            <Row>
              <Col span={21}>
                <p>
                  <span>Softa Yellow</span>
                  <span style={{ visibility: "hidden" }}>4</span>
                </p>

              </Col>
              <Col span={3}>
                  <HeartFilled /> 
              </Col>
            </Row>
          </div>
          <p><b><span>USD </span><span>20 </span></b></p>
        </Card>
      </Col>

          </Row>
            
        </div>
        </div>
        
    )
}

export default Enhancements;