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
        const { user, password } = req.body;
        console.log('########'+ user, password);
        const result = await Registrar(user, password);
        console.log('####result####'+ result);
    }catch (error) {
        res.status(500).json("Error en servidor: " + error.message);
    }
}
const logout = async (req, res) => {
    console.log('+++++++++++++++');
    try {
        const result = await Logout(req, res);
        return res.json({ ok: true, message: "Logout exitoso" });
    } catch (error) {
        res.status(500).json("Error en servidor: " + error.message);
    }
};

module.exports = {
    loginn: login,
    registrarr: registrar,
    logoutt: logout
};
