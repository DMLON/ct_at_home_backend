

async function isUserAdmin(req,res,next){
    
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
        next({ status: 401,message: `${req.originalUrl} Not authorized - ${error.message}`});
    }
}

export default isUserAdmin;