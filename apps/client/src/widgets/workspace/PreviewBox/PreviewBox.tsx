import CodeMirror from '@uiw/react-codemirror';
import CopyIcon from '@/shared/assets/code_copy.svg?react';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { resetCss } from '@/shared/utils/resetCss';
import toast from 'react-hot-toast';
import { useResetCssStore } from '@/shared/store';
import { useState } from 'react';

type PreviewBoxProps = {
  htmlCode: string;
  cssCode: string;
};

/**
 *
 * @description
 * 웹사이트, HTML, CSS 코드 미리보기 박스 컴포넌트
 */
export const PreviewBox = ({ htmlCode, cssCode }: PreviewBoxProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css'>('preview');
  const { isResetCssChecked } = useResetCssStore();

  const finalCssCode = isResetCssChecked ? `${resetCss}\n${cssCode}` : cssCode;
  const styleCode = `<style>${finalCssCode}</style>`;
  const indexOfHead = htmlCode.indexOf('</head>');
  const totalCode = `${htmlCode.slice(0, indexOfHead)}${styleCode}${htmlCode.slice(indexOfHead)}`;

  // TODO: 상수 분리한 후 재사용성 높이기
  /* eslint-disable */
  const copyToClipboard = async (copyText: string, label: string) => {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success(`${label} 코드가 복사되었습니다.`);
    } catch (err) {
      toast.error(`${label} 코드 복사에 실패했습니다.`);
    }
  };

  const handleCopy = () => {
    const codeToCopy = activeTab === 'html' ? htmlCode : cssCode;
    const label = activeTab.toUpperCase();
    copyToClipboard(codeToCopy, label);
  };

  return (
    <section className="flex-1 border-b border-gray-100">
      <nav className="flex h-10 border-b border-gray-100">
        <button
          onClick={() => setActiveTab('preview')}
          className={`${activeTab === 'preview' ? 'bg-green-500 text-white' : 'bg-white text-gray-200'} h-full flex-1 border-r border-gray-100 bg-green-500`}
        >
          미리보기
        </button>
        <button
          onClick={() => setActiveTab('html')}
          className={`${activeTab === 'html' ? 'bg-green-500 text-white' : 'bg-white text-gray-200'} h-full flex-1 border-r border-gray-100 bg-green-500`}
        >
          HTML
        </button>
        <button
          onClick={() => setActiveTab('css')}
          className={`${activeTab === 'css' ? 'bg-green-500 text-white' : 'bg-white text-gray-200'} h-full flex-1 bg-green-500`}
        >
          CSS
        </button>
      </nav>
      <div className="relative h-full max-h-[calc(100%-26rem)] min-h-[20rem] w-full">
        {(activeTab === 'html' || activeTab === 'css') && (
          <div className="absolute right-4 top-5 z-50">
            <CopyIcon
              className="h-6 w-6 cursor-pointer text-gray-300 hover:text-green-500"
              onClick={handleCopy}
            />
          </div>
        )}

        {/* TODO: 코드 수정 금지 [논의 필요] */}
        {activeTab === 'preview' && (
          <iframe srcDoc={totalCode} className="h-full w-full" title="Preview" sandbox=""></iframe>
        )}
        {activeTab === 'html' && (
          <CodeMirror value={htmlCode} height="100%" extensions={[html()]} theme="light" />
        )}
        {activeTab === 'css' && (
          <CodeMirror value={cssCode} height="100%" extensions={[css()]} theme="light" />
        )}
      </div>
    </section>
  );
};