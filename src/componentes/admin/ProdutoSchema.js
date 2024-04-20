
import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
    id: Yup.string(),
    nome: Yup.string().required().max(50),
    imgUrl: Yup.string().required(),
    preco: Yup.number().required(),
    descricao: Yup.string().required().max(500),
});