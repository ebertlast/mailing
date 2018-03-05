/*Usuarios del sistema*/
IF OBJECT_ID('correo','U') IS NOT NULL DROP TABLE correo
GO
CREATE TABLE correo
(
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    servicio VARCHAR(20) NOT NULL,
    servidor VARCHAR(100) NOT NULL,
    conexion_segura BIT DEFAULT 1,
    puerto SMALLINT NOT NULL,
    metodo_transporte VARCHAR (10) NOT NULL,
    activa BIT DEFAULT 1,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
)
GO
ALTER TABLE dbo.correo ADD CONSTRAINT correo_email PRIMARY KEY CLUSTERED (email ASC)
