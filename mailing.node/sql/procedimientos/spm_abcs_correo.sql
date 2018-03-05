IF EXISTS(SELECT NAME
FROM SYS.OBJECTS
WHERE NAME = 'spm_abcs_correo' AND TYPE='P')
	DROP PROCEDURE spm_abcs_correo
GO
CREATE PROCEDURE DBO.spm_abcs_correo
    (
    @ACCION VARCHAR(10) = 'S',
    @nombre VARCHAR(100) = NULL,
    @email VARCHAR(100) = NULL,
    @clave VARCHAR(100) = NULL,
    @servicio VARCHAR(20) = NULL,
    @servidor VARCHAR(100) = NULL,
    @conexion_segura BIT = NULL,
    @puerto SMALLINT = NULL,
    @metodo_transporte VARCHAR(10) = NULL,
    @activa BIT = NULL
)
WITH
    ENCRYPTION
AS
BEGIN
    IF @ACCION = 'A'
	BEGIN
        INSERT INTO correo
            (
            nombre,
            email,
            clave,
            servicio,
            servidor,
            conexion_segura,
            puerto,
            metodo_transporte,
            activa
            )
        SELECT
            @nombre,
            @email,
            @clave,
            @servicio,
            @servidor,
            @conexion_segura,
            @puerto,
            @metodo_transporte,
            @activa
    END

    IF @ACCION = 'B'
	BEGIN
        DELETE correo WHERE 1 = 1 AND email = @email
    END

    IF @ACCION = 'C'
	BEGIN
        UPDATE correo SET 
			activa = CASE WHEN @activa IS NULL THEN activa ELSE @activa END,
			metodo_transporte = CASE WHEN @metodo_transporte IS NULL THEN metodo_transporte ELSE @metodo_transporte END,
			puerto = CASE WHEN @puerto IS NULL THEN puerto ELSE @puerto END,
			conexion_segura = CASE WHEN @conexion_segura IS NULL THEN conexion_segura ELSE @conexion_segura END,
			servidor = CASE WHEN @servidor IS NULL THEN servidor ELSE @servidor END,
			servicio = CASE WHEN @servicio IS NULL THEN servicio ELSE @servicio END,
			clave = CASE WHEN @clave IS NULL THEN clave ELSE @clave END,
			nombre = CASE WHEN @nombre IS NULL THEN nombre ELSE @nombre END
		WHERE 
			email = @email
    END

    IF @ACCION = 'S'
	BEGIN
        SELECT
            nombre,
            email,
            clave,
            servicio,
            servidor,
            conexion_segura,
            puerto,
            metodo_transporte,
            activa,
            fecha_registro
        FROM correo
        WHERE 1 = 1
            AND (@email IS NULL OR @email = email)
    END
END
GO

begin tran
exec spm_abcs_correo @accion='c', @servidor='smtp.gmail.com', @email='ebert15@hotmail.com'
exec spm_abcs_correo
rollback




