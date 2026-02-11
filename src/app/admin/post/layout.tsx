import { MenuAdmin } from "@/Components/Admin/MenuAdmin";

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function AdminPostLayout({ children }: Readonly<RootLayoutProps>) {
    return <>
        <MenuAdmin />
        {children}
    </>
}
