import React, { useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap"; // Form added here
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle } from "react-icons/fa";

import { toast } from "react-toastify";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../slices/simulationsApiSlice";

const InstallationOnduleurs = ({ onduleurs, prof, installationId }) => {
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(21);
  const [updateInstallation] = useUpdateSimulationMutation(installationId);

  const { isLoading, refetch, error } =
    useGetSimulationDetailsQuery(installationId);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [localOnduleurs, setLocalOnduleurs] = useState(onduleurs);

  const [quantity, setQuantity] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleConfirm = async () => {
    const selectedProductDetails = products?.find(
      (product) => product.id === selectedProduct
    );
    if (selectedProductDetails) {
      const newOnduleur = {
        ref: selectedProduct,
        quantity: Number(quantity),
        multiprices: {
          pro: selectedProductDetails?.multiprices[1],
          part: selectedProductDetails?.multiprices[2],
        },
      };

      setLocalOnduleurs((prevOnduleur) => [...prevOnduleur, newOnduleur]);

      try {
        const result = await updateInstallation({
          installationId: installationId,
          onduleurs: [...localOnduleurs, newOnduleur],
        });
        console.log("Update Result:", result);
        refetch();
        toast.success("onduleur ajouté avec succès");
      } catch (error) {
        console.error("Update Failed:", error);
      }

      handleClose();
    }
  };

  const handleDelete = async (ref) => {
    const updatedOnduleurs = localOnduleurs.filter((onduleur) => onduleur.ref !== ref);
    setLocalOnduleurs(updatedOnduleurs);
  
    try {
      const result = await updateInstallation({
        installationId: installationId,
        onduleurs: updatedOnduleurs,
      });
      console.log("Delete Result:", result);
      refetch();
      toast.success("onduleur supprimée avec succès");
    } catch (error) {
      console.error("Delete Failed:", error);
    }
  };

  return (
    <div className="stockage-section">
      <Row>
        <Col md={11}>
          <h4>Onduleurs</h4>
        </Col>
        <Col md={1} className="text-right">
          <Button variant="primary btn-sm btn-danger" onClick={handleShow}>
            <FaPlusCircle style={{ color: "white" }} />
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Onduleur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productSelect">
              <Form.Control
                as="select"
                value={selectedProduct}
                onChange={handleProductChange}
              >
                {loadingProducts ? (
                  <option>Chargement...</option>
                ) : errorProducts ? (
                  <option>Erreur</option>
                ) : (
                  <>
                    <option value="">Choisir une refference</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.label}
                      </option>
                    ))}
                  </>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantité</Form.Label>
              <Form.Control type="number" placeholder="Entrez la quantité"  onChange={handleQuantityChange} />
            </Form.Group>
          </Form>
          {selectedProduct && (
            <div>
              <p>
                <strong>Multiprices:</strong>
              </p>
              <p>Tarif Pro: {selectedProduct?.multiprices?.[1] || "N/A"}</p>
              <p>tarif Public: {selectedProduct?.multiprices?.[2] || "N/A"}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger btn-sm" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="success btn-sm"  onClick={handleConfirm} >
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {onduleurs.map((support) => (
          <ProductCard key={support.id} product={support} prof={prof} onDelete={handleDelete} />
        ))}
      </Row>
    </div>
  );
};

export default InstallationOnduleurs;
