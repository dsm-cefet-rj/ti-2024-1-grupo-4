import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const productsAdapter = createEntityAdapter();

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('./data/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await fetch('./data/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    toast.success(product.nome + " adicionando com sucesso!", {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 4000,
      }
    );
    const data = await response.json();
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (productId) => {
    const response = await fetch(`./data/products.json?id=${productId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to remove product');
    }
    toast.warning(productId + " removido com sucesso!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    }
  );
    return { id: productId };
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product) => {
    const response = await fetch(`./data/products.json?id=${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    toast.info(product.nome + " foi alterado ", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
  });
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        productsAdapter.addOne(state, action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        productsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        });
      });
  },
});

export default productSlice.reducer;
