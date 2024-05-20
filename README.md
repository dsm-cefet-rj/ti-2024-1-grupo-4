# Como utilizar o programa desenvolvido

1. Instale o Node.js na sua máquina: https://nodejs.org/en
2. Instale também o json-server na sua máquina: https://www.npmjs.com/package/json-server
3. Clone o repositório na sua máquina e execute o comando no terminal do projeto: npm install
4. Após isso execute esta linha de código: npm run json-server(caso não funcionar, executar a seguinte linha de código:
   ```
   npx json-server --watch public/data/produto.json --port 5174
   [Instale o npx caso não tenha instalado por padrão com: $ npm install -g npx]
   ```
6. Abra um novo terminal para esses projeto e execute: npm run dev
7. Agora é só abir no navegador com o link que o Vite providencia no passo anterior