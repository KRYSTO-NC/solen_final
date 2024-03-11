import React from "react";
import {
  Badge,
  Card,
  Col,
  Row,
  Tooltip,

} from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

const InstallationInfos = ({ installation }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Cliquez pour fermer
    </Tooltip>
  );

  return (
    <Card className="mb-4 shadow-sm stockage-section" style={{borderColor:"#fba332"}}>
      <Card.Body>
        <Card.Title style={{ fontSize: "2rem" }}>
          Informations sur l'installation
        </Card.Title>
        <Card.Subtitle style={{ marginBottom: "20px" }}>
          <strong>Adresse de l'installation :</strong> {installation.address}
        </Card.Subtitle>
        <Row>
          <Col md={3}>
            <Col></Col>
            <Card.Text>
              <strong>Raccordée au réseau :</strong>{" "}
              {installation.raccordReseau ? (
                <FaCheck
                  style={{
                    color: "green",
                    fontSize: "20px",
                    marginLeft: "20px",
                  }}
                />
              ) : (
                <FaTimes
                  style={{ color: "red", fontSize: "20px", marginLeft: "20px" }}
                />
              )}
            </Card.Text>
          </Col>
         
         
          <Col md={2}>
            <Card.Text>
              <strong>Concessionaire:</strong>{" "}
              {installation.concessionaire ? (
                <Badge style={{ marginLeft: "20px" }}>
                  {installation.concessionaire}
                </Badge>
              ) : (
                <FaTimes
                  style={{
                    color: "red",
                    fontSize: "20px",
                    marginLeft: "20px",
                    textAlign: "center",
                  }}
                />
              )}
            </Card.Text>
          </Col>
        </Row>

        {installation.raccordReseau && (
          <Row>
            <Col md={3}>
              <Card.Text>
                <strong>Type d'abonnement :</strong>{" "}
                {installation.typeAbonnement}
              </Card.Text>
            </Col>
            <Col md={3}>
              <Card.Text>
                <strong>Type de raccordement :</strong>{" "}
                {installation.typeInstallation.raccordement}
              </Card.Text>
            </Col>
            <Col md={3}>
              <Card.Text>
                <strong>Puissance :</strong>{" "}
                {installation.typeInstallation.puissance} Kwh
              </Card.Text>
            </Col>
            <Col md={3}>
              <Card.Text>
                <strong>Ampérage :</strong>{" "}
                {installation.typeInstallation.amperage} Amp
              </Card.Text>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default InstallationInfos;
