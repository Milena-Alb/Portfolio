type ContainerProps = {
    children: React.ReactNode,
}
//dark:bg-slate-900 dark:text-slate-100
export function Container({ children }: ContainerProps) {
    return (
        <div className="text-slate-900 bg-slate-100 min-h-screen ">
            <div className= "max-w-5xl mx-auto px-8">
                {children}
            </div>
        </div>
    );
}