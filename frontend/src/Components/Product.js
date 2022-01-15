import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/shop/${product._id}`}>
                <div className="image-frame">
                    <Card.Img variant="top" src={product.image} className="card-image"/>
                </div>
            </Link>
            <Card.Body>
                <Card.Title as={"div"}>
                    <Link to={`/shop/${product._id}`} className="product-title">
                        <div>
                            <strong>{product.name}</strong>
                        </div>
                    </Link>
                    <Link to={`/add${product._id}`}>
                        <i className="far fa-bookmark fa-2x" style={{float: "right"}}></i>
                    </Link>
                </Card.Title>
                <Card.Text as="h5">
                    {product.price} EGP
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
