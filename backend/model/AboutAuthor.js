import mongoose from 'mongoose'

const AboutAuthorSchema = new mongoose.Schema({
      name: String,
      image: String,
      about: String,
      headline:String,
      role:String,
      github: String,
      instagram: String,
      linkedin: String,
      gmail: String,
      mission:String
})

export const AboutAuthor = mongoose.model('AboutAuthor', AboutAuthorSchema)
