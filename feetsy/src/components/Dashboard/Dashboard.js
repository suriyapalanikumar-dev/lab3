import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Card, Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import axios, { post } from 'axios';
import { Navigate } from 'react-router-dom';
import art from '../../images/art.jpg';
import homedecor from '../../images/homedecor.jpg';
import clothing from '../../images/clothing.jpg';
import entertainment from '../../images/entertainment.jpg';
import jewellery from '../../images/jewellery.jpg';
import {
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';
import Navbar from "../Navbar/Navbar";
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, dollarSelect,itemSelect, dollarInitial,itemCOnsidered } from '../../features/userSlice';

const { Meta } = Card;
const {Option} = Select;

const Dashboard = () => {
  const [categorySelected, setcategory] = useState("Art")
  const [card1name, setCard1name] = useState("")
  const [card1price, setCard1price] = useState("")
  const [card1Image, setCard1Image] = useState(null)
  const [card1id, setCard1Id] = useState("")
  const [isFavorite, setisFavorite] = useState(false)
  const [isnavigateOverview, setNavigateOverview] = useState(false)
  const [itemdetails, setItemDetails] = useState(null)
  const [itemlist, setItemList] = useState([])
  const [money, setMoney] = useState("USD")
  const dispatch = useDispatch();
  const loguser = useSelector(authenticateUser)
  
  // useEffect = (() =>{
  //   getItemDetails({"category":categorySelected});
  // })
  useEffect(() => {

    getItemDetails();
  }, []);

  const handleChange = (value) =>{
    if(!loguser)
    {
      alert("Please login before changing Currency")
    }
    else{
      let data = {
        "username" : loguser.username,
        "userid" : loguser.userid,
        "token":loguser.token,
        "isLoggedIn":loguser.isLoggedIn,
        "email":loguser.email,
        "dollar":value
      }
      setMoney(value)
      dispatch(dollarSelect(
        data
      ))
    }

    //setMoney(value)
  }
  const getItemDetails = () => {
    let data;
    if(loguser)
    {
      let data = {
        "username" : loguser.username,
        "userid" : loguser.userid,
        "token":loguser.token,
        "isLoggedIn":loguser.isLoggedIn,
        "email":loguser.email,
        "dollar":money
      }
      dispatch(dollarSelect(data))
    }
    else{
      let data = {
        "dollar":money
      }
      dispatch(dollarInitial(data))
    }
    axios.get(process.env.REACT_APP_SERVER + "/displayItems")
      .then(response => {
        console.log(loguser)
        let data = {
          "dollar":money
        }
        //dispatch(dollarSelect(data))
        setItemList(response.data)
      })
      .catch(function (err) {
        alert(err)
        console.log(err)
      })
  }

  const setFavorite = (data) => {
    // axios.post(process.env.REACT_APP_SERVER + "/makefavorite", { "itemid": data, "userid": localStorage.getItem("userid") })
    //   .then(response => {
    //     if (response.status == 200) {
    //       setisFavorite(true)
    //     }
    //   })
    alert("Favorite Set")
  }

  const retrieveImages = (e) => {
    let data = {}
    if (String(e.target.src).includes("art")) {
      data["category"] = "Art"
    }
    if (String(e.target.src).includes("cloth")) {
      data["category"] = "Clothing"
    }
    if (String(e.target.src).includes("jewellery")) {
      data["category"] = "Jewellery"
    }
    if (String(e.target.src).includes("entertainment")) {
      data["category"] = "Entertainment"
    }
    if (String(e.target.src).includes("home")) {
      data["category"] = "Home Decor"
    }
    //alert(data["category"])
    getItemDetails(data)

  }

  const navigateOverview = (cardid) => {
    let d= ""
    if(!loguser.dollar)
    {
      d = "USD"
    }
    else{
      d = loguser.dollar
    }

    let data = {
      "username" : loguser.username,
      "userid" : loguser.userid,
      "token":loguser.token,
      "email":loguser.email,
      "isLoggedIn":loguser.isLoggedIn,
      "dollar":d
    }
    data["itemid"] = cardid
    // dispatch(
    //   itemSelect(data)
    // )
    for (var i=0;i<itemdetails.length;i++)
    {
      if(itemdetails[i]["itemid"]==cardid)
      {
        data["itemname"] = itemdetails[i]["itemname"]
        data["price"] = itemdetails[i]["price"]
        data["shopname"] = itemdetails[i]["shopname"]
        data["itemphoto"] = process.env.REACT_APP_SERVER+"/image/"+itemdetails[i]["itemphoto"]
        data["itemcount"] = itemdetails[i]["itemcount"]
        data["itemdesc"]= itemdetails[i]["itemdesc"]
      }
          dispatch(
        itemSelect(data)
      )
    }
      setNavigateOverview(true)
  }

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

  const displayItemdetails = (e)=>{
    let data = {
      "username" : loguser.username,
      "userid" : loguser.userid,
      "token":loguser.token,
      "email":loguser.email,
      "isLoggedIn":loguser.isLoggedIn,
      "dollar":loguser.dollar,
      "itemid" : e
    }
    dispatch(
        itemSelect(data)
      )

    setNavigateOverview(true)
  }

  if (isnavigateOverview) {
    return <Navigate replace to="/summaryoverview" />
  }


  return (
    <div>
    <Navbar/>
      <div style={{  width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "50%", float: "left", background: "#ffdbaa" }}>
          <h2><b>Category Preview</b></h2>
          <Row style={{ paddingLeft: "2%" }}>
            <Col span={2}></Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={art} style={{borderRadius:"100px"}}/>}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Art" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={clothing} style={{borderRadius:"100px"}}/>}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Clothing" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={jewellery} style={{borderRadius:"100px"}}/>}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Jewellery" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={entertainment} style={{borderRadius:"100px"}} />}
                onClick={(e) => retrieveImages(e)}
              >
              <Meta title="Entertainment" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%", borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={homedecor} style={{borderRadius:"100px"}} />}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Home Decor" />
              </Card>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
        <div style={{ marginTop: "2%", width: "100%", height: "50%", float: "left", paddingLeft:"2px" }}>
          <h2><b> Collection Preview</b></h2>
          <Row>
            {itemlist.map((element) => <Col span={6} style={{paddingLeft:"2%"}}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+element.itemphoto} onClick = {(e)=>displayItemdetails(element._id)}/>}
              >
                <div>
                  <Row>
                    <Col span={21}>
                      <p align="center" style={{fontSize:"15px"}}><b>{element.itemname}</b></p>
                      {/* <p style={{ visibility: "hidden" }}>{element._id}</p> */}
                      <p style={{ visibility: "hidden" }}>{element._id}</p>

                    </Col>
                    <Col span={3}>
                      {
                        element.isFavorite=='yes' ? <HeartFilled  /> : <HeartOutlined  onClick={(e)=>makeFavorite(element._id)}  />
                      }
                    </Col>
                  </Row>
                </div>
                <p><b><span>{money}</span><span> {element.price} </span></b></p>
              </Card>
            </Col>)}
          </Row>
          {/* <Row>
            <Col span={6} style={{paddingLeft:"2%"}}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+'1647805161678-art1.jpg'} onClick={(e) => navigateOverview(2)}/>}
                
              >
                <div>
                  <Row>
                    <Col span={21}>
                      <p>
                        <span>Art Lamp 1</span>
                        <span style={{ visibility: "hidden" }}>2</span>
                      </p>

                    </Col>
                    <Col span={3}>
                      {
                        isFavorite ? <HeartFilled /> : <HeartOutlined onClick={(e) => setFavorite(2)} />
                      }
                    </Col>
                  </Row>
                </div>
                <p><b><span>USD </span><span>15 </span></b></p>
              </Card>
            </Col>
            <Col span={6} style={{paddingLeft:"2%"}}>
            <Card
              hoverable
              style={{ width: "75%", height: "50%" }}
              cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+'1647805223561-art2.jpg'} onClick={(e) => navigateOverview(3)}/>}
    
            >
              <div>
                <Row>
                  <Col span={21}>
                    <p>
                      <span>Art Lamp 2</span>
                      <span style={{ visibility: "hidden" }}>3</span>
                    </p>

                  </Col>
                  <Col span={3}>
                    {
                      isFavorite ? <HeartFilled /> : <HeartOutlined onClick={(e) => setFavorite(3)} />
                    }
                  </Col>
                </Row>
              </div>
              <p><b><span>USD </span><span>7.49 </span></b></p>
            </Card>
          </Col>
          <Col span={6} style={{paddingLeft:"2%"}}>
          <Card
            hoverable
            style={{ width: "75%", height: "50%" }}
            cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+'1647805657444-decor2.jpg'} onClick={(e) => navigateOverview(5)}/>}
            
          >
            <div>
              <Row>
                <Col span={21}>
                  <p>
                    <span>Wall Stand</span>
                    <span style={{ visibility: "hidden" }}>5</span>
                  </p>

                </Col>
                <Col span={3}>
                  {
                    isFavorite ? <HeartFilled /> : <HeartOutlined onClick={(e) => setFavorite(5)} />
                  }
                </Col>
              </Row>
            </div>
            <p><b><span>USD </span><span>25 </span></b></p>
          </Card>
        </Col>
        <Col span={6} style={{paddingLeft:"2%"}}>
        <Card
          hoverable
          style={{ width: "75%", height: "50%" }}
          cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+'1647805276530-decor1.jpg'} onClick={(e) => navigateOverview(4)}/>}
          
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
                {
                  isFavorite ? <HeartFilled /> : <HeartOutlined onClick={(e) => setFavorite(4)} />
                }
              </Col>
            </Row>
          </div>
          <p><b><span>USD </span><span>20 </span></b></p>
        </Card>
      </Col>

          </Row> */}
          
        </div>
      </div>
      <div style={{
        height: "50px",
        marginTop: "90%",
        backgroundColor:"blue",
    color:"white",
    padding:"0%"}}>
        <Row>
        <Col span={3}>
        <h4 style={{color:"white", padding:"3%"}}><b><span>United States | English(US)</span></b></h4>
        </Col>
        <Col span = {3}>
        <Select defaultValue="USD" style={{ width: 120, padding:"3%" }} onChange={handleChange}>
        <Option value="USD">USD</Option>
      <Option value="GBP">GBP</Option>
      <Option value="INR">INR</Option>
    </Select>
        </Col>
        </Row>
    </div>
    </div>

  )
}
export default Dashboard;