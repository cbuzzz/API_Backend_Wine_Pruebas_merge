"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
//import toNewUser from '../extras/utils'
const router = express_1.default.Router();
router.route('/')
    .post(userControllers_1.createUser);
router.route('/:id')
    .get(userControllers_1.findUser)
    .put(userControllers_1.updateUser)
    .delete(userControllers_1.deleteUser);
router.route('/all')
    .post(userControllers_1.findAllUsers);
router.route('/logIn')
    .post(userControllers_1.logIn);
router.route('/:id/habilitacion')
    .patch(userControllers_1.toggleHabilitacion);
exports.default = router;
