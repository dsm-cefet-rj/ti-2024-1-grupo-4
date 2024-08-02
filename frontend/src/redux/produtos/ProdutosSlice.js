import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl';
import { toast } from 'react-toastify';

/**
 * @module produtos/ProdutoSlice
 */

const produtoAdapter = createEntityAdapter();

const initialState = produtoAdapter.getInitialState({
    status: 'not_loaded',
    error:null
});

/**
 * @function
 * @description Faz o fetch dos produtos no banco de dados
 * @returns {Array} - Lista dos produtos no banco de dados
 */
export const fetchProduto = createAsyncThunk('produto/fetchProduto', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/produto`);
});
/**
 * Tipo da entidade 'produto'
 * @typedef {Object} produto
 * @property {string} imgUrl - url da imagem do produto
 * @property {string} nome - nome do produto
 * @property {string} descricao - descrição do produto
 * @property {number} preco - preço do produto
 */
/**
 * @function
 * @description Faz a remoção de um produto no banco de dados por id
 * @param {produto} produto - objeto produto a remover
 * @returns {string} - id do produto removido
 */
export const deleteProdutoServer = createAsyncThunk('produto/deleteProdutoServer', async (produto, {getState}) => {
    await httpDelete(`${baseUrl}/produto/${produto.id}`);
    toast.warning(produto.nome + " removido!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return produto.id;
});

/**
 * @function
 * @description Faz a adição de um produto no banco de dados
 * @param {produto} produto - objeto produto a adicionar
 * @returns {produto} - produto adicionado
 */
export const addProdutoServer = createAsyncThunk('produto/addProdutoServer', async (produto, {getState}) => {

  toast.success(produto.nome + " criado com sucesso!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return await httpPost(`${baseUrl}/produto`, produto);
});
// ver o vídeo para ver se o código está ok

/**
 * @function
 * @description Faz a atualização de um produto no banco de dados
 * @param {produto} produto - objeto produto a atualizar
 * @returns {produto} - produto adicionado
 */
export const updateProdutoServer = createAsyncThunk('produto/updateProdutoServer', async (produto, {getState}) => {
      toast.info(produto.nome + " foi alterado!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return await httpPut(`${baseUrl}/produto/${produto.id}`, produto);
});

/**
 * @function
 * @description Slicer do Produto com os extraReducers
 */
export const produtoSlice = createSlice({
    name: 'produto',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchProduto.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(fetchProduto.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchProduto.fulfilled, (state, action) => {
            state.status = 'loaded';
            produtoAdapter.setAll(state, action.payload);
          })
          .addCase(deleteProdutoServer.fulfilled, (state,action) => {
            state.status = 'deleted';
            produtoAdapter.removeOne(state, action.payload);
          })
          .addCase(addProdutoServer.fulfilled, (state,action) => {
            state.status = 'saved';
            produtoAdapter.addOne(state,action.payload);
          })
          .addCase(updateProdutoServer.fulfilled, (state, action) => {
            state.status = 'saved';
            produtoAdapter.upsertOne(state, action.payload);
          })

        }

});

export const {
    selectAll: selectAllProduto,
    selectById: selectProdutoById,
    selectIds: selectProdutosIds
} = produtoAdapter.getSelectors(state => state.produtos)
export default produtoSlice.reducer
