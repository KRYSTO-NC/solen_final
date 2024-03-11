import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetSimulationDetailsQuery,
  useUpdateSimulationMutation,
} from '../slices/simulationsApiSlice'
import { Badge, Button, Col, Form, Modal, Row, Toast } from 'react-bootstrap'
import {
  FaArrowAltCircleLeft,
  FaBan,
  FaCheck,
  FaEye,
  FaFileInvoice,
  FaPage4,
  FaPlusCircle,
  FaQuoteLeft,
  FaTimes,
} from 'react-icons/fa'
import Loader from '../components/shared/Loader'
import { toast } from 'react-toastify'
import Message from '../components/shared/Message'
import ThirdPartyCard from '../components/ThirdPartyCard'
import { useCreateProposalMutation } from '../slices/dolibarr/dolliProposalApiSlice'

const SimulationEditScreen = () => {
  const { id: simulationId } = useParams()
  const dispatch = useDispatch()
  const {
    data: installation,
    isLoading,
    refetch,
    error,
  } = useGetSimulationDetailsQuery(simulationId)

  const currentDate = new Date()
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Projet':
        return 'bg-warning'
      case 'En service':
        return 'bg-success'
      case 'Sans Suite':
        return 'bg-danger'
      default:
        return 'bg-secondary'
    }
  }
  const [
    createProposal,
    { isLoading: isCreating, isError, isSuccess },
  ] = useCreateProposalMutation()

  const [
    updateSimulation,
    {
      isLoading: isUpdating,
      isError: errorUpdating,
      isSuccess: successUpdating,
    },
  ] = useUpdateSimulationMutation()
  const handleClasserSansSuite = async () => {
    try {
      await updateSimulation({
        simulationId,
        status: 'Sans Suite',
      })
      refetch()
      toast.success(
        'Le statut de l\'installation a été mis à jour à "Sans Suite"',
      )
    } catch (error) {
      toast.error("Échec de la mise à jour du statut de l'installation")
    }
  }
  const handleCreateProposal = async () => {
    const batteryLines = installation.batteries.map((battery) => ({
      product_type: '1',
      fk_product: battery.ref, // Assurez-vous que c'est le bon ID
      qty: battery.quantity,
      subprice: battery.multiprices.part,
    }))
    const panneauLines = installation.modulesPV.map((pan) => ({
      product_type: '1',
      fk_product: pan.ref, // Assurez-vous que c'est le bon ID
      qty: pan.quantity,
      subprice: pan.multiprices.part,
    }))

    const inverterLines = installation.onduleurs.map((inverter) => ({
      product_type: '1',
      fk_product: inverter.ref, // Assurez-vous que c'est le bon ID
      qty: inverter.quantity,
      subprice: inverter.multiprices.part,
    }))

    const supportLines = installation.supportage.map((support) => ({
      product_type: '1',
      fk_product: support.ref, // Assurez-vous que c'est le bon ID
      qty: support.quantity,
      subprice: support.multiprices.part,
    }))
    const suppervisionLines = installation.suppervision.map((suppervision) => ({
      product_type: '1',
      fk_product: suppervision.ref, // Assurez-vous que c'est le bon ID
      qty: suppervision.quantity,
      subprice: suppervision.multiprices.part,
    }))
    const prestationsLines = installation.prestations.map((prestation) => ({
      product_type: '1',
      fk_product: prestation.ref, // Assurez-vous que c'est le bon ID
      qty: prestation.quantity,
      subprice: prestation.multiprices.part,
    }))

    const lines = [
      ...batteryLines,
      ...inverterLines,
      ...supportLines,
      ...panneauLines,
      ...suppervisionLines,
      ...prestationsLines,
    ]

    const proposalData = {
      socid: installation.demandeur,
      user_author_id: '18',
      date: unixTimestamp,
      array_options: {
        options_contact: '2',
        options_vente: '3',
      },
      lines,
    }

    try {
      const response = await createProposal({ proposalData }).unwrap()
      await updateSimulation({
        simulationId,
        idPropal: response,
      })
      refetch()
      toast.success(
        "La proposition et l'installation ont été mises à jour avec succès !",
      )
    } catch (error) {
      toast.error(
        "Échec de la création de la proposition ou de la mise à jour de l'installation",
      )
    }
  }

  // Demande intervention
  const [showModal, setShowModal] = useState(false)
  const [dateDemande, setDateDemande] = useState(new Date())

  const [datePrevisionnelle, setDatePrevisionnelle] = useState('')
  const [remarque, setRemarque] = useState('')

  const handleDateDemandeChange = (e) => setDateDemande(e.target.value)
  const handleDatePrevisionnelleChange = (e) =>
    setDatePrevisionnelle(e.target.value)
  const handleRemarqueChange = (e) => setRemarque(e.target.value)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  console.log(installation)

  return (
    <>
      <Link
        className="btn  btn-danger my-3 btn-sm"
        style={{ color: 'white' }}
        to={'/simulations'}
      >
        <FaArrowAltCircleLeft /> Retour
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row className="align-items-center">
            <Col md={12}>
              <h2>Installation - {installation._id}</h2>
              <p>
                
                <strong style={{color:'orange'}}>Créer le : </strong>{" "}
                {new Date(installation.createdAt).toLocaleDateString()}
              </p>
            </Col>
          </Row>

          {installation.idPropal === null ? (
            <Row className="align-items-center">
              <Col md={12}>
                <Button
                  className="btn btn-sm btn-primary"
                  onClick={handleCreateProposal}
                >
                  <FaFileInvoice style={{ marginRight: '5px' }} />
                  Créer la proposition dans Dolibarr
                </Button>
              </Col>
            </Row>
          ) : (
            <Row className="align-items-center">
              <Col md={10}>
                <p>
                  Identifiant de la proposition commercial Dolibarr :{' '}
                  <strong
                    className="tag"
                    style={{
                      padding: '5px 10px',
                      color: 'white',
                      backgroundColor: 'primary',
                    }}
                  >
                    {installation.idPropal}{' '}
                  </strong>
                </p>
              </Col>
              <Col md={2}>
                <a
                  className="btn btn-primary btn-sm"
                  href={`https://solis-erp.square.nc/comm/propal/card.php?id=${installation.idPropal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEye style={{ marginRight: '5px' }} />
                  Voir la proposition
                </a>
              </Col>
            </Row>
          )}

          <Row className="align-items-center mt-3">
            {installation.status !== 'Sans Suite' && (
              <Col md={4}>
                <Button
                  className="btn btn-sm btn-danger"
                  onClick={handleClasserSansSuite}
                >
                  <FaBan style={{ marginRight: '5px' }} />
                  Classer sans-suite
                </Button>
              </Col>
            )}
          </Row>
          <Row className="my-4">
            <Col md={2}>
              <Badge
                style={{ marginRight: '5px' }}
                className={getStatusColor(installation.status)}
              >
                {installation.status}
              </Badge>
              {installation.prof === true ? (
                <Badge variant="primary">Professionnel</Badge>
              ) : (
                <Badge variant="secondary">Particullier</Badge>
              )}
            </Col>

            <Row className="my-4">
              <Col>
                <ThirdPartyCard
                  tierId={installation.demandeur}
                  title={'Demandeur'}
                />
              </Col>
              <Col>
                <ThirdPartyCard
                  tierId={installation.benneficiaire}
                  title={'benneficiare'}
                />
              </Col>
            </Row>
          </Row>
        </>
      )}
    </>
  )
}

export default SimulationEditScreen
