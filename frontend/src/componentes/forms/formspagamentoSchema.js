import * as yup from 'yup';
import { ptForm } from 'yup-locale-pt';

yup.setLocale(ptForm)


export let formsSchema = yup.object().shape({
    

    cpfPagamento: yup.string().typeError('O cpf erro  é obrigatório.').when(
        'T_pagamento', {
        is:(value)=> value === 'pix',
        then: (schema) => schema.length(11).required('O cpf é obrigatório.'),
        otherwise: (schema) => schema.notRequired(),
    }),
    nomePagamento: yup.string().typeError().when(
        'T_pagamento', {
        is:(value)=> value === 'pix',
        then: (schema) => schema.required('O nome é obrigatório.'),
        otherwise: (schema) => schema.notRequired(),
    }),

    nome_cartao: yup.string().typeError("O nome do Titular erro é obrigatório").when(
        'T_pagamento', {
        is:  (value) => value === 'cartao_credito' || value === 'cartao_debito',
        then: (schema) => schema.required('O Nome do Titular é obrigatório'),
        otherwise: (schema) => schema.notRequired(),
    }),
    num_cartao: yup.string().typeError().when(
        'T_pagamento', {
        is:  (value) => value === 'cartao_credito' || value === 'cartao_debito',
        then: (schema) => schema.min(13).max(16).required('O número do cartão é obrigatório.'),
        otherwise: (schema) => schema.notRequired(),
    }),
    datacartao: yup.mixed().nullable().default(null).when(
        'T_pagamento', {
        is:  (value) => value === 'cartao_credito' || value === 'cartao_debito',
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
    }),
    codcartao: yup.string().typeError("O código de Segurança erro é obrigatório.").when(
        'T_pagamento', {
        is:  (value) => value === 'cartao_credito' || value === 'cartao_debito',
        then: (schema) => schema.length(3).max(3).required(),
        otherwise: (schema) => schema.notRequired(),
    }),
    T_pagamento:yup.string().required()

})
