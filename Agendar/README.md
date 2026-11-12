# Agende Fácil: Agendamento de Saúde Acessível

> Plataforma web simplificada para agendamento de consultas focada na acessibilidade para o público sênior.

## 📁 Estrutura do diretório

```text
Agendar/
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── index.html
└── README.md
```

## Público-Alvo e Contexto

- **Público:** Adultos a partir de 45 anos, com pouca familiaridade com tecnologia.

- **Contexto:** Uso majoritariamente em dispositivos móveis, em ambiente doméstico, onde o usuário busca resolver uma necessidade de saúde de forma rápida e sem burocracia.

## Processo de Design Utilizado

Foi utilizado o **Double Diamond (Duplo Diamante)** de forma simplificada:

- **Descobrir/Definir:** Identificamos que a principal barreira não era a falta de opções, mas a complexidade visual e de navegação dos sites de saúde.

- **Desenvolver/Entregar:** Criamos um fluxo de agendamento dividido em etapas dentro de um modal e implementamos controles de acessibilidade em tempo real.

## Princípios de IHC Aplicados

- **Prevenção de Erros:** O sistema impede o agendamento em datas passadas por meio de validação em JavaScript. Além disso, os campos obrigatórios impedem o envio de formulários incompletos.

- **Visibilidade do Status do Sistema:** O uso de `aria-live` (`accessibilityFeedback`) permite anunciar por meio de leitores de tela alterações no tamanho da fonte, no contraste e a confirmação do agendamento. Também é fornecido feedback imediato ao usuário.

- **Flexibilidade e Eficiência de Uso:** O cabeçalho fixo (*sticky*) mantém os controles de acessibilidade disponíveis durante a navegação, permitindo aumentar ou diminuir a fonte e ativar o alto contraste.

## Recursos de Acessibilidade Implementados

- **Skip Link:** Permite pular o menu e acessar diretamente o conteúdo principal.
- **Redimensionamento de texto:** Controle de tamanho da fonte baseado em `rem`, com limites definidos entre 12px e 24px.
- **Alto contraste:** Alternador de contraste com fundo preto e texto amarelo.
- **Foco visível:** Estilização personalizada com `:focus-visible`, facilitando a navegação por teclado.
- **Movimento reduzido:** Suporte a `prefers-reduced-motion`, respeitando a preferência de usuários que desativam animações no sistema.
- **HTML semântico e ARIA:** Utilização de elementos como `<main>`, `<section>` e `<nav>`, além de atributos ARIA para melhorar a acessibilidade.

## Como Executar

Basta abrir o arquivo `index.html` em um navegador moderno. É necessário ter conexão com a internet para carregar os arquivos do Bootstrap via CDN.

O projeto não requer instalação de servidor back-end. Os agendamentos são armazenados localmente no navegador por meio do `localStorage`.

## Limitações

- **Ausência de back-end:** O projeto não possui integração com servidor ou banco de dados remoto. Os dados são armazenados apenas no navegador e dispositivo utilizados.

- **Listagem de agendamentos:** A funcionalidade "Meus Agendamentos" utiliza atualmente o `alert()` nativo do navegador como solução provisória. Em versões futuras, poderá ser substituída por uma listagem integrada à própria interface, com opções de gerenciamento dos agendamentos.

## Projeto Acadêmico
Desenvolvido para a disciplina de **Interação Humano-Computador** — **Universidade Católica de Santos**.

## Licença
Projeto acadêmico livre sob a licença **MIT**.
