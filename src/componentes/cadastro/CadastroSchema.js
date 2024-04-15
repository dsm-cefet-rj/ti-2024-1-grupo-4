import * as yup from 'yup';
//import { ptForm } from 'yup-locale-pt';

//setLocale(ptForm)

export const CadastroSchema = yup.object().shape(
    {
        id: yup.string(),
        email: yup.string().email().required().max(30),
        nome: yup.string().required().max(50),
        senha: yup.string().required().min(5).max(20),
        repSenha: yup.string().oneOf([yup.ref("password"), null]).required()
    }
)