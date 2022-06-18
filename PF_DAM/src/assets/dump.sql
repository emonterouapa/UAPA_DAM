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


