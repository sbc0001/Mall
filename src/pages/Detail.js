import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";


function Detail({newPdt, addToCart}) {
    let navigate=useNavigate();
    let {id}=useParams();
    let numId=parseInt(id)-1; // 문자열 인식 가능 -- 숫자타입 변환
    const product=newPdt[numId];
    if(isNaN(numId) || numId<0 || numId>=newPdt.length){
        return<div>해당상품이 존재하지 않습니다.</div>;
    }
    return (
    <Container>
        <div>
            <img src={`/img/${product.src}`} alt="" />
            <h3>{product.title}</h3>
            <p>설명 : {product.text}</p>
            <p>가격 : {product.price}</p>
            <Button variant='danger' onClick={()=>{addToCart(product);}}>장바구니 담기</Button>
            <Button variant='primary' onClick={()=>{navigate('/cart')}}>장바구니 바로가기</Button>
        </div>
    </Container>
    );
}

export default Detail;
