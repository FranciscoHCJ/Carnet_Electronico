import {Request, Response, response} from 'express';
import Usuario, { IUsuario } from '../models/Usuario';
import jwt from 'jsonwebtoken';

// ===================================
// Obtener todos los Usuarios
// ===================================
export const todos = async (req: Request, res: Response) => {
    // Filtramos los datos que necesitamos recuperar a excepcion del folio
    const usuarios = await Usuario.find({}, 'nombre apellido email direccion telefono').exec();

    res.status(200).json({
        ok: true,
        usuarios: usuarios
    });
};

// ===================================
// Crear nuevo Usuario
// ===================================
export const registro = async (req: Request, res: Response) => {
    // Creando un nuevo usuario
    const usuarios: IUsuario = new Usuario({
        nombre    : req.body.nombre,
        apellido  : req.body.apellido,
        email     : req.body.email,
        folio     : req.body.folio,
        direccion : req.body.direccion,
        telefono  : req.body.telefono
    });

    // Encryptamos el folio
    usuarios.folio = await usuarios.encryptFolio(usuarios.folio);
    
    // Guardamos el nuevo usuario
    const usuario = await usuarios.save(( err, usuarioGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        // Creando token
        const token: string = jwt.sign({_id: usuarioGuardado._id }, process.env.TOKEN_SECRET || 'tokenTest');
        
        // Respuesta que devolvemos al Cliente que realizo la petición
        res.header('auth-token', token).status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });
};
// ===================================
// Actualizar un Usuario
// ===================================
export const update = async (req: Request, res: Response) => {

    var id = req.params.id;
    var body = req.body;
    
    await Usuario.findById( id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario'
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + ' no existe',
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }

        usuario.nombre    = body.nombre;
        usuario.apellido  = body.apellido;
        usuario.email     = body.email;
        usuario.direccion = body.direccion;
        usuario.telefono  = body.telefono;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.folio = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });

    });
    
};
// ===================================
// Borrar un Usuario por id
// ===================================
export const eliminar = async (req: Request, res: Response) => {

    var id = req.params.id;

    await Usuario.findByIdAndDelete(id, (err, usuarioBorrado ) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID',
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        }); 
    });
}

// ===================================
// Iniciar Sesión
// ===================================
export const login = async (req: Request, res: Response) => {
    // Buscamos al usuario registrado en la bd
   const usuario = await Usuario.findOne({email: req.body.email});

    // Sino existe retornamos un mensaje de error
   if (!usuario) return res.status(400).json('Email ó folio es incorrecto');

   // Validamos que el folio sea correcto
   const correctFolio: boolean = await usuario.validateFolio(req.body.folio);
   
   // Sino existe retornamos un mensaje de error
   if(!correctFolio) return res.status(400).json('Folio Invalido');
   
   // Creamos un token para el inicio de sesión con tiempo de expiración de un día
   const token: string = jwt.sign({_id: usuario._id}, process.env.TOKEN_SECRET || 'tokenTest', {
       expiresIn: 60 * 60 * 24
   }); 

   // Devolvemos la información del usuario    
   res.header('auth-token', token).json(usuario);
    
};

export const profile = async (req: Request, res: Response) => {
    const usuario = await Usuario.findById(req.usuarioId, {folio: 0});

    if(!usuario) return res.status(400).json('Usuario no encontrado');
    res.json(usuario);

};