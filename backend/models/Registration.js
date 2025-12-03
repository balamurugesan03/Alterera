import mongoose from 'mongoose'

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    enum: [
      'MERN Full Stack',
      'Python Full Stack',
      'Data Science',
      'Java Full Stack',
      'UI/UX Design',
      'Digital Marketing'
    ]
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  paymentId: {
    type: String,
    default: null
  },
  orderId: {
    type: String,
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
})

// Index for faster queries
registrationSchema.index({ email: 1 })
registrationSchema.index({ mobile: 1 })
registrationSchema.index({ createdAt: -1 })

const Registration = mongoose.model('Registration', registrationSchema)

export default Registration
