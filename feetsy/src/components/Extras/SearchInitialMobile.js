import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button, Select} from 'antd';
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
const  {Option} = Select;
const SearchInitialMobile = () =>{
    const [isoverview, setOverview] = useState(false)
    if(isoverview && !localStorage.getItem("Set"))
    {
        return <Navigate replace to = "/summaryoverrview"/>
    }
    else{
        return <Navigate replace to = "/oositem"/>
    }
return (
    <div>
    <Navbar/>
    <div  style={{marginTop:"2%"}}>
    <label>Filter:</label>
    <Select size="large" defaultValue="Recommended">
    <Option value="1">Price low to high</Option>
    <Option value="2">Price high to low</Option>
  </Select>
    <Row>
    <Col span={6} style={{paddingLeft:"2%"}}>
    <Card
      hoverable
      style={{ width: "75%", height: "50%" }}
      cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+'1647805935918-electronic2.jpg'} />}
      onClick={(e)=>setOverview(true)}
    >
      <div>
        <Row>
          <Col span={24}>
            <p>
              <span>Mobile Phone</span>
              <span style={{ visibility: "hidden" }}>4</span>
            </p>

          </Col>
        </Row>
      </div>
      <p><b><span>USD </span><span>300 </span></b></p>
    </Card>
  </Col>

      </Row>
        
    </div>
    </div>
    
)
}

export default SearchInitialMobile;