# Sua Aplicação de 3 Camadas com Docker

Este projeto implementa uma arquitetura de aplicação em três camadas (Frontend, Backend e Banco de Dados) utilizando Docker para orquestração e isolamento dos serviços. O objetivo é fornecer um ambiente de desenvolvimento robusto e replicável para sua aplicação web.

---

## Sumário

* [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
* [Pré-requisitos](#pré-requisitos)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Configuração do Ambiente](#configuração-do-ambiente)
* [Como Rodar a Aplicação](#como-rodar-a-aplicação)
* [Acessando a Aplicação e APIs](#acessando-a-aplicação-e-apis)
* [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
* [Resolução de Problemas Comuns](#resolução-de-problemas-comuns)
* [Contribuição](#contribuição)
* [Licença](#licença)

---

## Visão Geral da Arquitetura

Este projeto é composto por três serviços principais, cada um rodando em um container Docker separado:

1.  **Frontend (React & Nginx):**
    * **React:** A interface do usuário da aplicação.
    * **Nginx:** Serve os arquivos estáticos do React (HTML, CSS, JavaScript compilados) e atua como um **proxy reverso**, encaminhando as requisições para a API do Backend.
    * **Exposição Externa:** Acessível na porta `8080` do seu host.

2.  **Backend (Node.js & Express):**
    * **Node.js:** Responsável pela lógica de negócios e exposição das APIs.
    * **Express:** Framework web para Node.js, utilizado para criar as rotas da API.
    * **Comunicação Interna:** Escuta na porta `5000` **internamente** na rede Docker e se comunica com o banco de dados.

3.  **Banco de Dados (PostgreSQL):**
    * **PostgreSQL 15:** Sistema de gerenciamento de banco de dados relacional.
    * **Persistência:** Utiliza um volume Docker nomeado (`pgdata`) para garantir a persistência dos dados.
    * **Comunicação Interna:** Acessível pelo Backend através do nome de serviço `db` na porta `5432`.

---

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em seu ambiente de desenvolvimento:

* **Docker Desktop:** Inclui Docker Engine, Docker CLI, Docker Compose.
    * [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
* **Node.js e npm:** Para instalar as dependências e construir os projetos React e Node.js localmente.
    * [Download Node.js](https://nodejs.org/en/download/) (Recomendado v18 LTS)
* **Git:** Para clonar o repositório e gerenciar o controle de versão.
    * [Download Git](https://git-scm.com/downloads)
* **Postman (Opcional):** Para testar suas APIs.
    * [Download Postman](https://www.postman.com/downloads/)
* **Um navegador (Safari, Chrome, Firefox):** Para acessar a aplicação web.
---

---

## Estrutura do Projeto

A estrutura de diretórios do projeto é a seguinte:

```bash
.
├── .env.development
├── docker-compose.yml
├── .gitignore
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── db.js
│   │   ├── query.sql
│   │   └── runme.js
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── package.json
    ├── package-lock.json
    ├── nginx.conf
    └── Dockerfile
---

## Configuração do Ambiente

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio # Navegue para a pasta raiz do projeto
    ```
    *(Lembre-se de substituir `seu-usuario/seu-repositorio.git` pela URL real do seu repositório no GitHub.)*

2.  **Crie o Arquivo de Variáveis de Ambiente:**
    * Na pasta raiz do projeto (`seu-repositorio/`), crie um arquivo chamado **`.env.development`**.
    * Adicione as seguintes variáveis com seus próprios valores seguros (essas credenciais serão usadas pelo PostgreSQL e pelo Backend para conectar ao DB):

    ```ini
    POSTGRES_USER=myuser
    POSTGRES_PASSWORD=mysecretpassword
    POSTGRES_DB=mydb
    ```
    * **Importante:** Este arquivo `.env.development` está listado no `.gitignore` e **NUNCA** deve ser enviado para o GitHub por conter informações sensíveis.

3.  **Instale as Dependências Node.js Localmente:**
    * **Para o Backend:**
        ```bash
        cd backend
        npm install
        cd ..
        ```
    * **Para o Frontend:**
        ```bash
        cd frontend
        npm install
        cd ..
        ```
    * Este passo garante que você tenha as ferramentas e dependências (`react-scripts`, `nodemon`, etc.) instaladas em sua máquina local para tarefas como `npm run build` e para garantir que o Docker possa usar o `package-lock.json`.

---

## Como Rodar a Aplicação

Para iniciar todos os serviços (PostgreSQL, Backend, Frontend Nginx):

1.  **Navegue para a pasta raiz do projeto:**
    ```bash
    cd /Learning/Development # Ou o caminho atual do seu projeto
    ```

2.  **Pare e remova quaisquer containers ou imagens antigos do projeto (se houver):**
    * Este comando garante um ambiente limpo para o novo build. **ATENÇÃO: Isso removerá os dados do seu banco de dados PostgreSQL se eles existirem!**
        ```bash
        docker-compose down -v --rmi all
        docker system prune -a --volumes # Limpeza mais agressiva para garantir
        ```

3.  **Construa as imagens Docker (Backend e Frontend):**
    * O `--no-cache` força uma reconstrução completa para garantir que todas as dependências e arquivos mais recentes sejam incluídos.
        ```bash
        docker-compose build --no-cache
        ```

4.  **Inicie os serviços Docker:**
    * O `--env-file .env.development` garante que as variáveis de ambiente do seu banco de dados sejam lidas.
    * O `-d` inicia os containers em modo *detached* (em segundo plano).
        ```bash
        docker-compose --env-file .env.development up -d
        ```

5.  **Verifique o status dos containers:**
    ```bash
    docker ps
    ```
    Você deve ver `db`, `backend` e `frontend` com status `Up`.

6.  **Monitore os logs:**
    * Para o Backend: `docker logs backend`
    * Para o Banco de Dados: `docker logs db`
    * Para o Frontend: `docker logs frontend`
    * Você deve ver mensagens indicando que os serviços iniciaram com sucesso (ex: "Server started on port 5000", "database system is ready to accept connections").

---

## Acessando a Aplicação e APIs

Uma vez que todos os serviços estão rodando:

* **Aplicação Frontend (React):**
    Abra seu navegador (recomenda-se Google Chrome no macOS) e acesse:
    ```
    http://<IP_DO_SEU_HOST>:8080
    ```
    * Substitua `<IP_DO_SEU_HOST>` pelo endereço IP real do seu desktop na rede local (ex: `192.168.0.53`).
    * A porta `8080` é a porta em que o Nginx está exposto em seu host.

* **API do Backend (ex: `runme-data`):**
    Para testar a API que executa a lógica do `runme.js`, acesse no navegador ou use Postman:
    ```
    http://<IP_DO_SEU_HOST>:8080/api/runme-data
    ```
    * Lembre-se que o Nginx (`frontend`) atua como proxy, encaminhando requisições para `/api` para o backend (`backend:5000`).

---

## Fluxo de Desenvolvimento

Este projeto está configurado para um fluxo de desenvolvimento eficiente:

### Alterações no Backend (Node.js)

1.  Edite qualquer arquivo em `backend/src/`.
2.  **Salve o arquivo.**
3.  Graças ao **Nodemon** e aos **volumes** no Docker Compose, o container `backend` detectará automaticamente as alterações e reiniciará o servidor Node.js.
4.  Verifique os logs do `backend` para confirmar a reinicialização. Suas alterações estarão ativas imediatamente.

### Alterações no Frontend (React)

1.  Edite qualquer arquivo em `frontend/src/` ou `frontend/public/`.
2.  **Salve o(s) arquivo(s).**
3.  **No seu terminal (no host), navegue até a pasta `frontend` (`/Learning/Development/frontend`) e execute o build do React:**
    ```bash
    npm run build
    ```
    * Isso recompilará seu aplicativo React, gerando novos arquivos otimizados na pasta `frontend/build`.
4.  **Para que o Nginx no container pegue esses novos arquivos, você precisa reconstruir e reiniciar o serviço `frontend`:**
    ```bash
    docker-compose stop frontend
    docker-compose build --no-cache frontend
    docker-compose up -d frontend
    ```
    * O `--no-cache` é essencial para garantir que o Docker copie os arquivos de build mais recentes.
5.  **No seu navegador, faça um hard refresh (Cmd+Shift+R no Mac ou Ctrl+Shift+R no Windows/Linux) ou limpe o cache para garantir que a nova versão seja carregada.**

### Alterações na Configuração do Nginx (`nginx.conf`)

1.  Edite o arquivo `frontend/nginx.conf`.
2.  **Salve o arquivo.**
3.  Você precisa reconstruir e reiniciar o serviço `frontend` para que a nova configuração seja aplicada:
    ```bash
    docker-compose stop frontend
    docker-compose build --no-cache frontend
    docker-compose up -d frontend
    ```
    * Como alternativa, se você configurar o `nginx.conf` como um volume (veja a seção [Resolução de Problemas Comuns](#resolução-de-problemas-comuns) ou use a funcionalidade `docker exec` para recarregar a configuração do Nginx: `docker exec -it <nome_do_container_frontend> nginx -s reload`).

---

## Resolução de Problemas Comuns

* **`Cannot GET /api/sua-rota` no navegador:**
    * Confirme que o Nginx está proxyando corretamente. Verifique a configuração `location /api { rewrite ^/api(.*)$ $1 break; proxy_pass http://backend:5000; }` no `frontend/nginx.conf`.
    * Certifique-se de que a rota correspondente (`/sua-rota`, **sem `/api`**) está definida no seu `backend/src/app.js` (ou arquivos de rota).
    * Teste a API diretamente do container `frontend` para o `backend`: `docker exec -it frontend sh` e depois `curl http://backend:5000/sua-rota`.

* **`Module not found: Error: Can't resolve './App.css'` (ou outro arquivo) durante `npm run build` no frontend:**
    * Verifique se o nome do arquivo (`App.css` vs `app.css`) e o caminho relativo estão corretos na pasta `frontend/src` e no seu `import` em `App.js`. Lembre-se que Linux (no Docker) é case-sensitive.

* **`sh: 1: nodemon: not found` no backend:**
    * Garanta que `nodemon` está em `devDependencies` no `backend/package.json` e que você fez um `npm install` localmente no `backend/` para gerar o `package-lock.json`.
    * Execute `docker-compose build --no-cache backend` para forçar a instalação do `nodemon` na imagem.

* **`Error: Database is uninitialized and superuser password is not specified.` no DB:**
    * Verifique que seu arquivo `.env.development` está na raiz do projeto, está bem formatado e contém valores não vazios para `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.
    * Execute `docker-compose down -v` para remover o volume de dados e `docker-compose up -d` para recriar o DB.

* **Problemas de Conectividade (`Failed to connect`, `Connection refused`) do Mac para o Host:**
    * Verifique o Firewall do seu host. Adicione uma regra de entrada para permitir tráfego TCP na porta `8080`.
    * Confirme que o Docker Desktop está rodando e a porta está mapeada corretamente (`"8080:80"` no `docker-compose.yml`).
    * Teste a conectividade com `telnet <IP_DO_SEU_HOST> 8080` no Terminal do seu Mac.

* **Navegador mostrando `about:blank` ou "Endereço Restrito":**
    * Limpe o cache do navegador (limpeza total de histórico, dados de sites).
    * Tente usar o **Google Chrome** no macOS, pois alguns navegadores (Safari, Firefox) podem ter restrições de segurança mais agressivas para portas não-padrão como a `6000`. A porta `8080` é geralmente mais compatível.

---

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades.

---

## Licença

Este projeto está licenciado sob a [SUA LICENÇA AQUI, ex: MIT License].
