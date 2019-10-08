import {Schema, model, Document} from 'mongoose';

const MascotaSchema = new Schema ({
    especie: {type: String, required: true},
    nombre: {type: String, required: true},
    fechaNacimiento: {type: String, required: true},
    raza: {type: String, required: true},
    peso: {type: String},
    sexo: {type: String, required: true},
    foto: {type: String},
    color: {type: String},
    senaParticular: {type: String},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'Debe de existir una referencia a un usuario']}
});

export interface IMascota extends Document {
    especie: String;
    nombre: String;
    fechaNacimiento: String;
    raza: String;
    peso: String;
    sexo: String;
    foto: String;
    color: String;
    senaParticular: String;
    usuario: String;
}

export default model<IMascota>('Mascota', MascotaSchema); 