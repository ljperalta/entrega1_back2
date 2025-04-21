const User = require('../models/user');

class loginManager
{
  async login(user, password) {
      try {
          const foundUser = await User.findOne({ username: user });
          
          if (!foundUser || foundUser.password !== password) {
          return false; // Usuario no encontrado o contraseña incorrecta
          }

          return true; // Autenticación exitosa

      } catch (err) {
          console.error("Error en login:", err);
          return res.json({ ok: false, message: "Error interno del servidor" });
      }
  }

  async registrar(user, password){
      console.log ('########22 ', user, password);
    try {
      const userExist = await User.findOne({ user });
      if (userExist) {
        return ({ ok: false, text: 'Usuario ya registrado' });
      }

      const newUser = new User({ email: 'user', password: 'password', role: 'user', cart: 39, age: 40, first_name: 'Juan', last_name: 'Pérez' });
      await newUser.save();

      return ({ ok: true, text: 'Usuario registrado con éxito' });
    } catch (err) {
      console.error(err);
      return ({ ok: false, text: 'Error del servidor' });
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

const user = new loginManager();

module.exports =  {
                    Login: async () => await user.login(),
                    Registrar: async () => await user.registrar(),  
                    Logout: async () => await user.logout()
                  }