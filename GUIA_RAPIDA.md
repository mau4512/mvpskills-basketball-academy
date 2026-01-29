# Guía Rápida - MVP Skills Basketball Tracker

## ✅ Proyecto Completado

Tu aplicación web de seguimiento de baloncesto está lista para usar. A continuación encontrarás toda la información necesaria.

## 🌐 Acceso a la Aplicación

La aplicación está ejecutándose en: **http://localhost:3000**

### Páginas Disponibles

1. **Página Principal**: http://localhost:3000
   - Landing page con descripción de características

2. **Dashboard**: http://localhost:3000/dashboard
   - Vista general con estadísticas rápidas
   - Últimas sesiones y objetivos del mes

3. **Perfil**: http://localhost:3000/dashboard/perfil
   - Editar información personal del deportista
   - Ver mediciones antropométricas

4. **Ejercicios**: http://localhost:3000/dashboard/ejercicios
   - Biblioteca de ejercicios organizados
   - Filtros por categoría

5. **Sesiones**: http://localhost:3000/dashboard/sesiones
   - Registro de entrenamientos
   - Resumen de actividad semanal

6. **Estadísticas**: http://localhost:3000/dashboard/estadisticas
   - Gráficos de evolución de tiro
   - Progreso físico
   - Volumen de entrenamiento

## 🐳 Gestión de Docker

### Estado Actual
Los contenedores están corriendo:
- **PostgreSQL**: Puerto 5432
- **PgAdmin**: Puerto 5050 (http://localhost:5050)

### Comandos Útiles

```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs
docker-compose logs -f

# Detener contenedores
docker-compose down

# Reiniciar contenedores
docker-compose restart
```

### Acceso a PgAdmin
- URL: http://localhost:5050
- Email: `admin@mvpskills.com`
- Password: `admin`

**Conexión a PostgreSQL desde PgAdmin:**
- Host: `postgres` (dentro de Docker) o `localhost` (local)
- Puerto: `5432`
- Base de datos: `basketball_tracker`
- Usuario: `mvpskills`
- Password: `mvpskills_password`

## 🗄️ Base de Datos

### Tablas Creadas

1. **deportistas**: Información de atletas
2. **ejercicios**: Biblioteca de ejercicios
3. **sesiones**: Registro de entrenamientos
4. **sesiones_ejercicios**: Relación sesión-ejercicio
5. **mediciones_tiro**: Porcentajes de tiro
6. **mediciones**: Mediciones físicas

### Prisma Studio

Para explorar la base de datos visualmente:

```bash
npm run db:studio
```

Abre http://localhost:5555 en tu navegador.

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm run start

# Ejecutar linter
npm run lint

# Regenerar cliente Prisma
npm run db:generate

# Sincronizar esquema con BD
npm run db:push
```

## 📊 Estructura de Datos

### Categorías de Ejercicios
- Tiro
- Defensa
- Físico
- Técnico
- Táctico
- Rebote
- Pase

### Tipos de Sesión
- Entrenamiento
- Partido
- Preparación Física
- Test Físico
- Recuperación

### Tipos de Tiro
- Tiro Libre
- Triple
- Media Distancia
- Bandeja
- Gancho
- En Movimiento

### Posiciones de Jugador
- Base
- Escolta
- Alero
- Ala-Pívot
- Pívot

## 🎨 Tecnologías Implementadas

- ✅ Next.js 14 (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ PostgreSQL (Docker)
- ✅ Prisma ORM
- ✅ Recharts (gráficos)
- ✅ Lucide React (iconos)
- ✅ React Hook Form + Zod (preparado)

## 🔜 Próximos Pasos Sugeridos

### 1. Implementar APIs
Crear endpoints en `src/app/api/` para:
- CRUD de deportistas
- CRUD de ejercicios
- CRUD de sesiones
- Registro de mediciones

### 2. Autenticación
Implementar NextAuth para login/registro:
```bash
# Ya instalado en package.json
# Configurar en src/app/api/auth/[...nextauth]/route.ts
```

### 3. Subida de Archivos
Implementar sistema de upload para:
- Esquemas de ejercicios (PDF/imágenes)
- Fotos de perfil
- Videos de ejercicios

Opciones:
- Almacenamiento local en `/public/uploads`
- Cloudinary o AWS S3

### 4. Formularios Completos
Crear formularios funcionales con react-hook-form:
- Crear nuevo ejercicio
- Registrar sesión
- Añadir medición de tiro
- Registrar test físico

### 5. Mejorar Gráficos
- Añadir más tipos de visualizaciones
- Filtros por rango de fechas
- Comparativas entre períodos
- Exportar gráficos como imagen

### 6. Tests
- Tests unitarios con Jest
- Tests E2E con Playwright
- Tests de integración con Prisma

## 📱 Hacer Responsive

La aplicación ya tiene estilos responsive básicos con Tailwind, pero puedes mejorar:
- Menú móvil hamburguesa
- Tarjetas adaptativas
- Gráficos responsivos mejorados

## 🔐 Seguridad

Antes de producción:
1. Cambiar `NEXTAUTH_SECRET` en `.env`
2. Cambiar credenciales de PostgreSQL
3. Cambiar credenciales de PgAdmin
4. Implementar validación de formularios
5. Sanitizar inputs de usuario

## 📝 Añadir Datos de Prueba

Puedes usar Prisma Studio o crear un seed:

```bash
# Crear archivo prisma/seed.ts
# Añadir script en package.json:
# "prisma": { "seed": "ts-node prisma/seed.ts" }
```

## 🐛 Solución de Problemas

### Error de conexión a BD
```bash
# Verificar que Docker está corriendo
docker-compose ps

# Reiniciar contenedores
docker-compose restart postgres
```

### Error de Prisma Client
```bash
# Regenerar cliente
npm run db:generate
```

### Puerto 3000 ocupado
```bash
# Cambiar puerto en package.json:
# "dev": "next dev -p 3001"
```

## 📞 Soporte

Para más información consulta:
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Tailwind](https://tailwindcss.com/docs)
- [Documentación de Recharts](https://recharts.org/en-US/)

---

**¡Tu aplicación está lista para ser personalizada y expandida! 🏀**
