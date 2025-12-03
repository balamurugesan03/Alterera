import express from 'express'
import Registration from '../models/Registration.js'

const router = express.Router()


router.post('/', async (req, res) => {
  try {
    const { name, degree, mobile, email, course, amount } = req.body

    const existingRegistration = await Registration.findOne({ email })
    if (existingRegistration) {
      return res.status(400).json({
        status: 'error',
        message: 'A registration with this email already exists'
      })
    }

   
    const registration = new Registration({
      name,
      degree,
      mobile,
      email,
      course,
      amount
    })

    await registration.save()

    res.status(201).json({
      status: 'success',
      message: 'Registration successful! We will contact you soon.',
      data: {
        id: registration._id,
        name: registration.name,
        course: registration.course,
        email: registration.email
      }
    })
  } catch (error) {
    console.error('Registration Error:', error)

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        status: 'error',
        message: messages.join(', ')
      })
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to process registration. Please try again.'
    })
  }
})

// GET /api/registrations - Get all registrations (Admin use)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, course, status } = req.query

    // Build filter
    const filter = {}
    if (course) filter.course = course
    if (status) filter.status = status

    // Pagination
    const skip = (page - 1) * limit

    const registrations = await Registration.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Registration.countDocuments(filter)

    res.json({
      status: 'success',
      data: registrations,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Fetch Registrations Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch registrations'
    })
  }
})


router.get('/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      })
    }

    res.json({
      status: 'success',
      data: registration
    })
  } catch (error) {
    console.error('Fetch Registration Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch registration'
    })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      })
    }

    res.json({
      status: 'success',
      message: 'Registration updated successfully',
      data: registration
    })
  } catch (error) {
    console.error('Update Registration Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to update registration'
    })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id)

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      })
    }

    res.json({
      status: 'success',
      message: 'Registration deleted successfully'
    })
  } catch (error) {
    console.error('Delete Registration Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete registration'
    })
  }
})

export default router
