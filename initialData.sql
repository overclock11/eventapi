insert into event (id, name, date, address) 
values 
	(uuid(), "Concierto de Metallica", now(), "Calle 102a 51-21"),
    (uuid(), "Concierto de Deff leppard", now(), "Carrera 29 75a 56"),
    (uuid(), "Matrimonio", now(), "Carrera 16 # 63A - 68,"),
    (uuid(), "Rock al parque", now(), "Calle 63 And 53, Carreras 48 And 68"),
    (uuid(), "WWE lucha libre", now(), "Av Carrera 11 80-57"),
    (uuid(), "Concierto sinfonica de Bogotá", now(), "Avenida Carrera 30 # 45"),
    (uuid(), "Salon del automovil", now(), "Carrera 37 # 24-67");
    
    insert into nearby_locations (id, name, address, event_id1)
    values
		(uuid(), "Salón de la gastronomia", "Carrera 37 # 24-67", "0d10b167-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Salón de la fama", "Carrera 37 # 24-67", "0d10b167-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Salón de la cerveza", "Carrera 37 # 24-67", "0d10b167-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Salón de la música", "Carrera 37 # 24-67", "0d10b167-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Salón de la arepa", "Carrera 37 # 24-67", "0d10b167-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Castillo para celebraciones", "Carrera 37 # 24-67", "0d10fae1-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "SOFA fest", "Carrera 37 # 24-67", "0d10fae1-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Samsung open day", "Carrera 37 # 24-67", "0d10fae1-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Xiaomi open day", "Carrera 37 # 24-67", "0d10fae1-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Gran parrilada vegana", "Carrera 37 # 24-67", "0d10fae1-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Gran parrilada vegetariana", "Carrera 29 75a 56", "0d10fb76-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Concurso de burritos picantes", "Carrera 29 75a 56", "0d10fb76-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Concurso de patinaje", "Carrera 29 75a 56", "0d10fb76-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Gran parrillada de carniceros argentinos", "Carrera 29 75a 56", "0d10fb76-0679-11ef-8b8b-00d861ab1006"),
        (uuid(), "Sancocho comunitario", "Carrera 29 75a 56", "0d10fb76-0679-11ef-8b8b-00d861ab1006");
        
    insert into user (id, username, email, password, create_time) 
		values 	(uuid(), "chorizar", "chorizar@yopmail.com", md5("chorizar2"), now()),
				(uuid(), "wartortol", "wartortol@yopmail.com", md5("wartortol2"), now()),
				(uuid(), "bolbasor", "bolbasor@yopmail.com", md5("bolbasor2"), now()):

insert into event_user (id, event_id1, user_id1)
values (uuid(), "0d10b167-0679-11ef-8b8b-00d861ab1006", "98bd3c64-067c-11ef-8b8b-00d861ab1006"),
(uuid(), "0d10b167-0679-11ef-8b8b-00d861ab1006", "98bd5395-067c-11ef-8b8b-00d861ab1006"),
(uuid(), "0d10b167-0679-11ef-8b8b-00d861ab1006", "98bd546b-067c-11ef-8b8b-00d861ab1006");