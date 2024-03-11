import React, { useState, useEffect } from "react";

import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import Loader from "../../../../components/shared/Loader";
import Message from "../../../../components/shared/Message";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../slices/simulationsApiSlice";

const Step9 = ({ installation, onNext }) => {
  const { data: simmulation } = useGetSimulationDetailsQuery(installation);
  console.log(simmulation);
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(5);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const addProduct = (product) => {
    console.log(product);
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      { id: product.id, ref: product.id, refDolli:product.label, quantity: 1,  multiprices : { part : product.multiprices?.["1"] ?? "0" , pro: product.multiprices?.["2"] ?? "0"}  },
    ]);
  };

  const removeProduct = (ref) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.ref !== ref)
    );
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
        supportage: selectedProducts,
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
        <h1>Supportage : {simmulation.refference}</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <>
          <Row></Row>
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

            <Col md={4}>
              <h3>Sélection :</h3>
              <>
                {selectedProducts.map((product, index) => (
                  <>
                  < hr/>
                  <Row key={product.id} style={{marginBottom:"20px"}}>
                    <Col md={5}>
                      
                       <strong> {product.refDolli}</strong>
                   
                    </Col>
                    <Col md={3}>
                      <Form.Label>Quantité</Form.Label>
                      <Form.Control
                        type="number"
                        style={{height:"30px"}}
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            product.id,
                            Number(e.target.value),
                            "quantity"
                            )
                          }
                          />
                    </Col>

                  
                    <Col md={1}>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => removeProduct(product.id)}
                        >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </>
                ))}
              </>
            </Col>
          </Row>
        </>
        
        <Button type="submit" variant="primary" className="mb-3">
          Suivant
        </Button>
      </Form>
    </>
  );
};

export default Step9;
