--To create Database
CREATE DATABASE EmployeeDB_ReactProject;


--Create Table For Drpartments
DROP Table dbo.Departments;

DELETE FROM dbo.Departments;

Create Table dbo.Departments(
DepartmentID bigint Identity(1,1) NOT NULL,
DepartmentName varchar(1000)
);

Select * from Departments;

Delete  FROM Departments Where DepartmentName ='';

insert into Departments values('Finance');

insert into Departments values('Supports');

insert into Departments values('IT');

Drop Table dbo.Employees;
--Create Table For Drpartments
Create Table dbo.Employees(
EmployeeID bigint Identity(1,1) NOT NULL,
EmployeeName varchar(1000),
Department varchar(1000),
MailId varchar(1000),
DOJ date
);


Select * from Employees;

insert into Employees values('Avinash','Finance', 'Avi@gmail.com', '5-11-2019');

insert into Employees values('Bob','IT', 'Bob123@gmail.com', '4-10-2019');

--For cs file code
Select DepartmentID, DepartmentName from dbo.Departments;

Select EmployeeID, EmployeeName, Department, MailId, Convert(varchar(10), DOJ, 120) as DOJ from dbo.Employees;

-- ***********Insert query for department in c# Post Method
--@"
--Insert into dbo.Departments 
--values('" + dep.DepartmentName + @"')
--";
--***Get
--@"
--Select DepartmentID, DepartmentName
--from dbo.Departments;
--";
--***PUT
--@"
--Update dbo.Departments set
--DepartmentName = '" + dep.DepartmentName + @"'
--where DepartmentID = " + dep.DepartmentID;
                
-- ***********Insert query for Employees in c# Post Method
 --@"
--Insert into dbo.Employees
--(EmployeeName, Department, MailId, DOJ)
--values(
--'" + emp.EmployeeName + @"'
--,'" + emp.Department + @"'
--,'" + emp.MailID + @"'
--,'" + emp.DOJ + @"')
--";

--***Get
--@"
--Select EmployeeID, EmployeeName, Department, MailId, Convert(varchar(10), DOJ, 120) as DOJ
--from dbo.Employees;
--";
--**PUT
--@"
--Update dbo.Employees set
--EmployeeName = '" + emp.EmployeeName + @"'
--,Department = '" + emp.Department + @"'
--,MailId = '" + emp.MailID + @"'
--,DOJ = '" + emp.DOJ + @"'
--Where EmployeeID = " + emp.EmployeeID;