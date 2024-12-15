create database CMS;
use CMS;

create table details(
	id int primary key,
    name VARCHAR(30),
    dob VARCHAR(10),
    age int,
    department VARCHAR(30),
    gender VARCHAR(10),
    attendence INT,
    contact INT,
    email VARCHAR(30),
    address VARCHAR(100),
    city VARCHAR(20),
    country VARCHAR(20),
    father VARCHAR(20),
    mother VARCHAR(20),
    foccupation VARCHAR(20),
    moccupation VARCHAR(20)
);

insert into details (id,name,dob,age,department,gender,attendence,contact,email,address,city,country,father,mother,foccupation,moccupation)
values
(1,"Ankith","21/01/2004",20,"CSE","male",10,953575,"a@gamil.com","xyz","bangalore","india","abcd","efgh","a","b");

insert into details (id,name,dob,age,department,gender,attendence,contact,email,address,city,country,father,mother,foccupation,moccupation)
values
(2,"Anil","09/12/2003",20,"CSE","male",10,953575,"a@gamil.com","xyz","bangalore","india","abcd","efgh","a","b");

select * from details;

-- alter table details 
-- modify id VARCHAR(100);

-- delete from details
-- where id=0;

-- update details
-- set name="binay",dob="13/12/2004",age="20",department="CSE",gender="male",attendence=10,contact="12345",email="binay@gmail.com",
-- address="qazx",city="qwerty",country="india",father="abcd",mother="bnml",foccupation="zxcvb",moccupation="qwertyu"
-- where id=0;

-- set sql_safe_updates=0;

-- update details
-- set name="binay",dob="13/12/2004",age="20",department="CSE",gender="male",attendence=10,contact="12345",email="binay@gmail.com",
-- address="qazx",city="qwerty",country="india",father="abcd",mother="bnml",foccupation="zxcvb",moccupation="qwertyu"
-- where id=0;
