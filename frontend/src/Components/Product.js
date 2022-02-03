import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { addItem, addItemDB } from '../actions/cartActions';

const Product = ({ product }) => {
    const dispatch = useDispatch()
    const { userLogin } = useSelector(state => state)

    const loggedIn = userLogin.user? true : false
    const userId = userLogin.user? userLogin.user._id : ''
    const addtoCart = (id) => {
        console.log(id)
        if(loggedIn)
            dispatch(addItemDB(userId, id, 1))
        else
            dispatch(addItem(id, 1))
    }
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
                    <Link to={'/cart'} onClick={() => (product.countInStock > 0) && addtoCart(product._id)}>
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
