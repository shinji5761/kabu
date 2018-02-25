#/bin/bash

### CONST
C_DIR=`pwd`
TABLE_PATH=${C_DIR}/table
DATA_PATH=${C_DIR}/data
VIEW_PATH=${C_DIR}/view

### TABLE
cat ${TABLE_PATH}/*.sql | psql -U admin kabu_db

### VIEW
cat ${VIEW_PATH}/*.sql | psql -U admin kabu_db

## init data or test data
cat ${DATA_PATH}/*.sql | psql -U admin kabu_db
