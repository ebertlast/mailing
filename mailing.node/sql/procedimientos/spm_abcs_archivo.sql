IF EXISTS(SELECT NAME
FROM SYS.OBJECTS
WHERE NAME = 'spm_abcs_archivo' AND TYPE='P')
	DROP PROCEDURE spm_abcs_archivo
GO
CREATE PROCEDURE DBO.spm_abcs_archivo
    (
    @accion VARCHAR(10) = 'S',
    @archivoid VARCHAR(20) = NULL,
    @name VARCHAR(500) = NULL,
    @data VARBINARY(8000) = NULL,
    @encoding VARCHAR(10) = NULL,
    @mimetype VARCHAR(100) = NULL,
    @terceroid VARCHAR(20) = NULL,
    @directory VARCHAR(1000) = NULL,
    @usuarioid VARCHAR(100) = NULL
)
WITH
    ENCRYPTION
AS
BEGIN
    IF @accion = 'A'
	BEGIN
        IF isnull(@archivoid,'')=''
            SET @archivoid = replace(NEWID(),'-','')

        INSERT INTO archivo
            (
            archivoid,
            name,
            data,
            encoding,
            mimetype,
            terceroid,
            directory,
            usuarioid
            )
        SELECT
            @archivoid,
            @name,
            @data,
            @encoding,
            @mimetype,
            @terceroid,
            @directory,
            @usuarioid
    END

    IF @accion = 'B'
	BEGIN
        IF @directory IS NOT NULL
        BEGIN
            DELETE archivo WHERE directory = @directory AND (@archivoid IS NULL OR @archivoid = archivoid)
        END
        ELSE
        BEGIN
            DELETE archivo WHERE 1 = 1 AND archivoid = @archivoid
        END
    END

    IF @accion = 'C'
	BEGIN
        UPDATE archivo SET 
			usuarioid = CASE WHEN @usuarioid IS NULL THEN usuarioid ELSE @usuarioid END,
			directory = CASE WHEN @directory IS NULL THEN directory ELSE @directory END,
			terceroid = CASE WHEN @terceroid IS NULL THEN terceroid ELSE @terceroid END,
			mimetype = CASE WHEN @mimetype IS NULL THEN mimetype ELSE @mimetype END,
			encoding = CASE WHEN @encoding IS NULL THEN encoding ELSE @encoding END,
			data = CASE WHEN @data IS NULL THEN data ELSE @data END,
			name = CASE WHEN @name IS NULL THEN name ELSE @name END
		WHERE 
			archivoid = @archivoid
    END

    IF @accion = 'S'
	BEGIN
        SELECT
            archivoid,
            name,
            data,
            encoding,
            mimetype,
            terceroid,
            directory,
            usuarioid
        FROM archivo
        WHERE 1 = 1
            AND (@archivoid IS NULL OR @archivoid = archivoid)
            AND directory = CASE WHEN @directory IS NULL THEN directory ELSE @directory END
    END
END
GO