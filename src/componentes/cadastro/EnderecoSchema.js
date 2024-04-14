import {string, object, number} from 'yup';
//import { ptForm } from 'yup-locale-pt';

//setLocale(ptForm)

export const CadastroSchema = object().shape(
    {
        id: string(),
        CEP:number().required().max(8),
        logradouro:string(),
        complemento:string().required(),
        numero: number().required().max(5)
    }
)