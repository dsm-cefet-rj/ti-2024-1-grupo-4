import * as yup from 'yup';
import { ptForm } from 'yup-locale-pt';

yup.setLocale(ptForm)

const erroNumMsg = "O campo deve ser um número.";
const erro = "O campo ";

export let formsSchema = yup.object().shape({
    cpfPagamento: yup.number().min(8).required('O cep é obrigatório.').typeError("O cpf é obrigatório."),
    nomePagamento: yup.string().required('O nome é obrigatório é obrigatório.'),
    nome_cartao: yup.string().required('O Nome do Titular é obrigatório'),
    num_cartao: yup.string().typeError().required('O número do cartão é obrigatório.'),
    datacartao: yup.date().required().typeError("A data é obrigatória."),
    codcartao: yup.number().required().typeError("O código de Segurança é obrigatório."),
    T_pagamento:yup.string().required()

})
