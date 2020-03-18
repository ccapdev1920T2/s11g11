/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function validateEmail(email){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

const animoMiddleware = {
    validateLogin : function (req, req, next){
        const {email, password} = req.body;

        if(!email){
            return res.status(401).end('401 Unathorized error, no email');
        }
        else if(!validateEmail(email)){
            return res.status(401).end('401 Unathorized error, invalid email');
        }
        if(!password){
            return res.status(401).end('401 Unathorized error, no password');
        }
    
    next();
    
    },
    
    validateRegister : function (req, req, next){
         const {idNum, email, fName, lName, college, degree, password, conPass} = req.body;
         
        if(!idNum || !email || !fName || !lName || !college || !degree || !password || !conPass){
            return res.status(401).end('401 Unathorized error, missing input');
         }
        else if(!validateEmail(email)){
            return res.status(401).end('401 Unathorized error, invalid email');
        }
        else if(password != conPass){
            return res.status(401).end('401 Unathorized error, passwords do not match');
        }
        else next();        
    }
    
};

module.exports = animoMiddleware;