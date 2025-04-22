const User = require('../models/user');

class loginManager
{
  async login(user, password) {
      try {
          const foundUser = await User.findOne({ email: user });

          if (!foundUser || foundUser.password !== password) {
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
}

const useR = new loginManager();

module.exports =  {
                    Login: async (user, password) => await useR.login(user, password),
                    Registrar: async (first_name, last_name,user, password) => await useR.registrar(first_name, last_name,user, password),  
                    Logout: async () => await useR.logout()
                  }