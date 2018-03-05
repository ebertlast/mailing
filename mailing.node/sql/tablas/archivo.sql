IF OBJECT_ID('archivo','u') IS NOT NULL DROP TABLE dbo.archivo
GO
CREATE TABLE dbo.archivo
(
    archivoid varchar(20) not null,
    [name] varchar(500) not null,
    [data] varbinary(8000) not null,
    [encoding] varchar(10) not null,
    [mimetype] varchar(100) not null,
    terceroid varchar(20) default null,
    directory varchar(1000) not null,
    usuarioid varchar(100) not null
)
GO
ALTER TABLE dbo.archivo ADD CONSTRAINT archivo_archivoid PRIMARY KEY CLUSTERED (archivoid ASC)