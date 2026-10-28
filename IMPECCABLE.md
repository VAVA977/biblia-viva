# Impeccable — ferramentas de design

O Impeccable foi integrado ao repositório para uso nos agentes de desenvolvimento:

- Codex: `.agents/skills/impeccable/` e `.codex/hooks.json`
- GitHub Copilot: `.github/skills/impeccable/` e `.github/hooks/impeccable.json`

Fonte oficial: https://github.com/pbakaus/impeccable (snapshot da árvore d34c87e1a00989ae8dbdd7f6b30b70f23319e860).

**Primeiro uso:** abra este repositório no agente, reinicie o agente e execute `$impeccable init` (Codex) ou `/impeccable init` (Copilot). Revise o `PRODUCT.md` gerado e, se solicitado, aprove a execução dos hooks do projeto.

**Para evoluir o design:** use `$impeccable critique`, `$impeccable audit` ou `$impeccable polish` no Codex; no Copilot, use a forma `/impeccable ...`.

**Atualização futura:** consulte https://impeccable.style/docs/ para obter a versão nova e rodar `npx impeccable update` com acesso local à raiz do projeto.

Esta configuração não altera as páginas, a lógica nem a publicação do site.
