-- > Tampilkan seluruh data dari table heroes beserta type dari hero tsb < --
SELECT id, name, type_id, photo, user_id
	FROM public.heroes_tb;

-- atau --

SELECT id, name, type_id, photo, user_id
	FROM heroes_tb;
-----------------------------------------------------------------

-- > Tampilkan seluruh data heroes berdasarkan type tertentu < --
SELECT id, name, type_id, photo, user_id
FROM public.heroes_tb
WHERE type_id = 'fire';

-- atau --

SELECT id, name, type_id, photo, user_id
FROM heroes_tb
WHERE type_id = 'water';
-----------------------------------------------------------------

-- > Tampilkan seluruh data heroes berdasarkan type tertentu < --

-- Jika hanya ingin menampilkan name dan type_id saja --
SELECT id, name, type_id
FROM heroes_tb
WHERE name = 'pikachu';

-- Jika hanya ingin menampilkan name dengan isi seluruh column --
SELECT id, name, type_id, photo, user_id
FROM heroes_tb
WHERE name = 'pikachu';