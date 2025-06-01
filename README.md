# Rural Assets API

## Brain Agriculture - Teste Técnico v2

Este projeto consiste em uma API backend para gerenciar o cadastro de produtores rurais e suas propriedades.

## Como rodar o projeto

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure as variáveis de ambiente
Crie um arquivo `.env` com:
```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
SECRET=your_jwt_secret
```

### 3. Execute as migrações
```bash
npm run migration
```

### 4. Inicie a aplicação
```bash
npm run start
```
A API estará disponível em http://localhost:3000

### 5. Documentação da API
Acesse http://localhost:3000/api para a documentação Swagger.

### 6. Docker (opcional)
```bash
docker build -t rural-assets-api .
docker run -p 3000:3000 --env-file .env rural-assets-api
```

## Estrutura do Projeto
- `src/` — Código-fonte principal
- `src/modules/` — Módulos de domínio (ex: produtor, propriedade, cultura)
- `src/core/` — Classes e utilitários compartilhados
- `src/db/` — Configuração e migrações do banco

## Testes
Execute os testes com:
```bash
npm run test
```

## Licença
MIT
