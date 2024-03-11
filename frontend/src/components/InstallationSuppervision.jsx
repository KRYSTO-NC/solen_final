import React, { useState } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { FaPlusCircle } from "react-icons/fa";

import { useGetProductsQuery } from "../slices/dolibarr/dolliProductApiSlice";
import { toast } from "react-toastify";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../slices/simulationsApiSlice";

const InstallationSuppervision = ({
  suppervision,

  prof,
  installationId,
}) => {
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(19);

  const {

    isLoading,
    refetch,
    error,
  } = useGetSimulationDetailsQuery(installationId);
  const [updateInstallation] = useUpdateSimulationMutation(installationId);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [localSuppervisions, setLocalSuppervisions] = useState(suppervision);
console.log("suppervision" , suppervision);
console.log("localsuper", localSuppervisions);
  const [quantity, setQuantity] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleProductChange = (e) => setSelectedProduct(e.target.value);

  const handleQuantityChange = (e) => setQuantity(e.target.value);


  const handleConfirm = async () => {
    const selectedProductDetails = products?.find(
      (product) => product.id === selectedProduct
    );
    if (selectedProductDetails) {
      // Vérifier si selectedProductDetails est non nul
      const newSuppervision = {
        id: new Date().getTime(),
        ref: selectedProduct,
        quantity: Number(quantity), // Convertir en nombre

        multiprices: {
          pro: selectedProductDetails?.multiprices[1],
          part: selectedProductDetails?.multiprices[2],
        },
      };
      console.log("New Suppervisiion:", newSuppervision); // Vérifier la nouvelle batterie

      setLocalSuppervisions((prevSuppervisions) => [...prevSuppervisions, newSuppervision]); // Mise à jour de l'état local

      // Mettre à jour l'installation
      try {
        const result = await updateInstallation({
          installationId: installationId,

          suppervision: [...localSuppervisions, newSuppervision],
        });
        console.log("Update Result:", result); // Vérifier le résultat de la mise à jour
        refetch()
        toast.success("Suppervision ajoutée avec succès");
      } catch (error) {
        console.error("Update Failed:", error); // Afficher l'erreur si la mise à jour échoue
      }

      handleClose();
    }
  };

  const handleDelete = async (ref) => {
    const updatedSuppervision = localSuppervisions.filter((suppervision) => suppervision.ref !== ref);
    setLocalSuppervisions(updatedSuppervision);
  
    try {
      const result = await updateInstallation({
        installationId: installationId,
        suppervision: updatedSuppervision,
      });
      console.log("Delete Result:", result);
      refetch();
      toast.success("Suppervision supprimée avec succès");
    } catch (error) {
      console.error("Delete Failed:", error);
    }
  };

  // Trouver le produit sélectionné pour obtenir les multiprices
  const selectedProductDetails = products?.find(
    (product) => product.id === selectedProduct
  );

  return (
    <div className="stockage-section">
      <Row>
        <Col md={11}>
          <h4>Suppervisions</h4>
        </Col>
        <Col md={1} className="text-right">
          <Button variant="primary btn-sm btn-danger" onClick={handleShow}>
            <FaPlusCircle style={{ color: "white" }} />
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Suppervision</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productSelect">
              <Form.Label>Suppervisions</Form.Label>
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
                    <option value="">Choisir une suppervision</option>
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
              <Form.Control
                type="number"
                placeholder="Entrez la quantité"
                onChange={handleQuantityChange}
              />
            </Form.Group>
          </Form>
          {selectedProduct && (
            <div>
              <p>
                <strong>Multiprices:</strong>
              </p>
              <p>
                Tarif Pro: {selectedProductDetails?.multiprices?.[1] || "N/A"}
              </p>
              <p>
                tarif Public:{" "}
                {selectedProductDetails?.multiprices?.[2] || "N/A"}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn-sm btn-danger" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary btn-sm btn-success" onClick={handleConfirm}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col md={6}>
      
        </Col>
        <Col md={6}>
          <p>Nombre de prestations : {localSuppervisions.length}</p>
        </Col>
      </Row>
      <Row>
        {localSuppervisions.map((prestation) => (
        <ProductCard key={prestation.id} product={prestation} prof={prof} onDelete={handleDelete} />
        ))}
      </Row>
    </div>
  );
};

export default InstallationSuppervision;
