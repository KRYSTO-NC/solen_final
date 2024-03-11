import asyncHandler from '../middleware/asyncHandler.js'

import Simulation from '../models/simulationModel.js'

// @desc    Fetch all simulations
// @route   GET /api/simulations
// @access  Public
const getSimulations = asyncHandler(async (req, res) => {
  const simulations = await Simulation.find({}).populate(
    'createdBy',
    'name email',
  )
  res.json(simulations)
})

// @desc    Fetch single simulation
// @route   GET /api/simulations/:id
// @access  Public
const getSimulationById = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id).populate(
    'createdBy',
    'name email',
  )

  if (simulation) {
    return res.json(simulation)
  } else {
    res.status(404)
    throw new Error('❌ Simulation non trouvée ❌')
  }
})

// @desc create installation
// @route POST /api/installations
// @access Private
const createSimulation = asyncHandler(async (req, res) => {
  const newSimulation = new Simulation({
    address: 'Aucune adresse renseignée',
  })
  try {
    const createdSimulation = await newSimulation.save()
    console.log(createdSimulation)
    res.status(201).json(createdSimulation)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Erreur lors de la création de la simulation' })
  }
})

// @desc Update an installation
// @route PUT /api/installations
// @access Private
const updateSimulation = asyncHandler(async (req, res, next) => {
  console.log('Received body:', req.body)

  const idToUpdate = req.body.simulationId

  if (!idToUpdate) {
    return res.status(400).json({ success: false, message: 'No ID provided' })
  }

  // Retirez le champ createdBy de req.body
  const { createdBy, ...updateData } = req.body

  console.log('LOG IN CONTROLLER : Data to Update:', updateData)

  try {
    const simulation = await Simulation.findByIdAndUpdate(
      idToUpdate,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!simulation) {
      console.log('simulation not found')
      return res
        .status(404)
        .json({ success: false, message: 'Simulation not found' })
    }

    console.log('Updated simulation:', simulation)

    res.status(200).json({
      success: true,
      data: simulation,
    })
  } catch (error) {
    console.error('Error updating simulation:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
})

// @desc delete a installation
// @route DELETE /api/installations
// @access Private
const deleteSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id)
  if (simulation) {
    await simulation.deleteOne({ _id: simulation._id })
    res.status(200).json({ message: 'Simulation supprimé' })
  } else {
    res.status(404)
    throw new Error('simulation non trouvé')
  }
})

export {
  getSimulations,
  getSimulationById,
  createSimulation,
  updateSimulation,
  deleteSimulation,
}
