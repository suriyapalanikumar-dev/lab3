import React, {Component, useState, useEffect} from 'react';
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
import noimage from "../../images/noimage.png";

const {Search} = Input;
const SearchPage = () =>{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    const [itemsall, setItemsAll] = useState([])
    const [srcdp, setSrcdp] = useState(noimage)
    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER + "/searchResults",{"value":loguser.search} )
        .then(response => {
          //console.log(response.data)
          if(response.data.length>0)
          {
            setItemsAll(response.data)
          }
          else{
            alert("No Search Results")
          }
          
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
        
    }, []);

    const makeFavorite = (e) =>{
      if(!loguser)
      {
        alert("Please log in to make favorites")
      }
      else{
        //console.log(loguser.token)
        axios.post(process.env.REACT_APP_SERVER + "/makeFavorite",{"itemid":e},{headers: {"Authorization" : `Bearer ${loguser.token}`} })
        .then(response => {
          alert("Marked as Favorite")
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
      }
    }
    return (
        <div>
        <Navbar/>
        <div  style={{marginTop:"2%"}}>
        <br/>
        <h2><b>Results</b></h2>
        {/* <Search placeholder="search.."  style={{ width: 200 }} /> */}
        <div style={{ marginTop: "2%", width: "100%", height: "50%", float: "left", paddingLeft:"2px" }}>
          {/* <h2><b> Collection Preview</b></h2> */}

          <Row>
            {itemsall.map((element) => <Col span={6} style={{paddingLeft:"2%"}}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+element.itemphoto} />}
                
              >
                <div>
                  <Row>
                    <Col span={21}>
                      <p align="center" style={{fontSize:"15px"}}><b>{element.itemname}</b></p>
                
                      <p style={{ visibility: "hidden" }}>{element._id}</p>

                    </Col>
                    <Col span={3}>
                      {
                        <HeartOutlined onClick={(e)=>makeFavorite(element._id)}  />
                      }
                    </Col>
                  </Row>
                </div>
                <p><b><span>{loguser.dollar}</span><span> {element.price} </span></b></p>
              </Card>
            </Col>)}
          </Row>
          </div>
        </div>
        </div>
        
    )
}

export default SearchPage;