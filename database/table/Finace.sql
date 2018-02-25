DROP TABLE IF EXISTS finance CASCADE;
CREATE TABLE finance (
      code      VARCHAR(10) -- 銘柄コード
    , market    VARCHAR(10) -- 市場
    , time      TIMESTAMP   -- 時刻
    , step      INTEGER     -- 間隔(秒)
    , open      FLOAT       -- 始値
    , high      FLOAT       -- 高値
    , low       FLOAT       -- 安値
    , close     FLOAT       -- 終値
    , volume    FLOAT       -- 出来高
);