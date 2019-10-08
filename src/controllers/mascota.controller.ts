import {Request, Response, response} from 'express';
import Mascota, {IMascota} from '../models/Mascota';

// ===================================
// Obtener todas las Mascotas
// ===================================
export const todos = async (req: Request, res: Response) => {

    await Mascota.find({})
                 .populate('usuario', 'nombre apellido email')
                 .exec(
                    (err, mascotas) => {
                        if (err) {
                            return res.status(500).json({
                               ok: false,
                               mensaje: 'Error cargando mascotas',
                               errors: err
                            });
                        }

                        res.status(200).json({
                            ok: true,
                            mascotas: mascotas
                        });
                    });
};

// ===================================
// Crear nueva Mascota
// ===================================
export const registro = async (req: Request, res: Response) => {
    // Creando una mascota
    const mascotas: IMascota = new Mascota({
        especie          : req.body.especie,
        nombre           : req.body.nombre,
        fechaNacimiento  : req.body.fechaNacimiento,
        raza             : req.body.raza,
        peso             : req.body.peso,
        sexo             : req.body.sexo,
        color            : req.body.color,
        usuario          : req.usuarioId
    });
    
    // Guardamos el nuevo usuario
    const mascota = await mascotas.save(( err, mascotaGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear mascota',
                errors: err
            });
        }
        // Respuesta que devolvemos al Cliente que realizo la petición
        res.status(201).json({
            ok: true,
            mascota: mascotaGuardado
        });
    });
};

// ===================================
// Actualizar una Mascota
// ===================================
export const update = async (req: Request, res: Response) => {

    var id = req.params.id;
    var body = req.body;
    
    await Mascota.findById( id, (err, mascota) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar mascota'
            });
        }

        if (!mascota) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La mascota con el id' + id + ' no existe',
                errors: {message: 'No existe un mascota con ese ID'}
            });
        }

        mascota.nombre = body.nombre;
        mascota.fechaNacimiento = body.fechaNacimiento;
        mascota.raza = body.raza;
        mascota.peso = body.peso;
        mascota.sexo = body.sexo;
        mascota.color = body.color;
        mascota.senaParticular = body.senaParticular;
        mascota.usuario = req.usuarioId;
        
        mascota.save((err, mascotaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar mascota',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mascota: mascotaGuardado
            });
        });

    });
    
};
// ===================================
// Borrar una Mascota por id
// ===================================
export const eliminar = async (req: Request, res: Response) => {

    var id = req.params.id;

    await Mascota.findByIdAndDelete(id, (err, mascotaBorrado ) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar mascota',
                errors: err
            });
        }

        if (!mascotaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una mascota con ese ID',
                errors: {message: 'No existe una mascota con ese ID'}
            });
        }

        res.status(200).json({
            ok: true,
            mascota: mascotaBorrado
        }); 
    });
};
