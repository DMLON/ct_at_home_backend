

async function validateUser(req,res,next){
    
    try{
        if(!req.user){
            throw new Error("User is not admin!");
        }
        try{
            if(req.user.isAdmin == true){
                next();
            }
            else{
                throw new Error("User is not admin!");
            }
        }
        catch(error){
            throw new Error("User is not admin!");
        }
    }
    catch(error){
        next({ status: "error",descripcion: `${req.originalUrl} Not authorized - ${error}`});
    }
}

export default validateUser;