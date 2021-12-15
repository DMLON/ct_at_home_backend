import mongoose from 'mongoose'
import {connectionString} from "./configs/mongodb.js"
mongoose.connect(
	connectionString,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (!err) {
			console.log('Connected to the database')
		} else {
			console.log(err)
		}
	},
)

export default mongoose