'use client';

import { Button } from "@/Components/Button";
import { InputCheckbox } from "@/Components/InputCheckbox";
import { InputText } from "@/Components/InputText";
import { MarkdownEditor } from "@/Components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPostFromDb, PublicPost } from "@/dto/post/dtos";
import { createPostAction } from "@/actions/post/create-post-action";
import { toast } from "react-toastify";
import { updatePostAction } from "@/actions/post/update-post-action";

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost?: PublicPost;
}

type ManagePostFormCreateProps = {
  mode: 'create';
  publicPost?: PublicPost;
}

type ManagePostFormProps =
  | ManagePostFormCreateProps
  | ManagePostFormUpdateProps


export function ManagePostForm(props: ManagePostFormProps) {

  const { mode } = props;

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const [contentValue, setContentValue] = useState(publicPost?.content || '');
  const initialState = {
    formState: makePartialPublicPostFromDb(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(actionsMap[mode], initialState);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state])

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!')
    }
  }, [state.success]);

  const { formState } = state;

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>

        <InputText
          labelText="ID"
          name="id"
          placeholder="Id gerado automaticamente"
          type="text"
          defaultValue={formState.id}
          readOnly
          disabled={isPending}
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug gerado automaticamente"
          type="text"
          defaultValue={formState.slug}
          readOnly
          disabled={isPending}
        />

        <InputText
          labelText="Título"
          name="Título"
          placeholder="Digite o título do post"
          type="text"
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          labelText="Autor"
          name="Autor"
          placeholder="Digite o Autor do post"
          type="text"
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          labelText="Excerto"
          name="excerto"
          placeholder="Digite o resumo do post"
          type="text"
          defaultValue={formState.excerpt}
          readOnly
          disabled={isPending}
        />

        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={isPending}

        />

        <ImageUploader />

        <InputText
          labelText="URL da imagem de capa"
          name="capa"
          placeholder="Digite o Url da imagem"
          type="text"
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          type="checkbox"
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className='mt-4'>
          <Button type='submit' disabled={isPending}>Enviar</Button>
        </div>
      </div>
    </form>
  );
}