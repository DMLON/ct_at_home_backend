

async function validateUser(req,res,next){
    const {headers} = req
    try{
        if(JSON.parse(headers.admin) == true)
            next();
        else{
            throw new Error("User is not admin!");
        }
    }
    catch(error){
        next(error)
    }
}

export default validateUser;