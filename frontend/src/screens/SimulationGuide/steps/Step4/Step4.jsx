import React, { useEffect, useState } from "react";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../slices/simulationsApiSlice";
import Message from "../../../../components/shared/Message";
import Loader from "../../../../components/shared/Loader";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../../../../components/FormContainer";
import { toast } from "react-toastify";

const Step4 = ({ installation, onNext }) => {
  // Initialisation des états
  const [concessionaire, setConcessionaire] = useState("");
  const [isRaccordeAuReseau, setIsRaccordeAuReseau] = useState(false);
  const [typeAbonnement, setTypeAbonnement] = useState("non defini");
  const [typeRaccordement, setTypeRaccordement] = useState("non defini");
  const [puissance, setPuissance] = useState(1);
  const [prof, setProf] = useState(false);
  const [amperage, setAmperage] = useState(0);
  const [numCompteurEnercal, setNumCompteurEnercal] = useState("non renseigné");
  const [garantieDuree, setGarantieDuree] = useState(1);
  const [numClientEnercal, setNumClientEnercal] = useState("non renseigné");
  const [numCompteurEEC, setNumCompteurEEC] = useState("non renseigné");
  const [address, setAddress] = useState("non renseigné");
  const [typeInstallation, setTypeInstallation] = useState({
    raccordement: "non defini",
    puissance: 0,
    amperage: 0,
  });

  // Pour raccordement
  const handleRaccordementChange = (e) => {
    setTypeInstallation({
      ...typeInstallation,
      raccordement: e.target.value,
    });
  };

  // Pour puissance
  const handlePuissanceChange = (e) => {
    setTypeInstallation({
      ...typeInstallation,
      puissance: e.target.value,
    });
  };

  // Pour amperage
  const handleAmperageChange = (e) => {
    setTypeInstallation({
      ...typeInstallation,
      amperage: e.target.value,
    });
  };

  const {
    data: simulation,
    isLoading,
    error,
  } = useGetSimulationDetailsQuery(installation);

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const dataToUpdate = {
            simulationId: installation,
            concessionaire,
            raccordReseau: isRaccordeAuReseau,
            typeAbonnement,
            typeRaccordement,
            puissance,
            amperage,
            numCompteurEnercal,
            numClientEnercal,
            address,
            prof,
            typeInstallation,
            status: "Projet",
          };
      
          console.log('Data to Update:', dataToUpdate);
      
          const response = await updateInstallation(dataToUpdate);
      
          console.log('Update Installation Response:', response);
      
          toast.success("Mise à jour réussie.");
        } catch (error) {
          toast.error("Une erreur est survenue lors de la mise à jour.");
          console.error("Erreur:", error);
        }
      };

  useEffect(() => {
    if (isSuccess) {
      onNext(); // ou handleNext() si vous renommez la prop
    }
  }, [isSuccess, onNext]);

  return (
    <>
      <h1>Détails sur l'installation - {simulation?.refference}</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
          <Col md={8}>
              <Form.Group controlId="address" className="my-2">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="concessionaire">
                <Form.Label>Concessionaire</Form.Label>
                <Form.Select
                  value={concessionaire}
                  onChange={(e) => setConcessionaire(e.target.value)}
                >
                  <option value="" disabled>
                    Choisir un concessionaire
                  </option>
                  <option value="EEC">EEC</option>
                  <option value="Enercal">Enercal</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="prof" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="Le client est-il un professionnel ?"
                  checked={prof}
                  onChange={(e) => setProf(e.target.checked)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="raccordReseau">
                <Form.Label>Raccordée au réseau</Form.Label>
                <Form.Select
                  value={isRaccordeAuReseau.toString()}
                  onChange={(e) =>
                    setIsRaccordeAuReseau(e.target.value === "true")
                  }
                >
                  <option value="" disabled>
                    Choisir
                  </option>
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
            {isRaccordeAuReseau && (
                <>
                  <Col md={4}>
                    <Form.Group controlId="typeAbonnement" className="my-2">
                      <Form.Label>Type d'abonnement</Form.Label>
                      <Form.Select
                        value={typeAbonnement}
                        onChange={(e) => setTypeAbonnement(e.target.value)}
                      >
                        <option value="" disabled>
                          Choisir un type d'abonnement
                        </option>
                        <option value="Basse tension">Basse tension</option>
                        <option value="Haute tension">Haute tension</option>
                        <option value="non defini">Non défini</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="typeRaccordement" className="my-2">
                      <Form.Label>Type de raccordement</Form.Label>
                      <Form.Select
                        value={typeInstallation.raccordement}
                        onChange={handleRaccordementChange}
                      >
                        <option value="mono">Mono</option>
                        <option value="tri">Tri</option>
                        <option value="non defini">Non défini</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="puissance" className="my-2">
                      <Form.Label>Puissance</Form.Label>
                      <Form.Control
                        type="number"
                        value={typeInstallation.puissance}
                        onChange={handlePuissanceChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="amperage" className="my-2">
                      <Form.Label>Amperage</Form.Label>
                      <Form.Control
                        type="number"
                        value={typeInstallation.amperage}
                        onChange={handleAmperageChange}
                      />
                    </Form.Group>
                  </Col>
                </>
              )}

              {concessionaire === "Enercal" && (
                <>
                  {/* Fields for Enercal */}
                  <Col md={4}>
                    <Form.Group controlId="numCompteurEnercal" className="my-2">
                      <Form.Label>Numéro du compteur Enercal</Form.Label>
                      <Form.Control
                        type="text"
                        value={numCompteurEnercal}
                        onChange={(e) => setNumCompteurEnercal(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group controlId="numClientEnercal" className="my-2">
                      <Form.Label>Numéro du client Enercal</Form.Label>
                      <Form.Control
                        type="text"
                        value={numClientEnercal}
                        onChange={(e) => setNumClientEnercal(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </>
              )}
              {concessionaire === "EEC" && (
                <>
                  <Col md={4}>
                    <Form.Group controlId="numCompteurEEC" className="my-2">
                      <Form.Label>Numéro du compteur EEC</Form.Label>
                      <Form.Control
                        type="text"
                        value={numCompteurEEC}
                        onChange={(e) => setNumCompteurEEC(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </>
              )}
            </Row>
            
            <Button type="submit" variant="primary">
              Suivant
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default Step4;