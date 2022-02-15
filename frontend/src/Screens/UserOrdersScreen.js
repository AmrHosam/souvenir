import React, { useEffect } from 'react'
import { Col, Row, Image, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { listUserOrders } from '../actions/orderAction'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const UserOrdersScreen = () => {
    const dispatch = useDispatch()
    const userOrders = useSelector(state => state.userOrders)
    console.log(userOrders.orders)
    const { orders, loading, error } = userOrders
    useEffect(()=>{
        dispatch(listUserOrders())
    },[dispatch])
    return (
      <>
              {loading ? (
            <Loader/>
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
                  <h1 style={{ fontSize: '1.8rem', padding: '1rem 0' }}>ORDERS</h1>
                 {orders.length === 0 ? (
                    <Message>Your order list is empty <Link to='/'>Go Back</Link></Message>
                 ) : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>ITESMS</th>
                <th>TOTAL PRICE</th>
                <th>DATE</th>
                <th>PAYMENT METHOD</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="align-middle">{order._id}</td>
                  <td className="align-middle">
                      {order.orderItems.map((item) => (
                          <tr>
                            <Row>
                                <Col md={2}>
                                  <Image src={item.image} alt={item.name} fluid rounded></Image>
                                </Col>
                                <Col md={10} className='py-2'>
                                  <Link to={`/shop/${item.product}`}>{item.name}</Link>
                                </Col>
                            </Row>
                            </tr>
                      ))}
                  </td>
                  <td className="align-middle">{Number(order.totalPrice).toFixed(2)} EGP</td>
                  <td className="align-middle">{order.createdAt.substring(0,10)}</td>
                  <td className="align-middle">{order.paymentMethod}</td>
                  <td className="align-middle">{order.isDelivered?(<i className='fas fa-check' style={{color:'green'}}></i>):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                </tr>
              ))}
            </tbody>
        </Table>
                 )}
        </>
                )}
        </>
    )
}

export default UserOrdersScreen
