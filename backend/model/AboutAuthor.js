import mongoose from 'mongoose'

const AboutAuthorSchema = new mongoose.Schema({
      name: String,
      image: String,
      about: String,
      headline:String,
      role:String,
      mission:String
})

export const AboutAuthor = mongoose.model('AboutAuthor', AboutAuthorSchema)
