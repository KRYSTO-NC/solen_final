import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateSimulationMutation } from "../slices/simulationsApiSlice";

const InstallationAdministratif = ({ installation }) => {
  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation._id);
  const navigate = useNavigate();


  const handleCardClick = (id, concessionaire) => {
    navigate(`/details/${id}/${concessionaire}`, { state: { installation } });
  };

  return (
    <div className="stockage-section">
      <h3>suivie administratif</h3>
      <Row>
        <Col md={4}>
          <Card
            className="mb-4 shadow-sm p-2 card-clickable"
            onClick={() =>
              handleCardClick(installation.id, installation.concessionaire)
            }
          >
            <Card.Title>
              {installation.concessionaire === "EEC" ? "EEC" : "Enercal"}
            </Card.Title>
            <p>
              Status de la demande:{" "}
              <strong>
                {installation.concessionaire === "EEC"
                  ? installation.demandeEEC.status
                  : installation.demandeEnercal.status}
              </strong>
            </p>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="mb-4 shadow-sm p-2 card-clickable"
            onClick={() => handleCardClick(installation.id, "Dimenc")}
          >
            <Card.Title>Dimenc</Card.Title>
            <p>
              Status: <strong>{installation.demandeDimenc.status}</strong>
            </p>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="mb-4 shadow-sm p-2 card-clickable"
            onClick={() => handleCardClick(installation.id, "Conformite")}
          >
            <Card.Title>Conformité</Card.Title>
            <p>
              Status: <strong>{installation.conformite.status}</strong>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};



export default InstallationAdministratif;
