@echo off
REM Run schema and seed SQL scripts on the dynamic_menu database.
REM Set your password first:  set PGPASSWORD=YourPassword

psql -h localhost -p 5432 -U postgres -d dynamic_menu -f "%~dp0schema.sql"
if errorlevel 1 goto :eof
psql -h localhost -p 5432 -U postgres -d dynamic_menu -f "%~dp0seed.sql"
echo Done.
pause
