import {
  TBlock,
  TCanvas,
  TCreatedWorkspaceDto,
  TGetWorkspaceResponse,
  TPagedWorkspaceListResultDto,
  TTotalCssPropertyObj,
  TWorkspaceDto,
} from '@/shared/types';

import { Instance } from '@/shared/api';

export const WorkspaceApi = () => {
  const createWorkspace = async (userId: string) => {
    const response = await Instance.post(
      '/workspace',
      { userId },
      {
        headers: {
          'user-id': userId,
        },
      }
    );
    return response.data as TCreatedWorkspaceDto;
  };

  const getWorkspaceList = async (userId: string, cursor: string) => {
    const response = await Instance.get(
      `/workspace/list${cursor !== 'null' ? `?cursor=${encodeURIComponent(cursor)}` : ''}`,
      {
        headers: { 'user-id': userId },
      }
    );
    return response.data as TPagedWorkspaceListResultDto;
  };

  const getWorkspace = async (userId: string, workspaceId: string) => {
    const response = await Instance.get(`/workspace?workspaceId=${workspaceId}`, {
      headers: { 'user-id': userId },
    });
    return response.data as TGetWorkspaceResponse;
  };

  const updateWorkspaceName = async (userId: string, workspaceId: string, newName: string) => {
    const response = await Instance.patch(
      '/workspace/name',
      { workspaceId, newName },
      { headers: { 'user-id': userId } }
    );
    return response.data as TWorkspaceDto;
  };

  const deleteWorkspace = async (userId: string, workspaceId: string): Promise<void> => {
    await Instance.delete(`/workspace?workspaceId=${workspaceId}`, {
      headers: { 'user-id': userId },
    });
  };

  const saveWorkspaceCssProperty = async (
    userId: string,
    workspaceId: string,
    totalCssPropertyObj: TTotalCssPropertyObj
  ) => {
    await Instance.patch(
      `/workspace/css`,
      { workspaceId, totalCssPropertyObj },
      { headers: { 'user-id': userId } }
    );
  };

  const saveWorkspaceCanvas = async (userId: string, workspaceId: string, canvas: TCanvas) => {
    await Instance.patch(
      `/workspace/canvas`,
      { workspaceId, canvas: JSON.stringify(canvas) },
      { headers: { 'user-id': userId } }
    );
  };

  const saveWorkspaceClassBlockList = async (
    userId: string,
    workspaceId: string,
    classBlockList: TBlock[]
  ) => {
    await Instance.patch(
      `/workspace/classBlockList`,
      { workspaceId, classBlockList: JSON.stringify(classBlockList) },
      { headers: { 'user-id': userId } }
    );
  };

  const saveWorkspaceCssResetStatus = async (
    userId: string,
    workspaceId: string,
    isCssReset: boolean
  ) => {
    await Instance.patch(
      `/workspace/cssResetStatus`,
      { workspaceId, cssResetStatus: isCssReset },
      { headers: { 'user-id': userId } }
    );
  };

  return {
    createWorkspace,
    getWorkspaceList,
    getWorkspace,
    updateWorkspaceName,
    deleteWorkspace,
    saveWorkspaceCssProperty,
    saveWorkspaceCanvas,
    saveWorkspaceClassBlockList,
    saveWorkspaceCssResetStatus,
  };
};
