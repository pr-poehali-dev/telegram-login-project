CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL UNIQUE,
    telegram_id BIGINT,
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_telegram_id ON users(telegram_id);

COMMENT ON TABLE users IS 'Профили пользователей Telegram';
COMMENT ON COLUMN users.phone IS 'Номер телефона пользователя';
COMMENT ON COLUMN users.telegram_id IS 'ID пользователя в Telegram';
COMMENT ON COLUMN users.username IS 'Имя пользователя';
COMMENT ON COLUMN users.created_at IS 'Дата регистрации';
COMMENT ON COLUMN users.last_login IS 'Последний вход';
COMMENT ON COLUMN users.is_active IS 'Активен ли аккаунт';