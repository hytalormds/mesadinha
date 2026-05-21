# Mesadinha 🐷

O aplicativo Mesadinha tem como objetivo incentivar o desenvolvimento da educação financeira em crianças e adolescentes. Por meio deste app, espera-se que eles possam desenvolver pensamento crítico acerca do valor do dinheiro e aprender a lidar melhor com questões financeiras.

## 🚀 Instalação

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install

## Banco de Dados

- Tipo_Usuario
  - id_tipo
  - descricao

- Usuarios
  - id_usuario
  - nome
  - email
  - senha
  - id_tipo

- Carteira
  - id_carteira
  - saldo (R$)
  - fk_usuario_id

- Tarefa
  - id_tarefa
  - valor_recompensa (R$)
  - data_limite
  - titulo
  - descricao
  - fk_status_tarefa
  - fk_usuario_responsavel

- Movimentacao
  - tipo_movimentacao [entrada, saida]
  - data
  - valor (R$)
  - id_movimentacao
  - fk_tarefa_id
  - fk_carteira_id

- Status da Tarefa
  - id_tarefa
  - descricao [Concluída, Em Andamento, Em Aberto, Expirado]
```
