import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useGetThirdPartyDetailsQuery } from "../slices/dolibarr/dolliThirdPartyApiSlice";
import Loader from "./shared/Loader";
import Message from "./shared/Message";

const ThirdPartyCard = ({ tierId, title }) => {
  const {
    data: tier,
    isLoading,
    refetch, // Non utilisé actuellement
    error,
  } = useGetThirdPartyDetailsQuery(tierId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title style={{ 
              fontSize: '1rem', 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis' 
            }}>
             <strong> {title} : </strong> {tier.name}
            </Card.Title>
            <Card.Text>
              <strong>Adresse:</strong> {tier.address || <span style={{ color: "red" }}>Non defini</span>}
            </Card.Text>
            <Row>
              <Col md={6}>
                <Card.Text>
                  <strong>Tel:</strong> {tier.phone || <span style={{ color: "red" }}>Non defini</span>}
                </Card.Text>
              </Col>
              <Col md={6}>
                <Card.Text>
                  <strong>Mobile:</strong> {tier.phone_mobile || <span style={{ color: "red" }}>Non defini</span>}
                </Card.Text>
              </Col>
            </Row>
            <Card.Text>
              <strong>Email:</strong> {tier.email ? <a href={`mailto:${tier.email}`}>{tier.email}</a> : <span style={{ color: "red" }}>Non defini</span>}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ThirdPartyCard;
