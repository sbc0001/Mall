import React, {useState,useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Container, Row, Col, Button} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Business from './pages/Business';
import Esg from './pages/Esg';
import Company from './pages/Company';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
/* import logoImg from './logo.jpg'; */

const TopBox=styled.div`display:flex; justify-content:space-between; align-item:center; margin-bottom:20px; margin-top:10px;`;

function App() {
  let navigate=useNavigate();
  let [newPdt, setNewPdt]=useState([]);
  let [once,setOnes]=useState(false);
  let [cartItems,setCartItems]=useState([]);

  const addToCart=(item)=>{
    setCartItems([...cartItems,item]);
  }

  const removeFromCart=(id)=>{
    setCartItems(cartItems.filter(item=>item.id!==id));
  }

  useEffect(()=>{
    const fetchDate=async()=>{
      try{
        const response=await axios.get('/data.json');
        setNewPdt(response.data);
      }catch(error){
        console.error('Error fetching data : ', error);
      }
    };
    fetchDate();
  },[]);
  
  return (
    <div className="App">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand className="logo" onClick={()=>navigate('/')}>
            {/* <img src={logoImg}/> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav"/>
          <Navbar.Collapse id="navbar-nav">
            <Nav>
              <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
              <NavDropdown title="Company" id="nav-dropdown">
                <NavDropdown.Item onClick={()=>navigate('/company')}>INTRODUCTION</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>navigate('/company/business')}>BUSINESS AREA</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>navigate('/company/esg')}>ESG</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={()=>navigate('/cart')}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        <Routes>
          <Route path="/" element={<Main newPdt={newPdt} setNewPdt={setNewPdt} once={once} setOnes={setOnes}/>}/>
          <Route path="/company" element={<Company/>}>
          <Route path="business" element={<Business/>}/>
          <Route path="esg" element={<Esg/>}/>
          </Route>
        <Route path="/detail/:id" element={<Detail newPdt={newPdt} addToCart={addToCart}/>}/>
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart}/>}/>
        </Routes>

    </div>
  );
}
function Main({newPdt, setNewPdt, setOnes, once}){
  return(
    <section>
      <div className="main-visual">
        <img src="/img/1672995210793.jpg" width="100%" alt=""/>
      </div>
      <Container>
        <TopBox>
          <h3> 이번 주 신상품 </h3>
          <Button variant="default" onClick={()=>{
            if(!once){
              axios.get('/newData.json')
                .then((result)=>{
                  let copyData=[...newPdt,...result.data];
                  setNewPdt(copyData);
                  setOnes(true);
                })
                .catch((error)=>{
                  console.error('Error more products : ', error);
                })
            }
          }}>
            더보기
          </Button>
        </TopBox>
        <Row>
          {
            newPdt.map((item, idx)=>(
              <ColMd contents={item} key={idx}/>
            ))
          }
        </Row>
      </Container>
    </section>
  );
}
function ColMd({contents}){
  let navigate=useNavigate();
  return(
    <Col md={3}>
      <img src={`/img/${contents.src}`} width="90%" alt="" onClick={()=>navigate(`/detail/${contents.id}`)}/>
      <h4>{contents.title}</h4>
      <p>{contents.text}</p>
      <p>{contents.price}</p>
    </Col>
  );
}
export default App;
