import * as yup from 'yup';
//import { ptForm } from 'yup-locale-pt';

//setLocale(ptForm)

export const EnderecoSchema = object().shape(
    {
        id: yup.string(),
        CEP:yup.number().required().max(8),
        logradouro:yup.string().required(),
        complemento:yup.string().required(),
        numero: yup.number().positive().required()
    }
)