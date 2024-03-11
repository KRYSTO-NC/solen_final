import React, { useState } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { FaPlusCircle } from "react-icons/fa";

import { useGetProductsQuery } from "../slices/dolibarr/dolliProductApiSlice";
import { toast } from "react-toastify";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../slices/simulationsApiSlice";

const InstallationStockage = ({
  batteries,
  capaciteBatterie,
  prof,
  installationId,
}) => {
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(22);

  const {

    isLoading,
    refetch,
    error,
  } = useGetSimulationDetailsQuery(installationId);
  const [updateInstallation] = useUpdateSimulationMutation(installationId);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [localBatteries, setLocalBatteries] = useState(batteries);
  const [supervision, setSupervision] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleProductChange = (e) => setSelectedProduct(e.target.value);
  const handleSupervisionChange = (e) => setSupervision(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);

  console.log(installationId);

  const handleConfirm = async () => {
    const selectedProductDetails = products?.find(
      (product) => product.id === selectedProduct
    );
    if (selectedProductDetails) {
      // Vérifier si selectedProductDetails est non nul
      const newBattery = {
        id: new Date().getTime(),
        ref: selectedProduct,
        quantity: Number(quantity), // Convertir en nombre
        supervision: Number(supervision), // Convertir en nombre
        multiprices: {
          pro: selectedProductDetails?.multiprices[1],
          part: selectedProductDetails?.multiprices[2],
        },
      };
      console.log("New Battery:", newBattery); // Vérifier la nouvelle batterie

      setLocalBatteries((prevBatteries) => [...prevBatteries, newBattery]); // Mise à jour de l'état local

      // Mettre à jour l'installation
      try {
        const result = await updateInstallation({
          installationId: installationId,

          batteries: [...localBatteries, newBattery],
        });
        console.log("Update Result:", result); // Vérifier le résultat de la mise à jour
        refetch()
        toast.success("Batterie ajoutée avec succès");
      } catch (error) {
        console.error("Update Failed:", error); // Afficher l'erreur si la mise à jour échoue
      }

      handleClose();
    }
  };

  const handleDelete = async (ref) => {
    const updatedBatteries = localBatteries.filter((battery) => battery.ref !== ref);
    setLocalBatteries(updatedBatteries);
  
    try {
      const result = await updateInstallation({
        installationId: installationId,
        batteries: updatedBatteries,
      });
      console.log("Delete Result:", result);
      refetch();
      toast.success("Batterie supprimée avec succès");
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
          <h4>Stockage</h4>
        </Col>
        <Col md={1} className="text-right">
          <Button variant="primary btn-sm btn-danger" onClick={handleShow}>
            <FaPlusCircle style={{ color: "white" }} />
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une batterie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productSelect">
              <Form.Label>Produit</Form.Label>
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
                    <option value="">Choisir une batterie</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.label}
                      </option>
                    ))}
                  </>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="supervision">
              <Form.Label>Supervision</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez la supervision"
                onChange={handleSupervisionChange}
              />
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
          <p>Capacité de stockage : {capaciteBatterie} kWh</p>
        </Col>
        <Col md={6}>
          <p>Nombre de batteries : {localBatteries.length}</p>
        </Col>
      </Row>
      <Row>
        {localBatteries.map((battery) => (
        <ProductCard key={battery.id} product={battery} prof={prof} onDelete={handleDelete} />
        ))}
      </Row>
    </div>
  );
};

export default InstallationStockage;
