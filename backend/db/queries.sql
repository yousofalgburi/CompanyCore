CREATE TABLE users  (
    user_id serial,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    verified BOOLEAN,
    team VARCHAR(50),
);

CREATE TABLE teams (team_id serial, teamName VARCHAR(256) NOT NULL, teamCode VARCHAR(256) NOT NULL);