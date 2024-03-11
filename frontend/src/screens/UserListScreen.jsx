import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal, Form } from "react-bootstrap";
import {
  FaTrash,
  FaTimes,
  FaEdit,
  FaCheck,
  FaPlusCircle,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { useState } from "react";
import { useDeleteUsersMutation, useGetUsersQuery, useRegisterMutation } from "../slices/userApiSlice";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUsersMutation();

  const [showModal, setShowModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [registerUser] = useRegisterMutation();

  const createNewUser = async () => {
    try {
      const newUser = await registerUser(newUserData).unwrap();
      toast.success("Utilisateur créé avec succès.");
      refetch();  // pour rafraîchir la liste des utilisateurs
      setShowModal(false); // pour fermer la modale
    } catch (error) {
      toast.error(error.message || "Une erreur s'est produite");
    }
  };
  const deleteHandler = async (id) => {
    // Trouver l'utilisateur correspondant à l'ID donné
    const userToDelete = users?.find((user) => user._id === id);
    
    // Vérifier si l'utilisateur est un administrateur
    if (userToDelete?.isAdmin) {
      toast.error("Vous ne pouvez pas supprimer un utilisateur avec le statut admin");
      return;
    }
  
    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
      try {
        await deleteUser(id);
        toast.success("Utilisateur supprimé avec succès");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  
  return (
    <>
      <h1>Utilisateurs</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Une erreur c'est produite</Message>
      ) : (
        <>
          <Button
            className="btn btn-sm"
            style={{ marginBottom: "20px" }}
            onClick={() => setShowModal(true)}
          >
            <FaPlusCircle style={{ marginRight: "10px" }} /> Ajouter un
            utilisateur
          </Button>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Administrateur</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name && user.name}</td>
                  <td>
                    {" "}
                    <a href={`mailto: ${user.email}`}>{user.email}</a>{" "}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td>
                    <>
                      <LinkContainer to={`/admin/user/${user._id}`}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter un nouvel utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Formulaire pour le nouvel utilisateur */}
                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUserData.name}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={newUserData.email}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    value={newUserData.password}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-sm" variant="secondary" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button className="btn-sm" variant="primary" onClick={createNewUser}>
                Créer
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default UserListScreen;