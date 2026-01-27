'use client';

import ErrorMessages from "@/Components/ErrorMessages";
import { useEffect } from "react";

type RootErrorPageProps = {
    error: Error;
    reset: () => void;
}

export default function RootErrorPage ({error}: RootErrorPageProps){
    useEffect (() => {
        console.log(error)
    }, [error]);

    return (
        <ErrorMessages pageTitle="Internal Server Error" contentTitle="501" content="Ocorreu um erro do qual a nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde."/>
    );
}