import express from 'express'

const router = express.Router()
import {
  getSimulations,
  getSimulationById,
  deleteSimulation,
  updateSimulation,
  createSimulation,
} from '../controllers/simulationController.js'

router.route('/').get(getSimulations).post(createSimulation),
  router
    .route('/:id')
    .get(getSimulationById)
    .delete(deleteSimulation)
    .put(updateSimulation)

export default router
