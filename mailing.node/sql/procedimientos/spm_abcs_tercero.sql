IF EXISTS(SELECT NAME FROM SYS.OBJECTS WHERE NAME = 'spm_abcs_tercero' AND TYPE='P')
    DROP PROCEDURE spm_abcs_tercero
GO
CREATE PROCEDURE DBO.spm_abcs_tercero
(
    @accion VARCHAR(10) = 'S',
    @terceroid VARCHAR(20) = NULL,
    @razonsocial VARCHAR(500) = NULL,
    @email1 VARCHAR(100) = NULL,
    @email2 VARCHAR(100) = NULL,
    @email3 VARCHAR(100) = NULL,
    @email4 VARCHAR(100) = NULL,
    @movil1 VARCHAR(13) = NULL,
    @movil2 VARCHAR(13) = NULL,
    @movil3 VARCHAR(13) = NULL
)
WITH ENCRYPTION
AS
BEGIN
    IF @accion = 'A'
    BEGIN
        INSERT INTO tercero(
            terceroid,
            razonsocial,
            email1,
            email2,
            email3,
            email4,
            movil1,
            movil2,
            movil3
        )
        SELECT
            @terceroid,
            @razonsocial,
            @email1,
            @email2,
            @email3,
            @email4,
            @movil1,
            @movil2,
            @movil3
    END

    IF @accion = 'B'
    BEGIN
        DELETE tercero WHERE 1 = 1 AND terceroid = @terceroid 
    END

    IF @accion = 'C'
    BEGIN
        UPDATE tercero SET 
            movil3 = CASE WHEN @movil3 IS NULL THEN movil3 ELSE @movil3 END,
            movil2 = CASE WHEN @movil2 IS NULL THEN movil2 ELSE @movil2 END,
            movil1 = CASE WHEN @movil1 IS NULL THEN movil1 ELSE @movil1 END,
            email4 = CASE WHEN @email4 IS NULL THEN email4 ELSE @email4 END,
            email3 = CASE WHEN @email3 IS NULL THEN email3 ELSE @email3 END,
            email2 = CASE WHEN @email2 IS NULL THEN email2 ELSE @email2 END,
            email1 = CASE WHEN @email1 IS NULL THEN email1 ELSE @email1 END,
            razonsocial = CASE WHEN @razonsocial IS NULL THEN razonsocial ELSE @razonsocial END
        WHERE 
            terceroid = @terceroid 
    END

    IF @accion = 'S'
    BEGIN
        SELECT 
            terceroid,
            razonsocial,
            email1,
            email2,
            email3,
            email4,
            movil1,
            movil2,
            movil3
        FROM tercero
        WHERE 1 = 1
        AND (@terceroid IS NULL OR @terceroid = terceroid)
    END
END
GO