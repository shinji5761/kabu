DROP TABLE IF EXISTS online;
CREATE TABLE online (
      code VARCHAR(10)  -- 取引通貨
    -- , time TIMESTAMP    -- 時刻
    , date DATE         -- 日付
    , hour INTEGER      -- 時
    , min  INTEGER      -- 分
    , sec  INTEGER      -- 秒
    , opne FLOAT        -- 始値
    , high FLOAT        -- 高値
    , ask  FLOAT        -- 買値
    , bid  FLOAT        -- 売値
    , low  FLOAT        -- 安値
);