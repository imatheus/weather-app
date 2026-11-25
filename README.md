# Weather App

Aplicativo simples de previsão do tempo feito com **React** e **Vite**, integrado à API gratuita da [Open-Meteo](https://open-meteo.com/).

## Funcionalidades

- Busca do clima atual pelo nome da cidade (via clique na lupa ou tecla `Enter`)
- Exibição de temperatura, umidade e velocidade do vento
- Feedback visual de carregamento e mensagens de erro

## Tecnologias

- React
- Vite
- CSS3 e Font Awesome
- API Open-Meteo (Geocoding e Forecast)

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse o endereço exibido no terminal (por padrão, `http://localhost:5173`).

## Scripts disponíveis

- `npm run dev` — inicia o ambiente de desenvolvimento
- `npm run build` — gera o build de produção
- `npm run preview` — pré-visualiza o build gerado
- `npm run lint` — executa o linter (`oxlint`)
