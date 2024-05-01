insert into event (id, name, date, address, lon, lat) 
values 
	(uuid(), "Concierto de Metallica", now(), "Calle 102a 51-21", "-74.0775238429563", "4.6458932980089855"),
    (uuid(), "Concierto de Deff leppard", now(), "Carrera 29 75a 56", "-74.0904322711022", "4.668021192093221"),
    (uuid(), "Matrimonio", now(), "Carrera 16 # 63A - 68,", "-74.0775238429563", "4.6458932980089855"),
    (uuid(), "Rock al parque", now(), "Calle 63 And 53, Carreras 48 And 68","74.0904322711022", "4.668021192093221"),
    (uuid(), "WWE lucha libre", now(), "Av Carrera 11 80-57", "-74.0775238429563", "4.6458932980089855"),
    (uuid(), "Concierto sinfonica de Bogotá", now(), "Avenida Carrera 30 # 45","74.0904322711022", "4.668021192093221"),
    (uuid(), "Salon del automovil", now(), "Carrera 37 # 24-67","74.0904322711022", "4.668021192093221");
    
    insert into user (id, username, email, password, create_time) 
		values 	(uuid(), "chorizar", "chorizar@yopmail.com", md5("chorizar2"), now()),
				(uuid(), "wartortol", "wartortol@yopmail.com", md5("wartortol2"), now()),
				(uuid(), "bolbasor", "bolbasor@yopmail.com", md5("bolbasor2"), now());    
    
    SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
	SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
	SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
    
insert into event_user (id, event_id, user_id)
	values (uuid(), "0d10b167-0679-11ef-8b8b-00d861ab1006", "98bd3c64-067c-11ef-8b8b-00d861ab1006"),
	(uuid(), "0d10b167-0679-11ef-8b8b-00d861ab1006", "98bd5395-067c-11ef-8b8b-00d861ab1006"),
	(uuid(), "0d10b167-0679-11ef-8b8b-00d861ab1006", "98bd546b-067c-11ef-8b8b-00d861ab1006");        
        
	SET SQL_MODE=@OLD_SQL_MODE;
	SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
	SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
        



