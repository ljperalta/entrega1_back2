const Login = require('../managers/login.js');

const login = async (req, res) => {
    const { user, password } = req.body;
    try {
        const result = await Login.login(user, password);
        
        if(result){
            const token = Login.generateToken(result);
            return res.header('Authorization', token).json({ ok: true, message: "Inicio de sesión exitoso", user: user, token: token }); 
        }
        return res.json({ ok: false, message: "Usuario o Contraseña incorrecta" });
        
    } catch (error) {
        return res.json("Error en servidor: " + error.message);
    }
};

const registrar = async (req, res) => {
    try {
        const { first_name, last_name, user, password } = req.body;
        
        const result = await Login.registrar(first_name, last_name,user, password);
        
        if(result==='nuevo') return res.json({ ok: true, message: "Registro exitoso", user: user });
        if(result==='existente') return res.json({ ok: false, message: "El usuario ya existe" });
        return res.json({ ok: false, message: "Error al registrar el usuario" });  
    }catch (error) {
        res.status(500).json("Error en servidor: " + error.message);
    }
}

module.exports = {
    loginn: login,
    registrarr: registrar
};
