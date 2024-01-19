#!/bin/sh
# wait-for-postgres.sh

set -e

host="$DB_HOST"
user="$DB_USER"
shift
shift
cmd="$@"

until PGPASSWORD=$DB_PASSWORD psql -h "$host" -U "$user" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

exec $cmd
