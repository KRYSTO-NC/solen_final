import React, { useState, useEffect } from "react";

import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import Loader from "../../../../components/shared/Loader";
import Message from "../../../../components/shared/Message";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../slices/simulationsApiSlice";

const Step10 = ({ installation, onNext }) => {
  const { data: simmulation } = useGetSimulationDetailsQuery(installation);

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(22);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stockage, setStockage] = useState(false);
  const [typeBatterie, setTypeBatterie] = useState("");
  const [capaciteBatterie, setCapaciteBatterie] = useState(0);

  const addProduct = (product) => {
    console.log(product);
    setSelectedProducts((prevProducts) => [...prevProducts, { id: product.id, refDolli: product.label , ref: product.id, quantity: 1, supervision: 0 , multiprices : { part : product.multiprices?.["1"] ?? "0" , pro: product.multiprices?.["2"] ?? "0"} }]);
  };

  const removeProduct = (ref) => {
    setSelectedProducts((prevProducts) => prevProducts.filter((product) => product.ref !== ref));
  };
  
  const updateQuantity = (ref, value, field) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.ref === ref ? { ...product, [field]: value } : product
      )
    );
  };
  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedProducts);
    try {
      await updateInstallation({
        simulationId: installation,
        stockage,
        typeBatterie,
        capaciteBatterie,
        batteries : selectedProducts,
      });
      console.log("selectedProducts", selectedProducts);
      console.log("updatedInstallation", updateInstallation);
      toast.success("Mise à jour réussie.");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  return (
    <>
      <div className="heading">

        <h1>Stockage de l'installation : {simmulation.refference}</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="stockage" className="my-2">
              <Form.Label>L'installation aura-t-elle du stockage</Form.Label>
              <Form.Check
                type="checkbox"
                checked={stockage}
                onChange={(e) => setStockage(e.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
        {stockage && (
          <>
            <Row>
              <Col md={4}>
                <Form.Group controlId="typeBatterie" className="my-2">
                  <Form.Label>Type de Batterie</Form.Label>
                  <Form.Select
                    value={typeBatterie}
                    onChange={(e) => setTypeBatterie(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisir un type
                    </option>
                    <option value="Lithium Ion">Lithium Ion</option>
                    <option value="Plomb">Plomb</option>
                    <option value="Autre">Autre</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="capaciteBatterie" className="my-2">
                  <Form.Label>Capacité total des batteries</Form.Label>
                  <Form.Control
                    type="number"
                    value={capaciteBatterie}
                    onChange={(e) =>
                      setCapaciteBatterie(Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Tableau des produits */}
            <Row>
              <Col md={6}>
                {loadingProducts ? (
                  <Loader />
                ) : errorProducts ? (
                  <Message variant="danger">
                    {typeof errorProducts.data.message === "string"
                      ? errorProducts.data.message
                      : "Une erreur est survenue"}
                  </Message>
                ) : (
                  <Table striped hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>Refference</th>
                        <th>Désignation</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.ref}</td>
                          <td>{product.label}</td>
                          <td>
                            <Button
                              variant="success"
                              className="btn-sm"
                              onClick={() => addProduct(product)}
                            >
                              <FaPlusCircle />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Col>

              <Col md={6}>
            <h3>Sélection :</h3>
            <>
        {selectedProducts.map((product, index) => (
          <Row key={product.id}>
            <Col md={5}>
             <strong> {product.refDolli}</strong>
            </Col>
            <Col md={2}>
              <Form.Label>Quantité</Form.Label>
              <Form.Control
              style={{height:"30px"}}
                type="number"
                value={product.quantity}
                onChange={(e) => updateQuantity(product.id, Number(e.target.value), 'quantity')}
              />
            </Col>
            <Col md={2}>
              <Form.Label>Supervision</Form.Label>
              <Form.Control
              style={{height:"30px"}}
                type="number"
                value={product.supervision}
                onChange={(e) => updateQuantity(product.id, Number(e.target.value), 'supervision')}
              />
            </Col>
            <Col md={2}>
              <Button variant="danger" className="btn-sm" onClick={() => removeProduct(product.id)}>
                <FaTrash />
              </Button>
            </Col>
          </Row>
        ))}
      </>
          </Col>
            </Row>
          </>
        )}
        <Button type="submit" variant="primary" className="mb-3">
          Suivant
        </Button>
      </Form>
    </>
  );
};

export default Step10;
