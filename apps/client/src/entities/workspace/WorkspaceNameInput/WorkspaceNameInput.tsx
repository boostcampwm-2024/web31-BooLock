import { FocusEventHandler, KeyboardEventHandler } from 'react';
import { useUpdateWorkspaceName, workspaceKeys } from '@/shared/hooks';

import { Spinner } from '@/shared/ui';
import { TGetWorkspaceResponse } from '@/shared/types';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

/**
 * @description
 * 워크스페이스 이름을 수정할 수 있는 컴포넌트입니다.
 */
export const WorkspaceNameInput = () => {
  const { workspaceId } = useParams() as { workspaceId: string };
  const { mutate, isPending } = useUpdateWorkspaceName();
  const queryClient = useQueryClient();
  const workspaceData = queryClient.getQueryData<TGetWorkspaceResponse>(
    workspaceKeys.detail(workspaceId)
  );
  const name = workspaceData?.workspaceDto.name || '워크스페이스 이름';

  const handleBlur: FocusEventHandler<HTMLInputElement> = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    if (event.target.value === name || event.target.value === '') {
      return;
    }
    mutate({ workspaceId, newName: event.target.value });
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleKeyDown(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
    if (name === e.currentTarget.value || e.currentTarget.value === '') {
      return;
    }
    mutate({ workspaceId, newName: e.currentTarget.value });
    e.preventDefault();
  };

  return (
    <>
      <div className="relative flex items-center">
        <input
          placeholder={name === '' ? '워크스페이스 이름' : name}
          className="placeholder:text-semibold-rg w-[272px] rounded-md border border-green-500 px-3 py-1 placeholder:text-gray-100 focus:outline-none"
          onBlur={handleBlur}
          onKeyDown={handleEnter}
          maxLength={20}
          disabled={isPending}
        />
        {isPending && (
          <div className="absolute right-5">
            <Spinner width={4} height={4} foregroundColor="green500" backgroundColor="gray200" />
          </div>
        )}
      </div>
    </>
  );
};