# Frontend - Proyecto de Grado
Estimación de riesgo cardiovascular en Colombia utilizando técnicas de inteligencia artificial.
- Creado por Kevin David Rodríguez Belalcázar

# Ejecución
Para instalar las dependencias de este proyecto puedes usar el comando `npm install`.
- Npm: 9.5.1
- Node: 18.16.0

Puede ejecutarse de forma local por medio del comando 
```bash
    npm start
```
Se aclara que es requerido usar un archivo `.env` con la siguiente estructura:\
&nbsp;&nbsp; REACT_APP_API_SERVER_URL=...\
&nbsp;&nbsp; REACT_APP_AES_IV=...\
&nbsp;&nbsp; REACT_APP_AES_SECRET_KEY=...\
&nbsp;&nbsp; REACT_APP_SITE_KEY=...

Esto es necesario para las siguientes acciones:
- URL del Back-End
- Llaves para la encriptación usando AES 256, modo CBC
- Llave para usar el reCaptcha en el Front-End

# Nota del creador
Este proyecto incluído el componente front se hizo con mucho empeño durante el año 2023. 
- [Repositorio del Back-End](https://github.com/Kelocoes/proyecto-grado)
