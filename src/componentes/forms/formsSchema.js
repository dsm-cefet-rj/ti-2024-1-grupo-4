import * as yup from 'yup';
import { ptForm } from 'yup-locale-pt';

yup.setLocale(ptForm)

const erroNumMsg = "O campo deve ser um número.";

export let formsSchema = yup.object().shape({
    cep: yup.number().min(8).required('O cep é obrigatório').typeError(erroNumMsg),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    numEnd: yup.number().required('O número de Endereço é obrigatório').typeError(erroNumMsg),
    CompEnd: yup.string().typeError('precisa').required('O complemento é obrigatório'),
    bairro: yup.string().notRequired().max(30).required("O bairro é obrigatório"),
    instrucao_pedido: yup.string().notRequired(),

})