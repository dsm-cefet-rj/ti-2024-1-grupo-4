import * as yup from 'yup';
import { ptForm } from 'yup-locale-pt';

/**
 * Schema Yup para a validação de dados de forms sobre Endereco
 */
yup.setLocale(ptForm)

const erroNumMsg = "O campo deve ser um número.";

export let formsSchema = yup.object().shape({
    CEP: yup.number().min(8).required('O cep é obrigatório').typeError(erroNumMsg),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    numeroEndereco: yup.number().required('O número de Endereço é obrigatório').typeError(erroNumMsg),
    complemento: yup.string().typeError('precisa'),//.required('O complemento é obrigatório')
    bairro: yup.string().notRequired().max(30).required("O bairro é obrigatório"),
    instrucaoPedido: yup.string().notRequired(),

})