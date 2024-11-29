import { RedoButton, SaveButton, UndoButton, WorkspaceNameInput } from '@/entities';

import { Logo } from '@/shared/ui';

/**
 *
 * @description
 * 워크스페이스 페이지 헤더 컴포넌트
 */
export const WorkspacePageHeader = () => {
  return (
    <div className="flex h-14 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white pl-8 pr-4">
      <div className="flex items-center gap-5">
        <Logo isBlack={false} />
        <WorkspaceNameInput />
      </div>
      <div className="flex items-center gap-3">
        <SaveButton />
        <UndoButton />
        <RedoButton />
      </div>
    </div>
  );
};