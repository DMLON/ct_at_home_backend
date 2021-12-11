

async function validateUser(req,res,next){
    
    try{
        if(!req.user){
            // res.send({ error : -1, descripcion: `${req.originalUrl} Not authorized`});
            throw new Error("User is not admin!");
        }
        try{
            if(req.user.isAdmin == true){
                next();
            }
            else{
                // res.send({ error : -1, descripcion: `${req.originalUrl} Not authorized`});
                throw new Error("User is not admin!");
            }
        }
        catch(error){
            // res.send({ error : -1, descripcion: `${req.originalUrl} Not authorized`});
            throw new Error("User is not admin!");
        }
    }
    catch(error){
        res.send({ error : -1, descripcion: `${req.originalUrl} Not authorized - ${error}`});
        // next({error:error.message})
    }
}

export default validateUser;