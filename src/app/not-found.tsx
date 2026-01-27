import ErrorMessages from "@/Components/ErrorMessages";

export default function NotFoundPage (){
    return (
        <ErrorMessages pageTitle="Página não encontrada" contentTitle="404" content="Error 404 - A página que você está tentando acessar não existe neste site. "/>
    )
}