import React, { useEffect, useState } from "react";
import { useGetThirdPartiesQuery } from "../../../../slices/dolibarr/dolliThirdPartyApiSlice";
import Message from "../../../../components/shared/Message";
import Loader from "../../../../components/shared/Loader";
import { Button, Col, Row, Table } from "react-bootstrap";

import { FaPlusCircle } from "react-icons/fa";

import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import SearchBar from "../../../../components/shared/SearchBar";
import { useNavigate } from "react-router-dom";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../slices/simulationsApiSlice";

const Step3 = ({ installation, onNext }) => {
  const [selectedThirdParty, setSelectedThirdParty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const {
    data: simulation,
    isLoading,
    refetch,
    error,
  } = useGetSimulationDetailsQuery(installation);

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation);
    console.log('====================================');
    console.log(selectedThirdParty && selectedThirdParty.id);
    console.log('====================================');
  const {
    data: tiers,
    isLoading: loadingTiers,
    error: errorTiers,
  } = useGetThirdPartiesQuery();

  const handleValidate = async () => {
    console.log('Données de mise à jour :', {
        simulationId: installation,
        benneficiaire: selectedThirdParty ? selectedThirdParty.id : null,
      });
    
      try {
        await updateInstallation({
          simulationId: installation,
          benneficiaire: selectedThirdParty ? selectedThirdParty.id : null,
        });
  
      console.log('====================================');
      console.log(installation);
      console.log('====================================');
      toast.success("Demandeur ajouté avec succées.");
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la validation de l'installation."
      );
      console.error("Une erreur est survenue:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onNext(installation); // ou handleNext(installation) si vous renommez la prop
    }
  }, [isSuccess, onNext, installation]);

  const filteredTiers = tiers?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(tiers);


  return (
    <>
      <h1>Beneficiaire</h1>
      <Row style={{ marginBottom: "20px" }}>
  <Col md={10}>
    <h5> Avant de continuer, assurez-vous que le client est déjà enregistré dans Dolibarr. </h5>
  </Col>


    <Col md={2}>
                <a
                  className="btn btn-primary btn-sm my-3"
                  href={`https://solisdev-erp.square.nc/societe/card.php?leftmenu=customers&action=create&type=c`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 
                 Créer le client
                </a>
            
  </Col>
</Row>

      <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />

      {isLoading || loadingTiers ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Adresse</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTiers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>
                      {user.email ? (
                        <td>
                          {" "}
                          <a href={`mailto: ${user.email}`}>{user.email}</a>
                        </td>
                      ) : (
                        <td style={{ color: "red" }}> Non renseignée</td>
                      )}
                    </td>

                    {user.address ? (
                      <td> {user.address}</td>
                    ) : (
                      <td style={{ color: "red" }}> Non renseignée</td>
                    )}
                    <td>
                      <>
                        <Button
                          variant="success"
                          className="btn-sm"
                          onClick={() => setSelectedThirdParty(user)}
                        >
                          <FaPlusCircle />
                        </Button>
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col md={4}>
            {selectedThirdParty ? (
              <>
                <h3>Selection:</h3>
                <p>
                  <strong>Nom :</strong>{" "}
                  {selectedThirdParty.name || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Email :</strong>{" "}
                  {selectedThirdParty.email || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Adresse :</strong>{" "}
                  {selectedThirdParty.address || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Code postal :</strong>{" "}
                  {selectedThirdParty.zip || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Ville :</strong>{" "}
                  {selectedThirdParty.town || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Téléphone :</strong>{" "}
                  {selectedThirdParty.phone || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Mobile :</strong>{" "}
                  {selectedThirdParty.phone_mobile || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
              </>
            ) : (
              <p>Veuillez sélectionner un tiers pour voir les détails.</p>
            )}
            <Button variant="primary" onClick={handleValidate}>
              Valider
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Step3;
