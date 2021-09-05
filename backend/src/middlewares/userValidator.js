

async function validateUser(req,res,next){
    const {headers} = req
    console.log("OK!"); 
    try{
        try{
            if(JSON.parse(headers.admin) == true){
                next();
            }
            else{
                res.send({ error : -1, descripcion: `${req.originalUrl} Not authorized`});
                throw new Error("User is not admin!");
            }
        }
        catch(error){
            res.send({ error : -1, descripcion: `${req.originalUrl} Not authorized`});
            throw new Error("User is not admin!");
        }
    }
    catch(error){
        next(error)
    }
}

export default validateUser;