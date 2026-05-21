import { SQLiteDatabase } from "expo-sqlite";

export async function migrate(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    -- =========================
    -- FAMÍLIA
    -- =========================
    CREATE TABLE IF NOT EXISTS familias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- =========================
    -- TIPO DE USUÁRIO
    -- =========================
    CREATE TABLE IF NOT EXISTS tipo_usuario (
      id_tipo INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL
    );

    -- =========================
    -- USUÁRIOS
    -- =========================
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      id_tipo INTEGER NOT NULL,
      family_id INTEGER,

      FOREIGN KEY (id_tipo)
        REFERENCES tipo_usuario(id_tipo),

      FOREIGN KEY (family_id)
        REFERENCES familias(id)
        ON DELETE SET NULL
    );

    -- =========================
    -- CARTEIRA
    -- =========================
    CREATE TABLE IF NOT EXISTS carteira (
      id_carteira INTEGER PRIMARY KEY AUTOINCREMENT,
      pontos FLOAT DEFAULT 0,
      fk_usuario_id INTEGER UNIQUE,

      FOREIGN KEY (fk_usuario_id)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
    );

    -- =========================
    -- STATUS DA TAREFA
    -- =========================
    CREATE TABLE IF NOT EXISTS status_tarefa (
      id_status INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL
    );

    -- =========================
    -- TAREFA
    -- =========================
    CREATE TABLE IF NOT EXISTS tarefa (
      id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      valor_recompensa FLOAT NOT NULL,
      data_limite TIMESTAMP,

      fk_pai_id INTEGER NOT NULL,
      fk_filho_id INTEGER,
      fk_status_id INTEGER,

      FOREIGN KEY (fk_pai_id)
        REFERENCES usuarios(id_usuario),

      FOREIGN KEY (fk_filho_id)
        REFERENCES usuarios(id_usuario),

      FOREIGN KEY (fk_status_id)
        REFERENCES status_tarefa(id_status)
    );

    -- =========================
    -- MOVIMENTAÇÃO DE PONTOS
    -- =========================
    CREATE TABLE IF NOT EXISTS movimentacao_pontos (
      id_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
      saldo FLOAT NOT NULL,
      data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      descricao TEXT,

      fk_carteira_id INTEGER NOT NULL,
      fk_tarefa_id INTEGER,

      FOREIGN KEY (fk_carteira_id)
        REFERENCES carteira(id_carteira)
        ON DELETE CASCADE,

      FOREIGN KEY (fk_tarefa_id)
        REFERENCES tarefa(id_tarefa)
        ON DELETE SET NULL
    );
  `);
}
