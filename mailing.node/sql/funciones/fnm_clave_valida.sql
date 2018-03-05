IF OBJECT_ID('fnm_clave_valida') IS NOT NULL DROP FUNCTION fnm_clave_valida
GO
CREATE FUNCTION dbo.fnm_clave_valida (@usuarioid varchar(100), @clave varchar(max))
RETURNS BIT
WITH EXECUTE AS CALLER
AS
BEGIN
    DECLARE @result AS BIT = 0
    IF EXISTS(SELECT *
    FROM usuario
    WHERE @usuarioid in (usuarioid, email) AND 1 = PWDCOMPARE(@clave,clave,0)) 
        SET @result = 1

    RETURN @result
END;
GO
