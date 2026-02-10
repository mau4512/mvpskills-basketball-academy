# 🏀 Sistema de Seguimiento de Entrenamientos - Guía de Uso

## ✅ Funcionalidad Implementada: Sesiones Completadas

### 📋 Resumen
Ahora cuando un deportista completa un entrenamiento, el entrenador puede ver todo el progreso, resultados y observaciones desde su dashboard.

---

## 🔄 Flujo Completo

### 1️⃣ **Entrenador Crea Plan de Entrenamiento**
- Ir a `/entrenador/entrenamientos`
- Crear un nuevo plan con ejercicios
- Configurar puntos de tiro (esquinas, codos, centro)
- Opción de seleccionar "ambos lados" para cada punto
- Guardar el plan asignado a un turno

### 2️⃣ **Deportista Ejecuta el Entrenamiento**
- El deportista ve el plan en su dashboard (`/deportista`)
- Click en "Iniciar Entrenamiento"
- Para cada ejercicio:
  - Ver pizarra táctica (si tiene)
  - Ingresar **intentos de tiro** para cada posición
  - Agregar observaciones personales
  - Marcar como completado
- Al finalizar, click en "Finalizar y Guardar"
- ✅ **El sistema calcula automáticamente los porcentajes**: `convertidos/intentos`

### 3️⃣ **Entrenador Revisa el Progreso**
- Ir al dashboard del entrenador (`/entrenador`)
- Click en "Ver Sesiones Completadas" (botón naranja destacado)
- Ver lista de sesiones con:
  - Foto y nombre del deportista
  - Fecha y duración
  - Cantidad de ejercicios completados
- Click en una sesión para expandir detalles:
  - **Observaciones generales** del deportista
  - **Resultados por ejercicio**:
    - Estado (completado/pendiente)
    - Notas específicas del ejercicio
    - **Estadísticas de tiro por posición**:
      - Meta de convertidos
      - Intentos realizados
      - Porcentaje de efectividad
      - Desglose por lado (izq/der) si aplica

---

## 📊 Datos que se Guardan

### Por Sesión:
- Deportista (con foto)
- Plan de entrenamiento asignado
- Fecha y hora de ejecución
- Duración total
- Observaciones generales

### Por Ejercicio:
- Título del ejercicio
- Estado de completitud
- Notas/observaciones específicas
- **Puntos de tiro** (si aplica):
  - Posición (esquina izq, codo izq, centro, codo der, esquina der)
  - Meta de convertidos
  - Intentos lado izquierdo
  - Intentos lado derecho
  - Porcentaje de efectividad calculado

---

## 🎯 Cálculo de Porcentajes

**Fórmula correcta**: `(Convertidos / Intentos) × 100`

**Ejemplo**:
- Entrenador establece: 10 tiros convertidos (meta)
- Deportista ingresa: 20 intentos (total de tiros tomados)
- Resultado: 10/20 = **50% de efectividad**

---

## 🔗 URLs Importantes

| Rol | URL | Descripción |
|-----|-----|-------------|
| Entrenador | `/entrenador` | Dashboard principal |
| Entrenador | `/entrenador/entrenamientos` | Crear planes de entrenamiento |
| Entrenador | `/entrenador/sesiones` | Ver sesiones completadas |
| Deportista | `/deportista` | Dashboard con planes asignados |
| Deportista | `/deportista/ejecutar-entrenamiento/[id]` | Ejecutar entrenamiento |

---

## 🎨 Visualización de Datos

### En Sesiones Completadas:
- **Verde**: Ejercicios completados
- **Gris**: Ejercicios pendientes
- **Verde**: Porcentajes ≥ 50% (buena efectividad)
- **Naranja**: Porcentajes < 50% (necesita mejorar)

### Información que ve el Entrenador:
1. **Tarjeta de Resumen**:
   - Foto del deportista
   - Nombre completo
   - Título del plan
   - Fecha y duración
   - Progreso (X/Y ejercicios completados)

2. **Detalles Expandidos**:
   - Observaciones del deportista (consolidadas)
   - Lista de ejercicios con estado
   - Notas por ejercicio
   - Grid de estadísticas de tiro
   - Porcentajes por posición y lado

---

## 🛠️ Cambios Técnicos Implementados

### Base de Datos (Prisma):
```prisma
model SesionEntrenamiento {
  id                    String
  deportistaId          String
  planEntrenamientoId   String
  fecha                 DateTime
  duracion              Int
  resultados            Json
  observaciones         String?
}
```

### API Endpoints:
- `GET /api/sesiones?entrenadorId=X` - Obtener sesiones de un entrenador
- `GET /api/sesiones?deportistaId=X` - Obtener sesiones de un deportista
- `GET /api/sesiones?planId=X` - Obtener sesiones de un plan específico
- `POST /api/sesiones` - Crear nueva sesión
- `GET /api/sesiones/[id]` - Obtener detalles de una sesión
- `DELETE /api/sesiones/[id]` - Eliminar una sesión

### Componentes:
- `/entrenador/sesiones/page.tsx` - Vista de sesiones completadas
- Actualización en `/deportista/ejecutar-entrenamiento/[id]/page.tsx` - Guardar con observaciones

---

## 🚀 Próximos Pasos Sugeridos

1. **Estadísticas Agregadas**: Dashboard con promedios de efectividad
2. **Comparaciones**: Evolución del deportista en el tiempo
3. **Exportar Datos**: Generar reportes PDF/Excel
4. **Notificaciones**: Alertar al entrenador cuando se complete una sesión
5. **Comentarios del Entrenador**: Que el entrenador pueda agregar feedback

---

## 📝 Notas Importantes

- Las sesiones se guardan automáticamente al hacer click en "Finalizar y Guardar"
- Los porcentajes se calculan en tiempo real
- Las observaciones son opcionales pero recomendadas
- El sistema preserva todas las pizarras tácticas del plan original
- Los datos son persistentes y no se pierden al refrescar la página

---

## 🐛 Testing Recomendado

1. Crear un plan de entrenamiento con 3 ejercicios
2. Incluir puntos de tiro en al menos 2 ejercicios
3. Ejecutar como deportista
4. Ingresar diferentes valores de intentos
5. Agregar observaciones
6. Guardar la sesión
7. Revisar como entrenador en `/entrenador/sesiones`
8. Verificar que todos los datos se muestran correctamente

---

**Última actualización**: Febrero 2026
**Estado**: ✅ Funcional y probado
