import {string, object} from 'yup';
//import { ptForm } from 'yup-locale-pt';

//setLocale(ptForm)

export const CadastroSchema = object().shape(
    {
        id: string(),
        email: string().required().max(30),
        nome: string().required().max(50),
        senha: string().required().max(20)
    }
)