IF OBJECT_ID('plantilla','u') IS NOT NULL DROP TABLE [dbo].[plantilla]
GO
CREATE TABLE [dbo].[plantilla]
(
    [plantillaid] varchar(20) not null,
    [descripcion] varchar(100) not null,
    [email] bit not null default 1,
    [asunto] varbinary(1000) not null,
    [cuerpohtml] varchar(8000) not null,
    [cuerpotexto] varchar(8000) not null
)
GO
ALTER TABLE [dbo].[plantilla] ADD CONSTRAINT plantilla_plantillaid PRIMARY KEY CLUSTERED (plantillaid ASC)