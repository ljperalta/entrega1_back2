const { Login, Registrar, Logout } = require('../managers/login.js');

const login = async (req, res) => {
    const { user, password } = req.query;
    try {
        const result = await Login(user, password);
        
        if(result)
            return res.json({ ok: true, message: "Inicio de sesión exitoso", user: user }); 
        return res.json({ ok: false, message: "Usuario o Contraseña incorrecta" });
        
    } catch (error) {
        return res.json("Error en servidor: " + error.message);
    }
};

const registrar = async (req, res) => {
    try {
        const { first_name, last_name, user, password } = req.body;
        
        const result = await Registrar(first_name, last_name,user, password);
        
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
