import { CircleButton } from '@/shared/ui';
import PlusSVG from '@/shared/assets/plus.svg?react';
import { useCreateWorkspace } from '@/shared/hooks';

export const WorkspaceAddBtn = () => {
  const { mutate: createWorkspace } = useCreateWorkspace();

  const handleClick = () => {
    createWorkspace();
  };

  return (
    <CircleButton width="w-5" height="w-5" onClick={handleClick}>
      <PlusSVG width="12" height="12" />
    </CircleButton>
  );
};
