IF OBJECT_ID('spm_abcs_usuario','P') IS NOT NULL DROP PROCEDURE spm_abcs_usuario
GO
CREATE PROCEDURE DBO.spm_abcs_usuario
    (
    @accion CHAR(1)='S',
    @usuarioid VARCHAR(100) = NULL,
    @clave VARCHAR(8000) = NULL,
    @nombre VARCHAR (100) = NULL,
    @email VARCHAR (100) = NULL,
    @activo BIT = NULL
)
WITH
    ENCRYPTION
AS
BEGIN
    DECLARE @SQLString AS nvarchar(MAX)

    IF @ACCION = 'A'
	BEGIN
        INSERT INTO usuario
            (usuarioid,clave,nombre,email,activo)
        SELECT @usuarioid,
            PWDENCRYPT(LTRIM(RTRIM(@clave))),
            @nombre, @email, @activo
        WHERE NOT EXISTS(SELECT *
        FROM usuario
        WHERE email=@email or usuarioid=@usuarioid)
    END
    IF @ACCION = 'B'
	BEGIN
        DELETE FROM usuario WHERE usuarioid = @usuarioid
    END
    IF @ACCION = 'C'
	BEGIN
        UPDATE [dbo].[usuario]
        SET [email] = CASE WHEN @email IS NULL THEN [email] else LOWER(@email) END
            ,[clave] = CASE WHEN @clave IS NULL THEN [clave] else PWDENCRYPT(LTRIM(RTRIM(@clave))) END
            ,[activo] = CASE WHEN @activo IS NULL THEN [activo] else @activo END
            ,[nombre] = CASE WHEN @nombre IS NULL THEN [nombre] else UPPER(@nombre) END
        WHERE 
        [usuarioid] = @usuarioid
    END
    IF @ACCION = 'S'
	BEGIN

        SELECT u.usuarioid, u.email, u.nombre, u.activo, u.fecha_registro
        FROM usuario u
        WHERE 1 = CASE WHEN @clave IS NULL THEN 1 ELSE dbo.fnm_clave_valida(@usuarioid,@clave) END
            AND (
			usuarioid = CASE WHEN @usuarioid IS NULL THEN usuarioid ELSE @usuarioid END
            OR
            u.email = CASE WHEN @usuarioid IS NULL THEN usuarioid ELSE @usuarioid END			
		)
            AND u.activo = CASE WHEN @activo IS NULL THEN u.activo ELSE @activo END
            AND nombre = CASE WHEN @nombre IS NULL THEN nombre ELSE @nombre END


    --AND	CLAVE = CASE WHEN ISNULL(@CLAVE,'')='' THEN CLAVE ELSE ENCRYPTBYPASSPHRASE(DBO.FNS_VALORVARIABLE('KEYCIFRAR'),LTRIM(RTRIM(@CLAVE))) END
    END
END
GO
EXEC DBO.spm_abcs_usuario @accion='a',@usuarioid='ezerpa',@clave='enclave', @nombre='ebert zerpa',@activo=1,@email='ebert15@hotmail.com'
--EXEC DBO.spm_abcs_usuario @ACCION='S',@USUARIOID='EZERPA',@CLAVE='enclave', @SEDEID='PPAL'
EXEC DBO.spm_abcs_usuario




