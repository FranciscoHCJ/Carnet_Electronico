import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://FranciscoHC:Carolinayjuan123*45@cluster0-pbius.mongodb.net/carnetDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Base de Datos: online'))
    .catch(err => console.log(err));