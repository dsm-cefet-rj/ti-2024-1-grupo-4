import * as yup from 'yup';
import { ptForm } from 'yup-locale-pt';

/**
 * Schema Yup para a validação de dados de forms sobre instrucçoes do pedido
 */
yup.setLocale(ptForm)


export let formsSchema = yup.object().shape({
    instrucaoPedido: yup.string().notRequired(),

})