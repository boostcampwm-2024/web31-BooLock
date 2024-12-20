import { useMutation, useQueryClient } from '@tanstack/react-query';

import { WorkspaceApi } from '@/shared/api';
import { createUserId, getUserId } from '@/shared/utils';
import toast from 'react-hot-toast';
import { useModalStore } from '@/shared/store';
import { workspaceKeys } from '@/shared/hooks';

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const workspaceApi = WorkspaceApi();
  const userId = getUserId() || createUserId();
  const { closeModal, setIsLoading } = useModalStore();

  const { mutate } = useMutation({
    mutationFn: (workspaceId: string) => {
      setIsLoading(true);
      return workspaceApi.deleteWorkspace(userId, workspaceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.list() });
      toast.success('워크스페이스 삭제 성공');
    },
    onError: () => {
      toast.error('워크스페이스 삭제 실패');
    },
    onSettled: () => {
      setIsLoading(false);
      closeModal();
    },
  });

  return { mutate };
};
