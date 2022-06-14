CREATE TABLE IF NOT EXISTS PF(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT, 
    email TEXT,
  	enterprise TEXT,
    cellphone INTEGER,
    namepieza TEXT,
    material TEXT,
    cantidad INTEGER,
    datecreation DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M', 'now')),
    ticketstatus TEXT NOT NULL DEFAULT 'OPEN',
    ticketgestor TEXT NOT NULL DEFAULT 'EMPTY'
);

INSERT or IGNORE INTO PF(fullname, email, enterprise, cellphone, namepieza, material, cantidad ) VALUES ('Eimer Montero', 'eimermiguel7@gmail.com', 'CACAO SOLUTIONS', 8298712716, 'taladro', 'hierro', 5);

