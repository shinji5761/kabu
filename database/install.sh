#/bin/bash

### CONST
C_DIR=`pwd`
TABLE_PATH=${C_DIR}/table
DATA_PATH=${C_DIR}/data


### TABLE
cat ${TABLE_PATH}/*.sql | psql -U admin kabu_db

cat ${DATA_PATH}/*.sql | psql -U admin kabu_db
