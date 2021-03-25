CREATE TABLE people (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE car (
    id SERIAL NOT NULL,
    name VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    cash INTEGER,
    otr INTEGER
    person_id INTEGER REFERENCES people(id),
    PRIMARY key (id)
);

CREATE TABLE credit(
    id SERIAL NOT NULL,
    dp INTEGER,
    angsuran INTEGER,
    tenor INTEGER,
    car_id INTEGER REFERENCES car(id),
    PRIMARY key(id)
);

CREATE TABLE iklan(
    id SERIAL NOT NULL,
    posted_on DATE DEFAULT CURRENT_DATE,
    person_id INTEGER REFERENCES people(id),
    care_id INTEGER REFERENCES car(id),
    PRIMARY KEY(id)
);

INSERT INTO people (
    name,address,type
) VALUES('enzel','jakarta','sales agent');

INSERT INTO people (
    name,address,type
) VALUES('anugerah motor','jakarta','dealer');

INSERT INTO people (
    name,address,type
) VALUES('maju bersama motor','surabaya','dealer');

INSERT INTO people (
    name,address,type
) VALUES('dealer indonesia','surabaya','official dealer');

INSERT INTO people (
    name,address,type
) VALUES('cahaya abadi motor','jakarta','dealer');

INSERT INTO people (
    name,address,type
) VALUES('tino','bandung','enduser');