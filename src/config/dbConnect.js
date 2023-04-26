import mongoose from "mongoose";

mongoose.connect("mongodb+srv://wesleymoraes:Tuco0periquito@chatbotc.uf9xcbc.mongodb.net/ChatBotC")

let db = mongoose.connection

export default db