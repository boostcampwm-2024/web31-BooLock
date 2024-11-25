import { useModalStore, useWorkspaceChangeStatusStore } from '@/shared/store';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePreventLeaveWorkspacePage = () => {
  const { isBlockChanged, isCssChanged } = useWorkspaceChangeStatusStore();
  const {
    openModal,
    closeModal,
    setModalContent,
    setHandleModalCloseButton,
    setHandleModalConfirmButton,
  } = useModalStore();

  const navigate = useNavigate();

  const handleBeforeUnload = (e: Event) => {
    e.preventDefault();
  };

  const promptOfLeavePage = `저장하지 않은 변경사항이 있습니다.
  정말로 떠나시겠습니까?`;

  const handlePopState = () => {
    if (isBlockChanged || isCssChanged) {
      setModalContent(promptOfLeavePage);
      setHandleModalCloseButton(() => {
        history.pushState(null, '', location.pathname);
        closeModal();
      });
      setHandleModalConfirmButton(() => {
        navigate(-1);
        closeModal();
      });
      openModal();
    }
  };

  const handleClickLogo = () => {
    if (isBlockChanged || isCssChanged) {
      setModalContent(promptOfLeavePage);
      setHandleModalCloseButton(() => {
        closeModal();
      });
      setHandleModalConfirmButton(() => {
        navigate('/');
        closeModal();
      });
      openModal();
      return;
    }
    navigate('/');
  };

  const onPreventLeave = () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    history.pushState(null, '', location.pathname);
    window.addEventListener('popstate', handlePopState);
  };

  const offPreventLeave = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.removeEventListener('popstate', handlePopState);
  };

  useEffect(() => {
    if (isBlockChanged || isCssChanged) {
      onPreventLeave();
    } else {
      offPreventLeave();
    }
    return () => {
      offPreventLeave();
    };
  }, [isBlockChanged, isCssChanged]);

  return { handleClickLogo };
};
