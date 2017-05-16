DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    user_type VARCHAR(100) NOT NULL DEFAULT 'seeker'
);

CREATE TABLE education (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11),
    name VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    year_started INT NOT NULL,
    year_graduated INT,
    gpa VARCHAR(20) NOT NULL,
    CONSTRAINT fk_education_user FOREIGN KEY (user_id) REFERENCES users (id)
)ENGINE=InnoDB;

CREATE TABLE projects (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11),
    title VARCHAR(100),
    notes TEXT DEFAULT NULL,
    start_year INT NOT NULL,
    end_year INT NOT NULL,
    url VARCHAR(255) DEFAULT NULL,
    CONSTRAINT fk_project_user FOREIGN KEY (user_id) REFERENCES users (id)
)ENGINE=InnoDB;
