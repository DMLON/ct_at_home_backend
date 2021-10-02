import mongoose from 'mongoose'
import {connectionStringTest} from "./configs/mongodb"
mongoose.connect(
	connectionStringTest,
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