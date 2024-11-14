"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJWT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const types_d_users_1 = __importDefault(require("../modelos/types_d_users"));
class authJWT {
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _SECRET = 'winer+jwt';
                console.log("verifyToken");
                //const token = await req.headers.authorization.split(' ')[1]; // Obtener el token de la cabecera
                const token = req.header("winer-access-token");
                if (!token) {
                    console.log("no token provided");
                    return res.status(403).json({ message: "No token provided" });
                }
                console.log("token provided");
                try {
                    const decoded = jwt.verify(token, _SECRET);
                    console.log("Verified correctly");
                    req. = decoded.id;
                    console.log(req.);
                    const user = yield types_d_users_1.default.findById(req.types_d_usersid, { password: 0 });
                    if (!user)
                        return res.status(404).json({ message: "No user found" });
                    console.log("User found");
                    return next();
                }
                catch (error) {
                    console.log("Error when decoding token: " + error);
                    return res.status(401).json({ message: "Unauthorized! Invalid Token" });
                }
            }
            catch (error) {
                console.log("Internal server errror: " + error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    ;
}
exports.authJWT = authJWT;
