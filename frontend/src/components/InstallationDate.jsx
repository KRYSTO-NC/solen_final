import React, { useState } from "react";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../slices/simulationsApiSlice";


const InstallationDate = ({ installation }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [updateInstallation] = useUpdateSimulationMutation(installation.id);

  const { isLoading, refetch, error } = useGetSimulationDetailsQuery(
    installation.id
  );

  const handleOpenModal = (field) => {
    setSelectedField(field);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    try {
      const updateData = {
        installationId: installation.id,
        [selectedField]: selectedDate,
      };
 
      // Si le champ mis à jour est 'dateMiseEnService', changer le statut en 'En Service'
      if (selectedField === 'dateMiseEnService' && selectedDate) {
        updateData['status'] = 'En Service';
      }
  
      const result = await updateInstallation(updateData);
      console.log("Update Result:", result);
      refetch();
    } catch (error) {
      console.error("Update Failed:", error);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="stockage-section">
        <h3>Dates</h3>
        <Row>
        <Col md={2}>
              <Card style={{ height: "130px" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "15px", marginTop: "1.8rem" }}>
                    Créer le
                  </Card.Title>
                  <Card.Text>
                    {installation.createdAt ? (
                      new Date(installation.createdAt).toLocaleDateString()
                    ) : (
                      <p style={{color:"red"}}>Non renseignée</p>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
        <Col md={2}>
              <Card style={{ height: "130px" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "15px", marginTop: "1.8rem" }}>
                    Modifié le
                  </Card.Title>
                  <Card.Text>
                    {installation.createdAt ? (
                      new Date(installation.createdAt).toLocaleDateString()
                    ) : (
                      <p style={{color:"red"}}>Non renseignée</p>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          {/* Cartes pour différentes dates */}
          {['datePrevisionelPose', 'datePose', 'datePrevisionelMiseEnService', 'dateMiseEnService'].map((field, idx) => (
            <Col md={2} key={idx}>
              <Card style={{ height: "130px" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "15px", marginTop: "1.8rem" }}>
                    {field === 'datePrevisionelPose' ? 'Pose prévu le' : field === 'datePose' ? 'Pose' : field === 'datePrevisionelMiseEnService' ? 'Prév. mise en service' : 'Mise en service' }
                  </Card.Title>
                  <Card.Text>
                    {installation[field] ? (
                      new Date(installation[field]).toLocaleDateString()
                    ) : (
                      <p style={{color:"red"}}>Non renseignée</p>
                    )}
                  </Card.Text>
                  <Button
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "5px",
                      right: "10px",
                    }}
                    className="btn btn-danger btn-sm"
                    onClick={() => handleOpenModal(field)}
                  >
                    {" "}
                    <FaPlusCircle />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* La modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mettre à jour la date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InstallationDate;
