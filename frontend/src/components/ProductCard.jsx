import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useGetProductDetailsQuery } from '../slices/dolibarr/dolliProductApiSlice'
import Loader from './shared/Loader'
import Message from './shared/Message'
import { FaTrash } from 'react-icons/fa'

const ProductCard = ({ product, prof, onDelete }) => {
  const { data, isLoading, refetch, error } = useGetProductDetailsQuery(
    product.ref,
  );


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || error.message}
      </Message>
    );
  }

  return (
    <Col md={3}>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title
            style={{
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              fontWeight:"bolder",
              textOverflow: 'ellipsis',
              color: '#fba332',
            }}
          >
            {data.label}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <strong>REF :</strong> {data.ref}
          </Card.Subtitle>
          <Row>
            <Col md={6}>
              <Card.Text>
                <strong>Quantité:</strong> {product.quantity}
              </Card.Text>
            </Col>
            {product.supervision && (
              <Col md={6}>
                <Card.Text>
                  <strong>Supervision:</strong> {product.supervision}
                </Card.Text>
              </Col>
            )}
            <Col md={12}>
              <Card.Text>
                {prof ? (
                  <p>{Math.round(data.multiprices?.['2'] ?? '0')} XPF</p>
                ) : (
                  <p>{Math.round(data.multiprices?.['1'] ?? '0')} XPF</p>
                )}
              </Card.Text>
            </Col>
          </Row>
          <Button variant="danger btn-sm" onClick={() => onDelete(product.ref)}>
       <FaTrash style={{color:"white"}}/>
      </Button>
        </Card.Body>
      </Card>
   
    </Col>
  );
};

export default ProductCard;
