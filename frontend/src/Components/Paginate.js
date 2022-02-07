import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({pageNumber, numberOfPages, keyword='', isAdmin = false}) => {
    return numberOfPages > 1 && (
        <Pagination>
            {[...Array(numberOfPages).keys()].map((x) => (
                <LinkContainer key={x+1} to={keyword?`/shop/search/${keyword}/page/${x+1}`:`/shop/page/${x+1}`}>
                    <Pagination.Item active={x+1 === pageNumber}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate
