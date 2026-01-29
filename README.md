# MVP Skills - Basketball Training Tracker

🏀 Aplicación web completa para el seguimiento de entrenamiento de baloncesto y preparación física.

## 🚀 Características

- **Perfil del Deportista**: Gestión de información personal, mediciones antropométricas y métricas físicas
- **Gestión de Ejercicios**: Biblioteca de ejercicios con posibilidad de subir esquemas (imágenes y PDFs)
- **Seguimiento de Sesiones**: Registro detallado de entrenamientos, partidos y preparación física
- **Análisis de Tiro**: Medición de porcentajes de tiro por tipo y zona de cancha
- **Evolución de Cargas**: Monitoreo del progreso físico y cargas de entrenamiento
- **Visualización de Datos**: Gráficos y estadísticas de evolución temporal
- **Base de Datos en Docker**: PostgreSQL containerizado para desarrollo

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: PostgreSQL (Docker)
- **ORM**: Prisma
- **Gráficos**: Recharts
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Docker y Docker Compose instalados
- npm o yarn

## 🏁 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd mvpskills_project
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y ajusta las variables:

```bash
cp .env.example .env
```

Contenido de `.env`:
```env
DATABASE_URL="postgresql://mvpskills:mvpskills_password@localhost:5432/basketball_tracker?schema=public"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Iniciar la base de datos con Docker

```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en el puerto `5432`
- PgAdmin en el puerto `5050` (http://localhost:5050)

Credenciales de PgAdmin:
- Email: `admin@mvpskills.com`
- Password: `admin`

### 5. Configurar la base de datos con Prisma

```bash
# Generar el cliente de Prisma
npm run db:generate

# Crear las tablas en la base de datos
npm run db:push
```

### 6. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
mvpskills_project/
├── prisma/
│   └── schema.prisma          # Modelos de base de datos
├── public/                    # Archivos estáticos
├── src/
│   ├── app/                   # App Router de Next.js
│   │   ├── dashboard/         # Páginas del dashboard
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes React
│   │   ├── ui/                # Componentes UI reutilizables
│   │   └── Navbar.tsx         # Barra de navegación
│   └── lib/                   # Utilidades y configuración
│       ├── constants.ts       # Constantes de la app
│       ├── prisma.ts          # Cliente de Prisma
│       └── utils.ts           # Funciones auxiliares
├── docker-compose.yml         # Configuración de Docker
├── .env                       # Variables de entorno (local)
├── .env.example               # Ejemplo de variables de entorno
├── next.config.js             # Configuración de Next.js
├── tailwind.config.ts         # Configuración de Tailwind
└── package.json               # Dependencias del proyecto
```

## 🗄️ Modelos de Base de Datos

### Deportista
- Información personal (nombre, apellidos, email)
- Datos físicos (altura, peso, posición)
- Foto de perfil

### Ejercicio
- Título y descripción
- Categoría (Tiro, Defensa, Físico, Técnico)
- Archivos adjuntos (PDFs, imágenes)
- Nivel de dificultad

### Sesión
- Fecha y duración
- Tipo (Entrenamiento, Partido, Preparación Física)
- Relación con ejercicios realizados
- Notas adicionales

### MedicionTiro
- Tipo de tiro (Libre, Triple, Media distancia)
- Intentos y aciertos
- Porcentaje calculado
- Zona de la cancha

### Medicion
- Mediciones antropométricas (peso, altura, IMC)
- Tests físicos (VO2max, salto vertical, velocidad)
- Registro temporal de evolución

## 🎯 Funcionalidades Principales

### Dashboard
- Vista general con estadísticas rápidas
- Últimas sesiones de entrenamiento
- Objetivos del mes con barras de progreso
- Acceso rápido a todas las secciones

### Gestión de Ejercicios
- Crear y editar ejercicios personalizados
- Subir esquemas en PDF o imágenes
- Categorizar por tipo y dificultad
- Biblioteca organizada de ejercicios

### Registro de Sesiones
- Crear sesiones de entrenamiento
- Añadir ejercicios con series, repeticiones y cargas
- Registrar mediciones de tiro
- Notas y observaciones

### Análisis Estadístico
- Gráficos de evolución de porcentajes de tiro
- Progreso de cargas físicas
- Comparativas mensuales y trimestrales
- Exportación de datos

## 🔧 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia la aplicación en producción
npm run lint         # Ejecuta el linter
npm run db:generate  # Genera el cliente de Prisma
npm run db:push      # Sincroniza el esquema con la BD
npm run db:studio    # Abre Prisma Studio (GUI para la BD)
```

## 🐳 Comandos de Docker

```bash
# Iniciar contenedores
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes (borra datos)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart postgres
```

## 📊 Acceso a la Base de Datos

### Prisma Studio
```bash
npm run db:studio
```
Abre una interfaz web en http://localhost:5555 para explorar y editar datos.

### PgAdmin
Accede a http://localhost:5050
- Email: `admin@mvpskills.com`
- Password: `admin`

Para conectar al servidor PostgreSQL:
- Host: `postgres` (dentro de Docker) o `localhost` (desde tu máquina)
- Puerto: `5432`
- Usuario: `mvpskills`
- Password: `mvpskills_password`
- Base de datos: `basketball_tracker`

## 🎨 Personalización

### Colores del tema
Edita `tailwind.config.ts` para cambiar la paleta de colores:

```typescript
colors: {
  primary: {
    // Define tus colores personalizados
  }
}
```

### Constantes de la aplicación
Modifica `src/lib/constants.ts` para ajustar:
- Posiciones de jugadores
- Categorías de ejercicios
- Tipos de tiro
- Zonas de cancha

## 🚧 Próximas Funcionalidades

- [ ] Sistema de autenticación completo con NextAuth
- [ ] Subida de archivos a almacenamiento en la nube
- [ ] Exportación de informes en PDF
- [ ] Modo oscuro
- [ ] Aplicación móvil con React Native
- [ ] Integración con wearables para datos automáticos
- [ ] Sistema de equipos y entrenadores

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código privado. Todos los derechos reservados.

## 📧 Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para mejorar el rendimiento en baloncesto**
