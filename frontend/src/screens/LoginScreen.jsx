import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/shared/Loader'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import bg from '../assets/solar_panel_bg.jpg'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

 const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/' // redirect to home page if no redirect query param

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      toast.success('Vous êtes connecté avec succès')
      // navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  return (
    <Row className="login-row">
    <Col md={6} className="login-image" style={{
      backgroundImage: `url('${bg}')`,
      backgroundSize: 'cover',
      opacity: 0.9,
      borderRadius: '10px 0px 0px 10px',
    }}>
      {/* Empty column to show background image */}
    </Col>
    <Col md={6}>
      <div className="form-container">
        <h1>Connexion</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="email">
              <Form.Label>Votre adresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-3" controlId="password">
              <Form.Label>Votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-2"
              disabled={isLoading}
            >
              Connection
            </Button>
            {isLoading && <Loader/>}
          </Form>

        </div>
      </Col>
    </Row>
  )
}

export default LoginScreen
