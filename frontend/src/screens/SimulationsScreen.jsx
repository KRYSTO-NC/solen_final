import { Button, Col, Row } from "react-bootstrap";
import { useGetSimulationsQuery } from "../slices/simulationsApiSlice";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FaEye } from "react-icons/fa";


const SimulationsScreen = () => {
  const { data: simulations, error, isLoading } = useGetSimulationsQuery();


console.log('====================================');
console.log(simulations);
console.log('====================================');
const [selectedStatus, setSelectedStatus] = useState("En Service");
  return (
    <>
       
    
      {isLoading ? (
        <Loader />
      ) : error ? (
        
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Simulations</h1>
          <Row className="align-items-center">
   
        <Col className="text-end">
          <p>
            Initialement, seules les installations <strong>en service</strong>  apparaissent dans
            la liste. Pour voir des installations avec d'autres états, utilisez
            le menu déroulant ci-dessous.
          </p>

          <select
            className="select-filter"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="En Service">En service</option>
            <option value="Projet">Projet</option>
            <option value="Simulation">Simulation</option>
            <option value="Sans Suite">Sans suite</option>
          </select>
        </Col>
      </Row>
          <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th style={{"color": "orange"}}>REFFERENCE</th>
              <th style={{"color": "orange"}}>Benneficaire</th>
              <th style={{"color": "orange"} }>Demandeur</th>
              <th style={{"color": "orange"} }>Adresse de l'installation</th>
              <th style={{"color": "orange"} }>Concessionaire</th>
              <th style={{"color": "orange"} }>status</th>
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {simulations?.filter(
                  (installation) =>
                    !selectedStatus || installation.status === selectedStatus
                ).map((simulation) => {
              // Ajoutez une condition pour filtrer les produits
              if (simulation) {
                return (
                  <tr key={simulation._id}>
                    <td>{simulation.refference}</td>
                    <td>{simulation.benneficiaire}</td>
                    <td>{simulation.demandeur}</td>
                    <td>{simulation.address}</td>
                    <td>{simulation.concessionaire}</td>
                    <td>{simulation.status}</td>
                    <td>
                      <LinkContainer to={`/simulation/${simulation._id}`}>
                        <Button variant="success" className="btn-sm mx-2">
                          <FaEye />
                        </Button>
                      </LinkContainer>
                    </td>
                 
                  </tr>
                )
              } else {
                // Retournez null si le produit ne correspond pas au critère
                return null
              }
            })}
          </tbody>
        </table>
      
        </>
      )}
    </>
  );
};

export default SimulationsScreen;
