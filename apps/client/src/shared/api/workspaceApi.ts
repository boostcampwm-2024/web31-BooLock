import { Instance } from './axiosInstance';
import { TcreatedWorkspaceDto, TpagedWorkspaceListResultDto } from '@/shared/types';

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
    if (response) {
      return response.data as TcreatedWorkspaceDto;
    }
    throw new Error('Invalid response from server');
  };

  const getWorkspaceList = async (userId: string, cursor: string) => {
    const response = await Instance.get(
      `/workspace${cursor !== 'null' ? `?cursor=${encodeURIComponent(cursor)}` : ''}`,
      {
        headers: { 'user-id': userId },
      }
    );
    if (response) {
      return response.data as TpagedWorkspaceListResultDto;
    }
    throw new Error('Invalid response from server');
  };

  return {
    createWorkspace,
    getWorkspaceList,
  };
};