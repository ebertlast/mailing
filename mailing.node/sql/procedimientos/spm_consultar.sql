IF OBJECT_ID('spm_consultar') IS NOT NULL DROP PROCEDURE spm_consultar
GO
CREATE PROCEDURE spm_consultar
    @Tabla varchar(100),
    @Esquema varchar(20) = 'dbo',
    @StringABuscar VARCHAR(100) = '%%',
    @NumPagina as int = 1,
    @TamPagina as int = 10,
    @OrdenarPor as varchar(100) = '',
    @Columnas  as varchar(max) ='',
    @SelCol	   as varchar(max) = NULL,
    @CantPaginas INT OUT,
    @TotalRegistos INT OUT
AS
DECLARE @sqlCommand Nvarchar(max) = ''
DECLARE @ParmDefinition nvarchar(500) = ''
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    --------------------- INICIACIÓN DE VARIABLES -----------------------
    IF @StringABuscar  = '' SET @StringABuscar = '%%'
    SET @CantPaginas = 0
    SET @TotalRegistos = 0
    ---------------------------------------------------------------------

    --------------------- SI @OrdenarPor ESTÁ VACÍO ---------------------
    IF @OrdenarPor = '' 
	BEGIN
        SELECT TOP 1
            @OrdenarPor = COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = @Esquema
            AND TABLE_NAME = @Tabla
    --AND DATA_TYPE IN ('char','nchar','ntext','nvarchar','text','varchar')
    END
    ----------------------------------------------------------------------------

    --------------------- CONSTRUCCIÓN DE LA CONSULTA -------------------------
    SELECT @sqlCommand = 'SELECT overall_count = COUNT(*) OVER(),'+ ISNULL(@SelCol,'*') +' FROM [' + @Esquema + '].[' + @Tabla + '] WHERE '

    SET @sqlCommand = ' FROM [' + @Esquema + '].[' + @Tabla + '] WHERE '
    IF @Columnas = ''
	BEGIN
        SELECT @sqlCommand = @sqlCommand + '[' + COLUMN_NAME + '] LIKE ''' + @StringABuscar + ''' OR '
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = @Esquema
            AND TABLE_NAME = @Tabla
            --AND DATA_TYPE IN ('char','nchar','ntext','nvarchar','text','varchar')
            AND DATA_TYPE NOT IN ('BIGINT')
        SET @sqlCommand = left(@sqlCommand,len(@sqlCommand)-3)
        SET @sqlCommand = @sqlCommand+' ORDER BY '+@OrdenarPor
    END
	ELSE
	BEGIN
        SELECT @sqlCommand = @sqlCommand + '[' + COLUMN_NAME + '] LIKE ''' + @StringABuscar + ''' OR '
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = @Esquema
            AND TABLE_NAME = @Tabla
            AND COLUMN_NAME IN (SELECT WORD
            FROM dbo.fnm_explode (@Columnas,','))
            AND DATA_TYPE NOT IN ('BIGINT')
        SET @sqlCommand = left(@sqlCommand,len(@sqlCommand)-3)
        SET @sqlCommand = @sqlCommand+' ORDER BY '+@OrdenarPor
    END

    SET @sqlCommand=@sqlCommand+' OFFSET ('+CAST(@NumPagina AS VARCHAR)+'-1)*'+CAST(@TamPagina AS VARCHAR)+' ROWS '
    SET @sqlCommand=@sqlCommand+' FETCH NEXT '+CAST(@TamPagina AS VARCHAR)+'ROWS ONLY '
    ---------------------------------------------------------------------------

    --------------------- CONTAR LOS REGISTROS DE LA TABLA ---------------------
    DECLARE @sqlCommand2 AS NVARCHAR(MAX) = N'SELECT @TotalRegistos = COUNT(*) OVER() ' + @sqlCommand;
    SET @ParmDefinition = N'@TotalRegistos int OUTPUT';
    EXEC sp_executesql @sqlCommand2, @ParmDefinition, @TotalRegistos = @TotalRegistos OUTPUT;
    ----------------------------------------------------------------------------

    --------------------- CANTIDAD DE PAGINAS TOTALES ---------------------
    SELECT @CantPaginas = (@TotalRegistos / @TamPagina) + CASE WHEN @TotalRegistos % @TamPagina > 0 THEN 1 ELSE 0 END
    -----------------------------------------------------------------------
    SET @CantPaginas=@CantPaginas * 1
    SET @TotalRegistos=@TotalRegistos * 1

    --------------------- EJECUTAR CONSULTA FINAL CONSTRUIDA ---------------------
    SET @sqlCommand = 'SELECT '+ ISNULL(@SelCol,'*') +' ' + @sqlCommand
    PRINT @sqlCommand
    EXEC sys.sp_executesql @sqlCommand
------------------------------------------------------------------------------

END
GO
