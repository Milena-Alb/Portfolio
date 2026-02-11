'use client';
import { Trash2Icon } from "lucide-react";
import styles from '@/Components/Admin/PostsListAdmin/style.module.css'
import { deletePostAction } from "@/actions/post/delete-post-action";
import { useState, useTransition } from "react";
import { Dialog } from "@/Components/Dialog";
import { toast } from "react-toastify";

type DeletePostButtonProps = {
    id: string;
    title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
    const [isPeding, startTranstion] = useTransition();
    const [showDialog, setShowDialog] = useState(false);

    async function handleClick() {
        setShowDialog(true);
    }


    async function handleConfirm() {
        startTranstion(async () => {
            const result = await deletePostAction(id);
            setShowDialog(false)
            
            if(result.error){
                toast.error(result.error);
            }

            toast.success("Post apagado com sucesso!")
        })
    }

    return (
        <>
            <button className={styles.adminTrash} onClick={handleClick} disabled={isPeding}>
                <Trash2Icon />
            </button>
            {showDialog &&
                <Dialog
                    isVisible={showDialog}
                    title="Deletar Post"
                    content={`Tem certeza que quer deletar este post: ${title}?`}
                    onCancel={() => setShowDialog(false)}
                    onConfirm={handleConfirm}
                    disabled={isPeding}
                />}
        </>
    )

}