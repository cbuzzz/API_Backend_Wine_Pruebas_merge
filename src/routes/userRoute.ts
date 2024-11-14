import express from 'express';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUser,
  logIn,
  updateUser,
} from '../controllers/userControllers';
import authJWT from '../middlewares/authJWT'; // Importa la clase

const auth = new authJWT(); // Crea una instancia de la clase para usar las funciones de authJWT.ts
const router = express.Router();

// Ruta para crear un nuevo usuario
router.route('/')
  .post(createUser);

// Ruta para obtener, actualizar o eliminar usuario por ID
router.route('/:id')
  .get(auth.verifyToken,auth.isAdmin, findUser) // Validación de Token para obtener usuario
  .put(auth.verifyToken,auth.isAdmin, updateUser) // Validación de Token para actualizar usuario
  .delete(auth.verifyToken, auth.isAdmin, deleteUser); // Validación de Token y Admin para eliminar usuario

// Ruta para obtener todos los usuarios
router.route('/all')
  .post(auth.verifyToken, auth.isAdmin, findAllUsers); // Validación de Token y Admin para obtener todos los usuarios

// Ruta para iniciar sesión
router.route('/logIn')
  .post(logIn); // No se necesita verificación de token aquí


export default router;
