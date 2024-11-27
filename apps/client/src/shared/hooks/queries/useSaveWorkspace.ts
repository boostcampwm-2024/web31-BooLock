import { TCanvas, TTotalCssPropertyObj } from '@/shared/types/workspaceType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TBlock } from '@/shared/types';
import { WorkspaceApi } from '@/shared/api';
import { getUserId } from '@/shared/utils';
import toast from 'react-hot-toast';
import { useWorkspaceChangeStatusStore } from '@/shared/store';
import { workspaceKeys } from '../query-key/workspaceKeys';

export const useSaveWorkspace = (workspaceId: string) => {
  const workspaceApi = WorkspaceApi();
  const userId = getUserId();
  const { resetChangedStatusState } = useWorkspaceChangeStatusStore();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      totalCssPropertyObj,
      canvas,
      classBlockList,
      cssResetStatus,
    }: {
      totalCssPropertyObj: TTotalCssPropertyObj;
      canvas: TCanvas;
      classBlockList: TBlock[];
      cssResetStatus: boolean;
    }) => {
      return Promise.all([
        workspaceApi.saveWorkspaceCssProperty(userId, workspaceId, totalCssPropertyObj),
        workspaceApi.saveWorkspaceCanvas(userId, workspaceId, canvas),
        workspaceApi.saveWorkspaceClassBlockList(userId, workspaceId, classBlockList),
        workspaceApi.saveWorkspaceCssResetStatus(userId, workspaceId, cssResetStatus),
      ]);
    },
    onSuccess: () => {
      resetChangedStatusState();
      queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(workspaceId) });
      toast.success('성공적으로 저장되었습니다.');
    },
    onError: () => {
      toast.error('저장에 실패했습니다.');
    },
  });

  return { mutate, isPending };
};