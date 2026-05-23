const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "..", "db.sqlite");

if (fs.existsSync(dbPath)) {
  console.log("Removendo banco existente:", dbPath);
  fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

const sql = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS tipo_usuario (
  id_tipo INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  id_tipo INTEGER NOT NULL,
  FOREIGN KEY (id_tipo) REFERENCES tipo_usuario(id_tipo) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS carteira (
  id_carteira INTEGER PRIMARY KEY AUTOINCREMENT,
  saldo REAL NOT NULL DEFAULT 0,
  fk_usuario_id INTEGER UNIQUE,
  FOREIGN KEY (fk_usuario_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS status_tarefa (
  id_status INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tarefa (
  id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
  valor_recompensa REAL NOT NULL,
  data_limite TIMESTAMP,
  titulo TEXT NOT NULL,
  descricao TEXT,
  fk_status_tarefa INTEGER NOT NULL,
  fk_usuario_responsavel INTEGER NOT NULL,
  FOREIGN KEY (fk_status_tarefa) REFERENCES status_tarefa(id_status) ON DELETE RESTRICT,
  FOREIGN KEY (fk_usuario_responsavel) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movimentacao (
  id_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo_movimentacao TEXT NOT NULL CHECK (tipo_movimentacao IN ('entrada', 'saida')),
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valor REAL NOT NULL,
  fk_carteira_id INTEGER NOT NULL,
  fk_tarefa_id INTEGER,
  FOREIGN KEY (fk_carteira_id) REFERENCES carteira(id_carteira) ON DELETE CASCADE,
  FOREIGN KEY (fk_tarefa_id) REFERENCES tarefa(id_tarefa) ON DELETE SET NULL
);

INSERT OR IGNORE INTO status_tarefa (descricao) VALUES
  ('Concluída'),
  ('Em Andamento'),
  ('Em Aberto'),
  ('Expirado');
`;

db.serialize(() => {
  db.exec(sql, (err) => {
    if (err) {
      console.error("Erro ao criar banco:", err);
      process.exit(1);
    }
    console.log("Banco criado com sucesso em", dbPath);
    db.close();
  });
});

process.on("SIGINT", () => {
  db.close();
  process.exit();
});
