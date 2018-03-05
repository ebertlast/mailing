/*Usuarios del sistema*/
IF OBJECT_ID('usuario','U') IS NOT NULL DROP TABLE usuario
GO
CREATE TABLE usuario
(
    usuarioid VARCHAR(100) NOT NULL,
    clave VARBINARY(8000) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    activo BIT DEFAULT 0,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
)
GO
ALTER TABLE dbo.usuario ADD CONSTRAINT usuario_usuarioid PRIMARY KEY CLUSTERED (usuarioid ASC)
