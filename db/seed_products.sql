
-- Beispiel-DB für Schmuck Webshop (SQLite/MySQL-kompatibel, evtl. Datentypen anpassen)
CREATE TABLE IF NOT EXISTS produkte (
  id INTEGER PRIMARY KEY,
  sku VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  kategorie VARCHAR(50) NOT NULL,
  beschreibung TEXT,
  material VARCHAR(100),
  stein VARCHAR(100),
  farbe VARCHAR(50),
  preis_eur DECIMAL(10,2) NOT NULL,
  mwst_satz DECIMAL(4,2) NOT NULL DEFAULT 0.19,
  verfuegbar BOOLEAN NOT NULL DEFAULT 1,
  bilder JSON,
  tags JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserts
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  1, 'EA001', 'Perlenarmband „Modern Pearl“', 'Armband', 'Perlenarmband „Modern Pearl“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Edelstahl', '', 'Perlmuttweiß', 39.90, 0.19, 1, '["Bilder/abc.jpg"]', '["schmuck", "armband", "perlmuttweiß"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  2, 'NK002', 'Halskette „Floral“', 'Kette', 'Halskette „Floral“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Sterlingsilber 925', 'Zirkonia', 'Silber', 59.00, 0.19, 1, '["Bilder/Blume-anhaenger-geschenk-schmuck-schoschon-floral-minimalistisch.jpg"]', '["schmuck", "kette", "silber"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  3, 'RG003', 'Ring „Minimal“', 'Ring', 'Ring „Minimal“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Sterlingsilber 925', '', 'Silber', 49.00, 0.19, 1, '["Bilder/DE_Jewellery_Necklaces.jpg"]', '["schmuck", "ring", "silber"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  4, 'OH004', 'Ohrringe „Classic Drop“', 'Ohrringe', 'Ohrringe „Classic Drop“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Vergoldet 18K', 'Zirkonia', 'Gold', 45.00, 0.19, 1, '["Bilder/Download3.png"]', '["schmuck", "ohrringe", "gold"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  5, 'NK005', 'Halskette „Pearl Line“', 'Kette', 'Halskette „Pearl Line“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Vergoldet 18K', 'Süßwasserperle', 'Gold', 69.00, 0.19, 1, '["Bilder/Download4.png"]', '["schmuck", "kette", "gold"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  6, 'EA006', 'Lederarmband „Urban“', 'Armband', 'Lederarmband „Urban“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Edelstahl & Leder', '', 'Schwarz', 35.00, 0.19, 1, '["Bilder/images5.png"]', '["schmuck", "armband", "schwarz"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  7, 'RG007', 'Ring „Twist“', 'Ring', 'Ring „Twist“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Vergoldet 18K', '', 'Gold', 55.00, 0.19, 1, '["Bilder/imgres.jpg"]', '["schmuck", "ring", "gold"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  8, 'OH008', 'Creolen „Daily“', 'Ohrringe', 'Creolen „Daily“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Edelstahl', '', 'Silber', 29.00, 0.19, 1, '["Bilder/JGA-Schmuck-Workshop-Hannover.webp"]', '["schmuck", "ohrringe", "silber"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  9, 'NK009', 'Halskette „Heart“', 'Kette', 'Halskette „Heart“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Sterlingsilber 925', 'Zirkonia', 'Silber', 62.00, 0.19, 1, '["Bilder/JGA-Schmuck-Workshop-in-Hannover-block.jpg"]', '["schmuck", "kette", "silber"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  10, 'EA010', 'Armreif „Open End“', 'Armband', 'Armreif „Open End“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Sterlingsilber 925', '', 'Silber', 75.00, 0.19, 1, '["Bilder/Modern-Pearl-Armband.jpg"]', '["schmuck", "armband", "silber"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  11, 'RG011', 'Ring „Pearl Duo“', 'Ring', 'Ring „Pearl Duo“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Vergoldet 18K', 'Süßwasserperle', 'Gold', 79.00, 0.19, 1, '["Bilder/abc.jpg"]', '["schmuck", "ring", "gold"]'
);
INSERT OR IGNORE INTO produkte (id, sku, name, kategorie, beschreibung, material, stein, farbe, preis_eur, mwst_satz, verfuegbar, bilder, tags) VALUES (
  12, 'OH012', 'Ohrringe „Floral“', 'Ohrringe', 'Ohrringe „Floral“ – hochwertig verarbeitet. Hautfreundlich, nickelarm. Perfekt für Alltag & Anlass.', 'Sterlingsilber 925', 'Zirkonia', 'Silber', 42.00, 0.19, 1, '["Bilder/Blume-anhaenger-geschenk-schmuck-schoschon-floral-minimalistisch.jpg"]', '["schmuck", "ohrringe", "silber"]'
);
