import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async ()=>{
      const {data} = await axios.get(`/api/products/${id}`)
      setProduct(data); 
    }
      fetchProducts();
   
  },[id]);
    
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go back</Link>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name}></Image>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>{product.name}</h2>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating}text={`${product.rating} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>
                    Price: ${product.price}
                </ListGroupItem>
                <ListGroupItem>
                    Description: {product.description}
                </ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                <ListGroupItem>
                    <Row>
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>Status:</Col>
                        <Col>{product.countInStock>0 ? 'In stock': 'Out of stock'}</Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Button className='w-100' type='button' disabled={product.countInStock===0}>Add to cart</Button>
                </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default ProductScreen