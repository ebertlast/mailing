IF EXISTS(SELECT NAME
FROM SYS.OBJECTS
WHERE NAME = 'spm_abcs_plantilla' AND TYPE='P')
	DROP PROCEDURE spm_abcs_plantilla
GO
CREATE PROCEDURE DBO.spm_abcs_plantilla
    (
    @accion VARCHAR(10) = 'S',
    @plantillaid VARCHAR(20) = NULL,
    @descripcion VARCHAR(100) = NULL,
    @email BIT = NULL,
    @asunto VARBINARY = NULL,
    @cuerpohtml VARCHAR(8000) = NULL,
    @cuerpotexto VARCHAR(8000) = NULL
)
WITH
    ENCRYPTION
AS
BEGIN
    IF @accion = 'A'
	BEGIN
        INSERT INTO plantilla
            (
            plantillaid,
            descripcion,
            email,
            asunto,
            cuerpohtml,
            cuerpotexto
            )
        SELECT
            @plantillaid,
            @descripcion,
            @email,
            @asunto,
            @cuerpohtml,
            @cuerpotexto
    END

    IF @accion = 'B'
	BEGIN
        DELETE plantilla WHERE 1 = 1 AND plantillaid = @plantillaid
    END

    IF @accion = 'C'
	BEGIN
        UPDATE plantilla SET 
			cuerpotexto = CASE WHEN @cuerpotexto IS NULL THEN cuerpotexto ELSE @cuerpotexto END,
			cuerpohtml = CASE WHEN @cuerpohtml IS NULL THEN cuerpohtml ELSE @cuerpohtml END,
			asunto = CASE WHEN @asunto IS NULL THEN asunto ELSE @asunto END,
			email = CASE WHEN @email IS NULL THEN email ELSE @email END,
			descripcion = CASE WHEN @descripcion IS NULL THEN descripcion ELSE @descripcion END
		WHERE 
			plantillaid = @plantillaid
    END

    IF @accion = 'S'
	BEGIN
        SELECT
            plantillaid,
            descripcion,
            email,
            asunto,
            cuerpohtml,
            cuerpotexto
        FROM plantilla
        WHERE 1 = 1
            AND (@plantillaid IS NULL OR @plantillaid = plantillaid)
    END
END
GO