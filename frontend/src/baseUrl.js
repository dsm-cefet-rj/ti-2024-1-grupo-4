//json-server port
//export const baseUrl = 'http://localhost:5174'

//backend port
export const baseUrl = 'http://localhost:3000'


//payload ddo json server de usuario

/**
 * Payload do userslice antes do fetch
 * email: "shasha@shasha"
 * senha: "shasha"
 * 
 */

/**
 * Este é o usuario do userslice apos o fetch
 * Array [ {…} ]
​
0: Object { id: "ae6b", nome: "shasha", email: "shasha@shasha", … }
​​
admin: false
​​
email: "shasha@shasha"
​​
id: "ae6b"
​​
nome: "shasha"
​​
senha: "shasha"
​​
<prototype>: Object { … }
​
length: 1
​
<prototype>: Array []
 */

/** Este é o result payload do login
 * Object { id: "ae6b", nome: "shasha", email: "shasha@shasha", senha: "shasha", admin: false }
​
admin: false
​
email: "shasha@shasha"
​
id: "ae6b"
​
nome: "shasha"
​
senha: "shasha"
 * 
 * 
 */

/**  action users/fetchUSerByEmail/pending
 * prev >>
 * ​
 * 
Object { userSlice: {…}, cartSlicer: {…}, produtosSlice: {…}, compraSlice: {…}, enderecoSlice: {…}, pedidoSlice: {…} }
cartSlicer: Object { products: [] }
​
compraSlice: Object { ids: [], step: 0, status: "not_loaded", … }
​
enderecoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
pedidoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
produtosSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
userSlice: Object { ids: [], entities: {}, status: "not_loaded", … }

aaction>>
 
Object { type: "users/fetchUSerByEmail/pending", payload: undefined, meta: {…} }
​
meta: Object { arg: {…}, requestId: "HDM8KPPHD7F62oD9PC14l", requestStatus: "pending" }
​
payload: undefined
​
type: "users/fetchUSerByEmail/pending"

next state >>

Object { userSlice: {…}, cartSlicer: {…}, produtosSlice: {…}, compraSlice: {…}, enderecoSlice: {…}, pedidoSlice: {…} }
​​
cartSlicer: Object { products: [] }
​
compraSlice: Object { ids: [], step: 0, status: "not_loaded", … }
​
enderecoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
pedidoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
produtosSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
userSlice: Object { ids: [], entities: {}, status: "not_loaded", … }

 * 
 */


/** action users/fetchUSerByEmail/fulfilled
 * 
 prev>>
 Object { userSlice: {…}, cartSlicer: {…}, produtosSlice: {…}, compraSlice: {…}, enderecoSlice: {…}, pedidoSlice: {…} }
​
cartSlicer: Object { products: [] }
​
compraSlice: Object { ids: [], step: 0, status: "not_loaded", … }
​
enderecoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
pedidoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
produtosSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
userSlice: Object { ids: [], entities: {}, status: "not_loaded", … }

 action>>

Object { type: "users/fetchUSerByEmail/fulfilled", payload: {…}, meta: {…} }
​
meta: Object { arg: {…}, requestId: "HDM8KPPHD7F62oD9PC14l", requestStatus: "fulfilled" }
​
payload: Object { id: "ae6b", nome: "shasha", email: "shasha@shasha", … }
​
type: "users/fetchUSerByEmail/fulfilled"

 next state>>

Object { userSlice: {…}, cartSlicer: {…}, produtosSlice: {…}, compraSlice: {…}, enderecoSlice: {…}, pedidoSlice: {…} }
​
cartSlicer: Object { products: [] }
​
compraSlice: Object { ids: [], step: 0, status: "not_loaded", … }
​
enderecoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
pedidoSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
produtosSlice: Object { ids: [], entities: {}, status: "not_loaded", … }
​
userSlice: Object { ids: [], entities: {}, status: "saved", … } 

 
 * 
 */
//payload do backend de usuario