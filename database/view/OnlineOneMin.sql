-- 外為オンライン 1分足
CREATE OR REPLACE VIEW online_one_min AS 
(
    SELECT
        o.code
        , to_char(o.date, 'YYYY年MM月DD日') AS date
        , to_char(o.hour, '09') AS hour
        , to_char(o.min, '09') AS min
        , o.high
        , o.open
        , o.low
        , online.ask
        , online.bid
    FROM
    online,
    (
        SELECT
            code
            , date
            , hour
            , min
            , MAX(sec)  AS sec
            , MAX(high) AS high
            , MIN(open) AS open
            , MIN(low)  AS low
        FROM online
        GROUP BY code, date, hour, min
    ) o
    WHERE
        online.code = o.code
    AND
        online.date = o.date
    AND
        online.hour = o.hour
    AND
        online.min = o.min
    AND
        online.sec = o.sec
);