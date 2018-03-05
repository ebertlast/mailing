IF OBJECT_ID('tercero','u') IS NOT NULL DROP TABLE dbo.tercero
GO
CREATE TABLE dbo.tercero
(
    terceroid varchar(20) not null,
    razonsocial varchar(500) not null,
    email1 varchar(100),
    email2 varchar(100),
    email3 varchar(100),
    email4 varchar(100),
    movil1 varchar(13),
    movil2 varchar(13),
    movil3 varchar(13),
)
GO
ALTER TABLE dbo.tercero ADD CONSTRAINT tercero_terceroid PRIMARY KEY CLUSTERED (terceroid ASC)