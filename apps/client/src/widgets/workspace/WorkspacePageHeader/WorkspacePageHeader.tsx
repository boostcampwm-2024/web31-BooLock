import { WorkspaceNameInput } from '@/entities';
import { Logo } from '@/shared/ui';
import { WorkspaceHeaderButtons } from '../WorkspaceHeaderButtons/WorkspaceHeaderButtons';
import { useCoachMarkStore } from '@/shared/store/useCoachMarkStore';
import Question from '@/shared/assets/question.svg?react';

/**
 *
 * @description
 * 워크스페이스 페이지 헤더 컴포넌트
 */
export const WorkspacePageHeader = () => {
  const { openCoachMark } = useCoachMarkStore();

  return (
    <div className="flex h-14 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white pl-8 pr-4">
      <div className="flex items-center gap-5">
        <Logo isBlack={false} />
        <WorkspaceNameInput />
      </div>
      <div className="flex gap-11">
        <button
          className="text-medium-rg hover flex items-center gap-1 text-gray-300 hover:text-gray-500"
          onClick={openCoachMark}
          aria-label="도움말 버튼"
        >
          도움말 <Question />
        </button>
        <WorkspaceHeaderButtons />
      </div>
    </div>
  );
};
