const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/utils.js');

class loginManager
{
  async login(user, password) {
      try {
          const foundUser = await User.findOne({ email: user });

          if (!foundUser || !comparePassword(foundUser, password)) {
          return false; // Usuario no encontrado o contraseña incorrecta
          }

          return true; // Autenticación exitosa

      } catch (err) {
          console.error("Error en login:", err);
          return res.json({ ok: false, message: "Error interno del servidor" });
      }
  }

  async registrar(first_name, last_name, user, password){
    try {
      const userExist = await User.findOne({ email: user });
      if (userExist) {
        return 'existente'; // El usuario ya existe
      }
      password = hashPassword(password); // Hashear la contraseña
      const newUser = new User({ email: user, password: password, role: 'user', cart: 39, age: 40, first_name: first_name, last_name: last_name });
      await newUser.save();

      return 'nuevo'; // Usuario registrado exitosamente
    } catch (err) {
      console.error(err);
      return false; // Error al registrar el usuario
    }
  }

  async logout(){
      req.session.destroy(err => {
          if (!err) {
              res.clearCookie('connect.sid');
              res.send('Logout successful');
          }else {
              res.status(500).send({status: 'Error', body: err});
          }
      });
  }

  generateToken(user) {
      const payload = { id: user._id, email: user.email };
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
  verifyToken(token) {
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          return decoded;
      } catch (err) {
          console.error("Error al verificar el token:", err);
          return null;
      }
  } 
}

const useR = new loginManager();

module.exports =  {
                    Login: async (user, password) => await useR.login(user, password),
                    Registrar: async (first_name, last_name,user, password) => await useR.registrar(first_name, last_name,user, password),  
                    Logout: async () => await useR.logout()
                  }