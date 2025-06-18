INSERT INTO "Results" ("SiteId", "DescriptionA", "DateA", "ResultId", "Creator", "Updator") VALUES (110, 'BT.json.sql', NOW(), COALESCE((SELECT MAX("ResultId") FROM "Results"), 0) + 1, 1, 1)
