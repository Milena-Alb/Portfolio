'use client';
import { Button } from '../Button';
import styles from './style.module.css';

type DialogProps = {
    isVisible: boolean;
    title: string;
    content: React.ReactNode;
    disabled: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function Dialog({ isVisible = false, title, content, onCancel, onConfirm, disabled = false }: DialogProps) {
    if (!isVisible) return null;

    function handleCancel (){
        if (disabled) return;
        onCancel();
    }
    
    return (
        <div className={styles.dialogBox} onClick={handleCancel}>
            <div className={styles.content} role='dialog' aria-modal={true} aria-labelledby='dialog-title' aria-describedby='dialog-description' onClick={e => e.stopPropagation()}>
                <h3 id='dialog-title' >{title}</h3>
                <div id='dialog-description'>{content}</div>
                <div className={styles.dialogActions}>
                    <Button
                        // className={styles.cancel}
                        onClick={handleCancel}
                        autoFocus
                        disabled={disabled}
                        variant='ghost'
                        size='md'
                    >
                        Cancelar
                    </Button>
                    <Button
                        // className={styles.confirm}
                        onClick={onConfirm}
                        disabled={disabled}
                        variant='default'
                        size='md'
                    >
                        Confirmar
                    </Button>
                </div>
            </div>

        </div>
    )
}