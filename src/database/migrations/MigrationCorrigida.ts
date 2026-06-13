import { SQLiteDatabase } from "expo-sqlite";

export async function migrate(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    -- =========================
    -- TIPO DE USUARIO
    -- =========================
    CREATE TABLE IF NOT EXISTS tipo_usuario (
      id_tipo INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL UNIQUE
    );

    -- =========================
    -- USUARIOS
    -- =========================
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      id_tipo INTEGER NOT NULL,

      FOREIGN KEY (id_tipo)
        REFERENCES tipo_usuario(id_tipo)
        ON DELETE RESTRICT
    );

    -- =========================
    -- FAMILIA
    -- =========================
    CREATE TABLE IF NOT EXISTS familia (
      id_familia INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      fk_usuario_responsavel INTEGER NOT NULL,

      FOREIGN KEY (fk_usuario_responsavel)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
    );

    -- =========================
    -- USUARIO X FAMILIA
    -- =========================
    CREATE TABLE IF NOT EXISTS usuario_familia (
      id_usuario_familia INTEGER PRIMARY KEY AUTOINCREMENT,
      fk_usuario_id INTEGER NOT NULL,
      fk_familia_id INTEGER NOT NULL,
      papel TEXT NOT NULL CHECK (papel IN ('responsavel', 'crianca')),

      FOREIGN KEY (fk_usuario_id)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,

      FOREIGN KEY (fk_familia_id)
        REFERENCES familia(id_familia)
        ON DELETE CASCADE,

      UNIQUE (fk_usuario_id, fk_familia_id)
    );

    -- =========================
    -- CARTEIRA
    -- =========================
    CREATE TABLE IF NOT EXISTS carteira (
      id_carteira INTEGER PRIMARY KEY AUTOINCREMENT,
      saldo REAL NOT NULL DEFAULT 0,
      fk_usuario_id INTEGER NOT NULL UNIQUE,

      FOREIGN KEY (fk_usuario_id)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
    );

    -- =========================
    -- STATUS DA TAREFA
    -- =========================
    CREATE TABLE IF NOT EXISTS status_tarefa (
      id_status INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL UNIQUE
    );

    -- =========================
    -- TAREFA
    -- =========================
    CREATE TABLE IF NOT EXISTS tarefa (
      id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
      valor_recompensa REAL NOT NULL,
      data_limite TIMESTAMP,
      titulo TEXT NOT NULL,
      descricao TEXT,

      fk_status_tarefa INTEGER NOT NULL,
      fk_usuario_responsavel INTEGER NOT NULL,
      fk_usuario_crianca INTEGER NOT NULL,
      fk_familia_id INTEGER NOT NULL,

      FOREIGN KEY (fk_status_tarefa)
        REFERENCES status_tarefa(id_status)
        ON DELETE RESTRICT,

      FOREIGN KEY (fk_usuario_responsavel)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,

      FOREIGN KEY (fk_usuario_crianca)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,

      FOREIGN KEY (fk_familia_id)
        REFERENCES familia(id_familia)
        ON DELETE CASCADE
    );

    -- =========================
    -- MOVIMENTACAO
    -- =========================
    CREATE TABLE IF NOT EXISTS movimentacao (
      id_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo_movimentacao TEXT NOT NULL CHECK (tipo_movimentacao IN ('entrada', 'saida')),
      data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      valor REAL NOT NULL,

      fk_carteira_id INTEGER NOT NULL,
      fk_tarefa_id INTEGER,

      FOREIGN KEY (fk_carteira_id)
        REFERENCES carteira(id_carteira)
        ON DELETE CASCADE,

      FOREIGN KEY (fk_tarefa_id)
        REFERENCES tarefa(id_tarefa)
        ON DELETE SET NULL
    );

    -- =========================
    -- INDICES
    -- =========================
    CREATE INDEX IF NOT EXISTS idx_usuarios_tipo
      ON usuarios(id_tipo);

    CREATE INDEX IF NOT EXISTS idx_familia_responsavel
      ON familia(fk_usuario_responsavel);

    CREATE INDEX IF NOT EXISTS idx_usuario_familia_usuario
      ON usuario_familia(fk_usuario_id);

    CREATE INDEX IF NOT EXISTS idx_usuario_familia_familia
      ON usuario_familia(fk_familia_id);

    CREATE INDEX IF NOT EXISTS idx_tarefa_responsavel
      ON tarefa(fk_usuario_responsavel);

    CREATE INDEX IF NOT EXISTS idx_tarefa_crianca
      ON tarefa(fk_usuario_crianca);

    CREATE INDEX IF NOT EXISTS idx_tarefa_familia
      ON tarefa(fk_familia_id);

    -- =========================
    -- DADOS INICIAIS
    -- =========================
    INSERT OR IGNORE INTO tipo_usuario (descricao) VALUES
      ('Responsavel'),
      ('Crianca');

    INSERT OR IGNORE INTO status_tarefa (descricao) VALUES
      ('Concluida'),
      ('Em Andamento'),
      ('Em Aberto'),
      ('Expirado');
  `);
}
