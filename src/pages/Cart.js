import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Cart({cartItems, removeFromCart}) {
    const totalPrice=cartItems.reduce((acc,item)=>acc+Number(item.price.replace(/[^0-9]/g,'')), 0);
    const priceString=totalPrice.toLocaleString();
    // Array.reduce((누적값, 배열요소)->{실행코드}, 누적초기값) --> 배열 요소 결과 누적
    return (
    <Container>
        <h2>장바구니</h2>
        <Row>
        {
            cartItems.length === 0 ? (
                <Col><p>장바구니가 비어있습니다.</p></Col>
            ):(
                cartItems.map((item,idx)=>(
                    <Col md={3} key={idx} className="mb=4">
                        <img src={`/img/${item.src}`} width="50%" alt=""/>
                        <h4>{item.title}</h4>
                        <p>{item.price}</p>
                        <Button variant="secondary" onClick={()=>{removeFromCart(item.id)}}>목록 삭제</Button>
                    </Col>
                ))
            )
        }
        </Row>
        <h4>총합 : {priceString}원</h4>
    </Container>
    );
}

export default Cart;
