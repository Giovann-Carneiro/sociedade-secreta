---
name: registrar-prompts
description: Registra em .docs/prompts/YYYY-MM-DD.md cada solicitação do usuário e as decisões tomadas ao respondê-la. Use SEMPRE ao final de cada tarefa ou resposta neste repositório, incluindo perguntas, planejamento e tarefas que não alteram código, e sempre que uma decisão do projeto for tomada ou revisada.
---

# Registrar prompts e decisões

Mantém um histórico legível do que foi solicitado e do que foi decidido no projeto.

## Quando registrar

Ao final de cada etapa, assim que o trabalho solicitado for concluído e antes de encerrar a resposta. Uma entrada por solicitação do usuário.

## Onde registrar

`.docs/prompts/YYYY-MM-DD.md`, na raiz do repositório. Um arquivo por dia, com todos os temas daquele dia em ordem cronológica.

## Formato do arquivo

O arquivo tem um índice no topo e, abaixo, uma entrada por solicitação, separadas por `---`.

```markdown
# DD/MM/AAAA

| # | Tema | Resultado |
|---|------|-----------|
| 1 | Tema em poucas palavras | Resultado em uma frase curta |

---

## 1. Tema em poucas palavras

**Pedido**
> O que o usuário solicitou, em uma frase.

**Decisões**
- Uma decisão por linha.
- Outra decisão.


A cada nova solicitação:

1. Acrescente a entrada ao final, depois de um `-----`, continuando a numeração.

## Regras de escrita

- Uma ideia por item de lista; nunca várias decisões na mesma linha.
- Cada item cabe em uma linha, sem explicar o processo: registre o que foi decidido, não os passos até lá.
- Resumo breve das deciosões.
- Escreva em português.
- Não altere entradas antigas. Se uma decisão for revista, crie uma nova entrada citando o número da anterior.
- Nunca registre senhas, tokens ou conteúdo de arquivos `.env`.
