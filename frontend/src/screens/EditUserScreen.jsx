import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../slices/userApiSlice'

const EditUserScreen = () => {
  const { id: userId } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(
    userId,
  )

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      })
      toast.success('Utilisateur modifié avec succès')
      refetch()
      navigate('/userlist')
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
    }
  }

  return (
    <>
      <Link to={'/admin/userlist'}>
        <Button className="btn btn-light my-3">Retour</Button>
      </Link>
      <FormContainer>
        <h1>Modifier l'utilisateur</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer le nom du produit"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer l'email de l'utilisateur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                label="Est administrateur ?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Mettre à jour
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditUserScreen