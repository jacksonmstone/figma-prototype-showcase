# Database scripts

Run these SQL scripts against your **dynamic_menu** PostgreSQL database.

## Option 1: Using psql in terminal

From the **project root** (the folder that contains `db`):

**1. Create the table (schema):**
```bash
psql -h localhost -p 5432 -U postgres -d dynamic_menu -f db/schema.sql
```

**2. Insert seed data:**
```bash
psql -h localhost -p 5432 -U postgres -d dynamic_menu -f db/seed.sql
```

You will be prompted for the postgres user password unless you set it first:

- **PowerShell:** `$env:PGPASSWORD = 'your_password';` then run the `psql` commands above.
- **Cmd:** `set PGPASSWORD=your_password` then run the `psql` commands above.

---

## Option 2: If psql is not in PATH

PostgreSQL’s `bin` folder must be in your PATH. Typical install path:

- `C:\Program Files\PostgreSQL\16\bin`

Use the **full path** to psql, for example:

```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -p 5432 -U postgres -d dynamic_menu -f db/schema.sql
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -p 5432 -U postgres -d dynamic_menu -f db/seed.sql
```

(Replace `16` with your PostgreSQL version if different.)

---

## Option 3: pgAdmin or another GUI

1. Connect to your server and open the **dynamic_menu** database.
2. Open **Query Tool** (or equivalent).
3. Open and run `schema.sql` (e.g. File → Open → `db/schema.sql`, then Execute).
4. Open and run `seed.sql` the same way.

---

## Files

| File        | Purpose                                                       |
|------------|----------------------------------------------------------------|
| `schema.sql` | Creates all tables (restaurant, menu_item, completed_orders, active_orders, etc.). |
| `seed.sql`   | Optional template for seed data; uncomment and customize.     |
