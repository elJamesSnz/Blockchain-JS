yarn init %Iniciar el proyecto
yarn add @babel/core @babel/node @babel/preset-env --dev %Agregar depebdebcuas de Babel
yarn add eslint eslint-config-airbnb-base eslint-plugin-import --dev %seguir sintaxis - guía
yarn add nodemon --dev %para actualizar instancia en timepo real


yarn nodemon %Correr con este comando de modo que actualice correctamente en tiempo real el index.js
yarn start %ejecutar este en caso de no ser necesario el nodemon
yarn test:watch %para que esté ejecutando el test al guardar

-------------------------------------------------------------------

"lint": "eslint index.js src" es para detectar warnings o errores

---------------------------------------------------------------

Para servicios HTTP

yarn add express
yarn add body-parser %middleware que serializa las peticiones

curl http://localhost:3000/ %con el puerto 3000 (o el que se establezca arbitrariamente)
%se realiza la petición al servicio http

curl http://localhost:3000/blocks %para solicitar el bloque

---------------------------------------------------------------

Para servicios WS websocket
yarn add ws %Agrega el paquete en dependencias

------------% PARA GENERAR NUEVO NODO BAJO OTRO PUERTO% %------------
Desde Command Prompt: set PORT=puerto
Desde Power Shell: $env:PORT=puerto
Desde Bash (Windows): export PORT=puerto

%Para VS Code%

$env:HTTP_PORT=3000
$env:P2P_PORT=5000
yarn start

$env:HTTP_PORT=3001
$env:P2P_PORT=5001
yarn start

%En ese orden%

------------% POR ÚLTIMO DEBE EJECUTARSE EN CMD DENTRO DE LA RUTA DEL PROYECTO LO SIGUIENTE %------------

set HTTP_PORT=3001 && set P2P_PORT=5001 && set PEERS=ws://localhost:5000  && yarn start %Esto debe ser ejecutado ya con el puerto 3000 y 5000 de http y p2p abiertos y escuchando
Puedes hacer shift+cick derecho sobre la carpeta del proyecto para abrir CMD aquí (es decir, en el directorio)
    En caso de que te diga ejectuar Pwershell aqui, realizar los siguientes pasos
    1- Abre el Panel Configuración (Windows + I).
    2- Selecciona: Personalización - > Barra de tareas.
    3- Desactiva la opción predeterminada "Reemplazar el Símbolo del sistema por Windows PowerShell".
    o en su defecto, sobre la ruta de la carpeta del proyecto en el explorador de archivos, sustituir la ruta por "cmd".
    4. set HTTP_PORT=3001 && set P2P_PORT=5001 && set PEERS=ws://localhost:5000  && yarn start 

Para correr dos instancias / nodos, realizarlo con la sig sentencia en cmd
set HTTP_PORT=3002 && set P2P_PORT=5002 && set PEERS=ws://localhost:5000, ws://localhost:5001  && yarn start  %Esto debe ser ejecutado ya con el puerto 3000 y 5000 de http y p2p abiertos y escuchando
set HTTP_PORT=3003 && set P2P_PORT=5003 && set PEERS=ws://localhost:5000, ws://localhost:5001, ws://localhost:5002  && yarn start

------------% PARA AGREGAR BLOQUES O CHECAR LISTA DE BLOQUES %------------
Usar Postman con el método post / get respectivamente siguiendo la sintaxis de json

Para Post (http://localhost:3000/mine):
{
    "data": "pon-aquí-el-valor"
}

Para Get:

Ejecutar: http://localhost:3000/blocks
