# Calculadora Ipv4

El siguiente proyecto consiste en el desarrollo de una pagina web para mostrar el funcionamiento de una calculadora ipv4

## Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Despliegue](#despliegue)

## Descripción

El proyecto consisten en la eleaboracion de una calculadora Ipv4 con el fin de desarrollar los siguiente puntos
1. Seleccionar una ip y una mascara
2. Determinar la ip de red
3. Determinar la ip de broadcast
4. Determinnar el numero de host disponibles
5. Determinar el rango de ip´s utiles
6. Determinar la calse de la ip
7. Determinar si la red es publica o privada
8. Visualizar la ip con cun resaltado teniendo encuenta la mascara
9. Determinar cual es le n-esima ip


## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (v20.12.2)
- [npm](https://www.npmjs.com/) (se instala con Node.js)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone [https://github.com/sindresorhus/del](https://github.com/sindresorhus/del)
   cd calculadora-ipv4

## Despliegue
# Despliegue de Aplicación Angular en Rocky Linux con Http-server

Este documento describe los pasos necesarios para desplegar una aplicación Angular en un servidor Rocky Linux utilizando Http-server como servidor



## Pasos de despliegue

1.  **Actualizar el sistema:**

    ```bash
    sudo dnf update -y
    ```
    ![Actualizar Paquetes de Rocky](./imagenes/actulizar%20paquetes.png)

2. **Intalar Herramientas**
    ```
    node --version

    ```
    Instalamos git para poder acceder al repositorio del proyecto

    ![Instalar Herramientas](./imagenes/Instalar%20Git.png)

    Intalamos la herramienta fnm que facilita la intalacion de node.js segun manual de descarga</br>
    [Instalacion de Node.JS](https://nodejs.org/es/download)

    ![Instalar Herramientas](./imagenes/Intalar%20fnm.png)

    Una vez instalada la herramienta fnm actualizamos el archivo **.bashrc** para que se registren los cambios
    ```
    source .bashrc
    fnm --version
    fnm install 22
    node --vesrion
    npm --version
    npm install -g @angular/cli
    ng version
    ```
    ![Instalar Herramientas](./imagenes/Instalar%20Angular.png)


3.  **Construir la aplicación Angular:**


    El proyecto se encuentra en el siguiente repositorio https://github.com/scardenasga/Calculadora-ipv4.git
    ```
        git --version
        git clone https://github.com/scardenasga/Calculadora-ipv4.git
    ```
    ![Clonar Repositorio](./imagenes/ubicar%20proyecto%20en%20git.png)
    Esto nos permitira instalar las dependencias faltantes y verificar que el sistema funciona
     ```
        npm install
        ng serve
    ```
    ![Encontrar Proyecto](./imagenes/iniciar%20proyecto.png)

    Una vez verificamos que el programa funciona podemos ejecutar el comando para construir el proyecto y solamente cargar en el sevirdor la caprte que nos genera 
    ```
        ng build --configuration production
    ```
    ![Construir Proyecto](./imagenes/crear%20ejecutable.png)

4.  **Instalacion del Servidor**
    En este caso realizaremos la intalación de **http-server** auque tambien se puede utilizar **nginx** pero debido a dificultades encontradas en su implementación este manual utilizara la primera opcion
    ```
        npm install -g http-server
    ```
    ![Instalar servidor](./imagenes/Instalar%20Servidor.png)

    Una vez tenemos la herramienta instalada podemos ejecutar el siguiente proyecto en la raiz del proyecto
    ```
    http-server -d 0.0.0.0 -p 8080
    ```
    ![Ejecutar Servidor](./imagenes/Ejecucion%20Servidor.png)

5.  **Configurar el firewall:**

    * Abre el puerto 80 en el firewall:

    ```bash
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --reload
    ```
    ![Abrir Firewall](./imagenes/Desactivar%20Firewall.png)



## Notas importantes

* La carpeta `dist` contiene los archivos estáticos de tu aplicación. aunque en este caso el sistema los almacena en en la siguiente ruta `dist\calculadora-ipv4\browser\index.html`
