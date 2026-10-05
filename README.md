## ⚡ Estrategia de Caché y Estado Servidor

Este proyecto utiliza **TanStack Query (v5)** con el **App Router de Next.js** para optimizar el rendimiento mediante el uso eficiente de la memoria y la hidratación de datos.

---

### 1. Servidor a Cliente (Hidratación)

Para evitar peticiones duplicadas en la carga inicial:
1. **Servidor:** Pre-carga los datos iniciales con `prefetchQuery()` o `prefetchInfiniteQuery()`.
2. **Serialización:** Convierte el estado de la memoria a JSON usando `dehydrate()`.
3. **Cliente:** Recibe los datos mediante `<HydrationBoundary>` e inyecta la caché directamente en la memoria RAM del navegador.

---

### 2. Convención de Claves (`queryKey`)

| Clave de Caché | Tipo | Descripción |
| :--- | :--- | :--- |
| `['pokemon-infinite']` | Scroll Infinito | Almacena la matriz acumulativa de páginas (`data.pages`). |
| `['pokemon-detail', name]` | Detalle Dinámico | Almacena la información del Pokémon actual según la variable `name`. |

> 

---

### 3. Optimizaciones Principales

* **Prefetch por Hover:** Al pasar el cursor (`onMouseEnter`) sobre la tarjeta de un Pokémon, se precarga su detalle en segundo plano. Al hacer clic, la página abre en **0 ms**.
* **Scroll Infinito Automático:** Usa `useInfiniteQuery` junto a `IntersectionObserver` (`react-intersection-observer`). El cálculo del desplazamiento se gestiona dinámicamente:
  `offset = allPages.length * 20`
* **Control de Re-peticiones:** El `useEffect` valida que la red esté libre (`!isFetchingNextPage`) antes de solicitar la siguiente página, evitando peticiones duplicadas.
