<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html"> <!-- Gerar index.html --> 
            <html>
                <head>
                    <title>Arquivo Arqueológico</title>
                </head>
                <body>
                    <h2>Lista De ARQ</h2>
                    <h3>Índice de ARQELEM</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice"> 
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- Template para índice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Template para conteúdo -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p>
                        <b>Lugar: </b>
                        <xsl:value-of select="IDENTI"/>
                    </p>
                    <p>
                        <b>Tipo: </b>
                        <xsl:value-of select="TIPO/@ASSUNTO"/>
                    </p>
                    <hr/>
                    <p>
                        <b>Freguesia: </b>
                        <xsl:value-of select="FREGUE"/>
                    </p>
                    <p>
                        <b>Concelho: </b>
                        <xsl:value-of select="CONCEL"/>
                    </p>
                    <p>
                        <b>Código: </b>
                        <xsl:value-of select="CODADM"/>
                    </p>
                    <p>
                        <b>Latitude: </b>
                        <xsl:value-of select="LATITU"/>
                    </p>
                    <p>
                        <b>Longitude: </b>
                        <xsl:value-of select="LONGIT"/>
                    </p>
                    
                    <p>
                        <b>Altitude: </b>
                        <xsl:value-of select="ALTITU"/>
                    </p>
                    <hr/>
                    <xsl:if test="ACESSO">
                        <p>
                            <b>Acesso: </b>
                            <xsl:value-of select="ACESSO"/>
                        </p>
                    </xsl:if>
                    <p>
                        <b>Descrição: </b>
                        <xsl:value-of select="DESCRI/LIGA"/>    
                    </p>
                    
                    <xsl:if test="CRONO">
                        <b>Crono: </b>
                        <xsl:value-of select="CRONO"/>
                    </xsl:if>
                    <p>
                        <b>Quadro: </b>
                        <xsl:value-of select="QUADRO"/>
                    </p>
                    <xsl:if test="TRAARQ">
                        <p>
                            <b>Traarq: </b>
                            <xsl:value-of select="TRAARQ"/>
                        </p>
                    </xsl:if>
                    <p>
                        <b>Desarq: </b>
                        <xsl:value-of select="DESARQ"/>
                    </p>
                    <xsl:if test="INTERP">
                        <p>
                            <b>Interp: </b>
                            <xsl:value-of select="INTERP"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="DEPOSI">
                        <p>
                            <b>Deposi: </b>
                            <xsl:value-of select="DEPOSI"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="INTERE">
                        <p>
                            <b>Intere: </b>
                            <xsl:value-of select="INTERE"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="IMAGEM">
                        <p>IMAGEM: </p>
                        <img>
                            <xsl:attribute name="src">
                                <xsl:value-of select="IMAGEM/@NOME"/>
                            </xsl:attribute>
                        </img>
                    </xsl:if>
                    <p>
                        <b>Autor: </b>
                        <i>: <xsl:value-of select="AUTOR"/> </i> <xsl:value-of select="DATA"/>
                    </p>
                    
                    <xsl:if test="BIBLIO">
                        <xsl:for-each select="BIBLIO">
                            <li>
                                <xsl:value-of select="."/>
                            </li>
                        </xsl:for-each>
                    </xsl:if>
                    <address>
                        [<a href="index.html#i{generate-id()}">Voltar à home</a>]
                    </address>
                    [<a href="index.html">Seguinte</a>]
                    <address>
                        [<a href="index.html">Retroceder</a>]
                    </address>
                        
                     
                    
                   
                    
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>