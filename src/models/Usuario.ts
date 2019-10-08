import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUsuario extends Document {
    nombre: string;
    apellido: string;
    email: string;
    folio: string;
    direccion: string;
    telefono: string;
    encryptFolio(folio: string): Promise<string>;
    validateFolio(folio: string): Promise<boolean>; 
}

const UsuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario']},
    apellido: { type: String, required: [true, 'El apellido es necesario']},
    email: { type: String, unique: true, required: [true, 'El email es necesario'], lowercase: true },
    folio: { type: String, unique:true, required: [true, 'El folio es necesario'] },
    direccion: { type: String },
    telefono: { type: String },
});
// Método para cifrar el folio
UsuarioSchema.methods.encryptFolio = async (folio: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(folio, salt);
};
// Método para comparar el folio recibido con la que esta en la bd
UsuarioSchema.methods.validateFolio = async function (folio: string): Promise<boolean> {
    return await bcrypt.compare(folio, this.folio);
}

export default model<IUsuario>('Usuario', UsuarioSchema);