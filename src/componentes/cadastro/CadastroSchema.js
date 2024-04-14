import {string, object, number, setLocale} from 'yup';
import {ptForm } from 'yup-locale-pt';

setLocale(ptForm)

export let pprojetoSchema = object().shape(
    {
        id: string(),
        nome: string().required().max(30),
        sigla: string().required().max(5)
    }
)