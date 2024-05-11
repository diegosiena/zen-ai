<div align="center">
  <img src="./static/favicon.png" alt="Imagem do projeto">
  <h1 class="nome">Zen AI</h1>

  <p >
  Namaste! 🙏 Eu sou Zen AI, um assistente virtual de inteligência artificial dedicado ao bem-estar e à prática do Yoga. 🧘‍♀️
  </p>
  
  <p>
    <a href=""><u>Acessar Zen AI</u></a>
  </p>
  <p>
    <a href="https://youtu.be/aY1H-ZN5k6o">
    <img height="16" src="https://www.youtube.com/s/desktop/92fdfad2/img/favicon_32x32.png" /> 
    <u>Video/Demo</u>
    </a>
  </p>
  <sub>Feito com ❤️ por 
  <a href="https://www.github.com/diegosiena"><u>Diego Siena</u></a>
  </sub>
</div>

### Conteúdo

- [🧘 Sobre o Zen AI](#-sobre-o-zen-ai)
  - [EI! Você! Avaliador do Desafio Alura](#ei-você-avaliador-do-desafio-alura-o-zen-ai-tem-um-recadinho-pra-você)
  - [Chat](#chat)
    - [Criar aulas de yoga, com tempo e objetivos determinados](#criar-aulas-de-yoga-com-tempo-e-objetivos-determinados)
  - [Lista e busca de FAQs (Perguntas ferquentes)](#lista-e-busca-de-faqs-perguntas-ferquentes)
- [🧠 Conceitos de IA](#-conceitos-de-ia)
  - [Embedding de conteúdo](#embedding-de-conteúdo)
  - [Chat/Conversação com o modelo](#chatconversação-com-o-modelo)
  - [Prompt Engineering/System Instructions](#prompt-engineeringsystem-instructions)
- [👨‍💻 Tech stack](#-tech-stack)
  - [Developing](#developing)

# 🧘 Sobre o Zen AI

![](./static/images/docs/screen-1.jpg)

Meu objetivo é te guiar em sua jornada de autoconhecimento e saúde, respondendo suas dúvidas sobre Yoga, meditação, mindfulness e tudo que envolve o bem-estar físico e mental.
Sou como um instrutor de Yoga virtual, sempre pronto para compartilhar dicas, curiosidades e inspirações para te ajudar a encontrar equilíbrio e paz interior. ✨
Lembre-se, estou aqui para te auxiliar no caminho do Yoga e do bem-estar. 😄
Namastê! 🙏

### EI! Você! Avaliador do Desafio Alura... o Zen AI tem um recadinho pra você:

![](./static/images/docs/screen-5.jpg)

### Chat

O chat Zen AI está pronto para responder as suas perguntas e fazer coisas incríveis por você. Quer ver um exemplo?

#### Criar aulas de yoga, com tempo e objetivos determinados

Veja alguns exemplos, com o que foi solicitado e o retorno:

<details>
  <summary><b><i>"Olá. Crie uma aula de yoga, de 30 minutos, para gestantes."</i></b></summary>
  <br />
  
  <img src="./static/images/docs/screen-2.jpg" />
</details>

  <br />

<details>
  <summary><b><i>"Olá. Crie uma aula de yoga, de 30 minutos, para crianças, com foco em alongamento"</i></b></summary>
  <br />
  
  <img src="./static/images/docs/screen-3.jpg" />
</details>

### Lista e busca de FAQs (Perguntas ferquentes)

Na página de Perguntas Frequentes, você pode buscar utilizando texto, fazendo perguntas ou por termos que possam estar presentes nas respostas.

O Zen AI app vai gerar o **embedding da sua busca**, e comparar com os **embeddings dos conteúdos**, calcular a distância euclidiana, e retornar os mais relevantes.

<details>
  <summary><b>Veja um exemplo (repare no "Score" ao lado da pergunta):</b></summary>
  <br />
  
  <img src="./static/images/docs/screen-4.jpg" />
</details>

# 🧠 Conceitos de IA

Detalhes sobre os conceitos de IA utilizados no projeto e como foram utilizados para obter melhores resultados.

### Embedding de conteúdo

O embedding de cada pergunta frequente (e sua resposta) foi calculado e salvo na lista da `faqs`, evitando a necessidade de recalcular a cada nova chamada da API.

O embed foi feito através da função [embedRetrievalFaqs](https://github.com/diegosiena/zen-ai/blob/fd8c7ec590305ac36c1038c619b90ce67b18f587/src/lib/utils/embed-faqs.ts#L9). Clique para ver mais.
Aqui está o exemplo de como ficou a lista de FAQs.

```typescript
export const faqs: Faq[] = [
  {
    question: 'O que é Yoga? 🤔',
    answer:
      'Yoga é uma prática milenar que une corpo, mente e espírito através de posturas físicas (asanas), técnicas de respiração (pranayamas), meditação e princípios éticos. ✨',
    values: [0.015996197, -0.0033414727, ..., -0.02644008]
  }
  //...
];
```

Na chamada da api `/api/faq` passando uma `query`, executamos a função [performQuery](https://github.com/diegosiena/zen-ai/blob/fd8c7ec590305ac36c1038c619b90ce67b18f587/src/lib/utils/google-gen-ai/embedding.ts#L34) que calcula o **embedding do texto de busca** (query), **calcula a distância** com o **embedding das FAQs** e **retorna as 3** "melhores" correspondências.

### Chat/Conversação com o modelo

Para a conversação com o modelo, basicamente utilizamos as funções `model.startChat({...});` e `chat.sendMessage(message);`, passando os parâmetros de `history`, `model`, `generationConfig`, entre outros.

[Veja o arquivo `chat.ts`](https://github.com/diegosiena/zen-ai/blob/fd8c7ec590305ac36c1038c619b90ce67b18f587/src/lib/utils/chat.ts), responsável pela função de chat/conversação.

### Prompt Engineering/System Instructions

A engenharia de prompt foi muito relevante para o desenvolvimento do Zen AI. Com o objetivo de:

- Limitar o assistente a assuntos de Yoga e bem-estar.
- Definir o tom e formatação das repostas.
- Definir o formato de resposta das aulas/sequências de yoga.
- A mensagem inicial (boas-vindas e instruções).

> [!NOTE]
> Aparentemente, o parâmetro `systemInstructions` ainda não é suportado pela SDK JS do Google.
> Portanto, resolvi enviar uma primeira mensagem pro modelo, com as instruções.

Veja as instruções enviadas ao modelo:

```typescript
message =
	'Você é um assistente de Yoga chamado Zen AI. Você deve recusar educadamente a responder perguntas que não sejam relacionadas a Yoga ou saúde de modo geral.\
    Você deve responder sempre de forma gentil, e quando possível utilizar emojis e frases/termos relacionados ao tema Yoga. \
    Quando for solicitada uma aula, responda a aula contendo Objetivo, Nivel, Materiais, Instruções e dicas. \
    Responda com uma mensagem de boas vindas contendo uma curiosidade sobre Yoga ou bem-estar e exemplos de \
    como você pode ajudar e/ou perguntas das quais você poderia responder.';
```

# 👨‍💻 Tech stack

- [@google/generative-ai](https://github.com/google-gemini/generative-ai-js#readme) - The Google AI JavaScript SDK
- [SvelteKit](https://kit.svelte.dev/) - The fastest way to build Svelte apps
- [Skeleton UI](https://skeleton.dev/) - The UI toolkit for Svelte and Tailwind.
- [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework
- [Typescript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
