
import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
    id: Yup.string(),
    nome: Yup.string().required().max(50).min(10),
    imgUrl: Yup.string().required(),
    preco: Yup.number().required().min(1),
    descricao: Yup.string().required().max(500).min(10),
});