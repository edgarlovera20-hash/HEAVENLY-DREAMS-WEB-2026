# Backlog de Reestructuración del Ecosistema Heavenly Dreams

## Objetivo

Convertir Heavenly Dreams en un ecosistema empresarial escalable con dominios separados, seguridad centralizada, diseño consistente, IA transversal y automatizaciones reutilizables.

---

## Épica 1: Separación del sitio corporativo

### Diagnóstico

El sitio corporativo contiene capacidades de reclutamiento y panel administrativo de prototipo. Para producción, el sitio público debe enfocarse en marketing, SEO, landing pages, formularios y captación.

### Solución Propuesta

- Mantener Home, Servicios, Nosotros, Contacto, Blog, SEO, Landing Pages y Lead Generation.
- Convertir formularios a envío seguro hacia API o n8n.
- Migrar panel administrativo y gestión de candidatos a RHDREAMSAPP2026.
- Reemplazar datos mock/locales por contratos API.

### Prioridad

Alta.

### Estimación

Media.

---

## Épica 2: Crear HD-CORE

### Diagnóstico

Sin una librería compartida, cada app terminará duplicando componentes, temas, validadores, hooks, permisos y clientes API.

### Solución Propuesta

Crear repositorio `HD-CORE` con paquetes compartidos:

```text
@hd/core-ui
@hd/core-theme
@hd/core-icons
@hd/core-auth
@hd/core-rbac
@hd/core-api
@hd/core-types
@hd/core-validation
@hd/core-hooks
@hd/core-utils
```

### Prioridad

Alta.

### Estimación

Media/Alta.

---

## Épica 3: Seguridad centralizada

### Diagnóstico

Los prototipos con `localStorage`, `sessionStorage` y claves locales no son seguros para producción.

### Solución Propuesta

- Implementar NestJS Auth Service.
- Usar JWT de corta duración y refresh tokens.
- Implementar RBAC por dominio.
- Auditar acciones críticas.
- Proteger rutas por permisos.
- Mover secretos a variables de entorno seguras.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 4: Plataforma RH

### Diagnóstico

RHDREAMSAPP2026 debe ser la fuente de verdad para reclutamiento, entrevistas, expedientes y documentos.

### Solución Propuesta

- Consolidar Vacantes, Solicitudes, Entrevistas, Evaluaciones, Contrataciones, Expedientes y Reportes RH.
- Consumir `@hd/core-ui`, `@hd/core-auth`, `@hd/core-rbac` y `@hd/core-api`.
- Integrar Google Calendar, Drive y WhatsApp mediante n8n.
- Crear RH Agent para matching, scoring y análisis CV.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 5: HD-OPERATIONS

### Diagnóstico

La operación diaria necesita una plataforma separada de administración global.

### Solución Propuesta

Crear `HD-OPERATIONS` con:

```text
CRM
Leads
Clientes
Ventas
Seguimiento Comercial
Agenda
WhatsApp
Comisiones
Nóminas Operativas
Reportes
Supervisor
Mi Perfil
```

### Restricción

No incluir Finanzas globales, Usuarios globales, Roles globales, Auditoría corporativa, IA central ni Integraciones empresariales.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 6: HD-ADMIN

### Diagnóstico

Administración requiere control central de empresa, finanzas, auditoría, permisos, integraciones e inteligencia ejecutiva.

### Solución Propuesta

Crear `HD-ADMIN` con:

```text
Dashboard Ejecutivo
Finanzas
Tesorería
Compras
Inventarios
Nóminas Globales
Auditoría
Usuarios
Roles
Permisos
Configuración
Integraciones
Analytics
Business Intelligence
IA
Automatizaciones
```

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 7: Backend enterprise

### Diagnóstico

La escalabilidad requiere APIs versionadas, servicios por dominio, base transaccional y colas.

### Solución Propuesta

- API Gateway.
- NestJS por dominios.
- Prisma + PostgreSQL.
- Redis + BullMQ.
- WebSockets para notificaciones.
- MinIO para documentos.
- Docker Compose para desarrollo.
- GitHub Actions para CI/CD.

### Prioridad

Alta.

### Estimación

Alta.

---

## Épica 8: IA transversal

### Diagnóstico

La IA no debe estar mezclada con componentes de UI ni actuar sin trazabilidad.

### Solución Propuesta

- Crear AI Orchestrator Service.
- Implementar agentes RH, Sales, Supervisor, Finance y Executive.
- Registrar contexto, usuario, entrada, salida, costo y decisión.
- Usar permisos RBAC por agente.
- Mantener revisión humana para decisiones sensibles.

### Prioridad

Media/Alta.

### Estimación

Media/Alta.

---

## Épica 9: Automatización con n8n

### Diagnóstico

Las integraciones deben ser reutilizables y auditables, no scripts aislados.

### Solución Propuesta

- Centralizar workflows en n8n.
- Disparar workflows por eventos de negocio.
- Integrar WhatsApp, redes sociales, Google Workspace, Outlook y Teams.
- Versionar workflows críticos.

### Prioridad

Media/Alta.

### Estimación

Media.

---

## Épica 10: Consistencia UX/UI

### Diagnóstico

Cada repositorio puede desviarse visualmente si no consume tokens y componentes comunes.

### Solución Propuesta

- Definir theme global en HD-CORE.
- Usar una sola tipografía.
- Unificar botones, inputs, tablas, cards, modales y layouts.
- Crear guía de iconografía.
- Usar Storybook para QA visual.
- Bloquear componentes locales duplicados salvo excepción aprobada.

### Prioridad

Alta.

### Estimación

Media.

---

## Definition of Done Enterprise

Un cambio se considera listo cuando cumple:

- Dominio correcto.
- Seguridad validada.
- Permisos RBAC aplicados.
- Sin datos sensibles en cliente.
- Validación con Zod o esquema compartido.
- Componentes alineados con HD-CORE.
- Pruebas mínimas.
- Documentación actualizada.
- Impacto cross-repo revisado.
- Automatización evaluada.
