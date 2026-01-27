'use client'; // <- se espalha para todos os componentes que eu importar neste arquivo. mas se usarmos children burlamos isso, o problema é o importe direto

export function ClientComponent ({children}: {children: React.ReactNode}) {
    return(
        <div>Client Component</div>
    )
}