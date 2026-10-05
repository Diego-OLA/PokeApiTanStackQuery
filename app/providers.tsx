"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


export default function Providers({ children }: { children: ReactNode }) {
    // useState evita recrear el queryclient en cada render
    // si lo ponemos como 'const queryClient = new QueryClient() perdemos el caché
    // entre renders del componente padre
    const [ queryClient ] = useState(
      () => 
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 10, // 10 segundos "fresh" - bajo a propósito para verlo en la prueba
                    gcTime: 1000 * 60 * 5, // 5 minutos en memoria tras quedar inactiva
                    refetchOnWindowFocus: true, // vuelve a pedir datos al volver a la pestaña
                    retry: 1,
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
    );
}

