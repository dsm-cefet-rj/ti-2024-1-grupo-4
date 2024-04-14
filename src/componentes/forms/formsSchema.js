import * as yup from 'yup';
//import { ptForm } from 'yup-locale-pt';

//yup.setLocale(ptForm)

const erroNumMsg = "O campo deve ser um número.";
const erro = "O campo ";

export let formsSchema = yup.object().shape({
    user: yup.string().required('O usuário é obrigatório.'),
    password: yup.string().required('A senha é obrigatória.').min(8),
    cep: yup.number().min(8).required('O cep é obrigatório.'),
    logradouro: yup.string().required('Logradouro é obrigatório.'),
    numEnd: yup.number().required('O número de Endereço é obrigatório'),
    compEnd: yup.string().typeError('precisa').required('O complemento é obrigatório.'),
    bairro: yup.string().notRequired().max(30),
    T_pagamento: yup.string().required(),
    num_cartao: yup.number().required(),
    nome_cartao: yup.string().max(30),
    datacartao: yup.number().required(),
    codcartao: yup.number().required(),
    instrucao_pedido: yup.string().notRequired(),
})


/**
 * 
 *    cep: yup.number().min(8).required('O cep é obrigatório.'),
    logradouro: yup.string().required('Logradouro é obrigatório.'),
    numEnd: yup.number().required('O número de Endereço é obrigatório'),
    compEnd: yup.string().typeError('precisa').required('O complemento é obrigatório.'),
    bairro: yup.string().notRequired().max(30),
    T_pagamento: yup.string().required(),
    num_cartao: yup.number().required(),
    nome_cartao: yup.string().max(30),
    datacartao: yup.number().required(),
    codcartao: yup.number().required(),
    instrucao_pedido: yup.string().notRequired(),
 */

/*
const [step, setStep] = useState(0);
const [user, setUser] = useState('');
const [password, setPassword] = useState('');
const [cep, setCep] = useState('');
const [logradouro, setLogradouro] = useState('');
const [numEnd, setNumEnd] = useState('');
const [CompEnd, setCompEnd] = useState('');
const [T_pagamento, setT_pagamento] = useState('');
const [num_cartao, setNum_cartao] = useState('');
const [nome_cartao, setNome_cartao] = useState('');
const [datacartao, setDatacartao] = useState('');
const [codcartao, setCodcartao] = useState('');
const [lista_pedido_carrinho, setLista_pedido_carrinho] = useState('');
*/
