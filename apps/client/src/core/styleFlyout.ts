import * as Blockly from 'blockly/core';
import toast from 'react-hot-toast';
import TabbedToolbox from './tabbedToolbox';
import FixedFlyout from './fixedFlyout';
import Dom from './dom';
import { cssStyleToolboxConfig } from '@/widgets';
import { useClassBlockStore } from '@/shared/store';
import questionSvgPath from '@/shared/assets/question.svg';
import { Tblock } from '@/shared/types';
import { CustomFieldLabelSerializable } from './customFieldLabelSerializable';
import { CssTooltip } from '@/entities';

export default class StyleFlyout extends FixedFlyout {
  static registryName = 'StyleFlyout';

  pElement: HTMLDivElement | null = null;
  inputElement: HTMLInputElement | null = null;
  buttonElement: HTMLButtonElement | null = null;

  init(targetWorkspace: Blockly.WorkspaceSvg): void {
    super.init(targetWorkspace);
    const toolbox = this.targetWorkspace.getToolbox() as TabbedToolbox;

    const cssStyleToolboxDivElement = Dom.createElement<HTMLDivElement>('div', {
      class: 'contentCreatingBlock',
    });

    const createLabelElement = Dom.createElement<HTMLLabelElement>('label', {
      for: 'creatingBlockInput',
      class: 'creatingBlockLabel',
    });
    createLabelElement.textContent = '스타일 생성하기';

    this.inputElement = Dom.createElement<HTMLInputElement>('input', {
      type: 'text',
      placeholder: '스타일명을 정해주세요',
      class: 'creatingBlockInput',
      id: 'creatingBlockInput',
      maxlength: '30',
    });
    this.inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.createStyleBlock();
      }
    });

    const buttonElement = Dom.createElement<HTMLButtonElement>('button', {
      class: 'creatingBlockButton',
    });
    buttonElement.textContent = '+';
    buttonElement.addEventListener('click', () => this.createStyleBlock());

    const listLabelElement = Dom.createElement<HTMLLabelElement>('label', {
      class: 'listBlockLabel',
    });
    listLabelElement.textContent = '스타일 블록 목록';

    // reset CSS 부분
    const resetCssDivElement = Dom.createElement<HTMLDivElement>('div', {
      class: 'resetCssDiv',
    });
    const resetCssCheckboxElement = Dom.createElement<HTMLInputElement>('input', {
      type: 'checkbox',
      class: 'resetCssCheckbox',
    });
    const resetCssTextElement = Dom.createElement<HTMLSpanElement>('span', {
      class: 'resetCssText',
    });
    resetCssTextElement.textContent = 'reset CSS 적용하기';
    const questionImageElement = Dom.createElement<HTMLImageElement>('img', {
      src: questionSvgPath,
      alt: 'reset CSS Info',
      class: 'questionImage',
    });

    resetCssDivElement.appendChild(resetCssCheckboxElement);
    resetCssDivElement.appendChild(resetCssTextElement);
    resetCssDivElement.appendChild(questionImageElement);

    [
      createLabelElement,
      this.inputElement,
      buttonElement,
      resetCssDivElement,
      listLabelElement,
    ].forEach((element) => cssStyleToolboxDivElement.appendChild(element));

    toolbox.addElementToContentArea(cssStyleToolboxDivElement, true);

    this.registerCustomContextMenu();

    // TODO: toolbox 중복 호출 논의
    this.show(cssStyleToolboxConfig.contents);
  }

  registerCustomContextMenu() {
    const menuId = 'deleteBlock';

    // 중복 등록 방지: 이미 등록된 ID는 다시 등록하지 않음
    if (Blockly.ContextMenuRegistry.registry.getItem(menuId)) {
      return;
    }

    const deleteOption = {
      id: menuId,
      scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK, // 블록에만 적용
      displayText: '블록 삭제',
      weight: 100,
      preconditionFn: (scope: any) => {
        const blockType = scope.block.type;
        const isInCssStyleToolboxConfig = cssStyleToolboxConfig.contents.some(
          (item) => item.type === blockType
        );

        return isInCssStyleToolboxConfig && scope.block.isDeletable() ? 'enabled' : 'hidden';
      },
      callback: (scope: any, _e: PointerEvent) => {
        const block = scope.block;
        const blockType = block.type;

        block.dispose(false, true);

        cssStyleToolboxConfig.contents = cssStyleToolboxConfig.contents.filter(
          (item) => item.type !== blockType
        );

        const { removeClassBlock } = useClassBlockStore.getState();
        removeClassBlock(blockType);

        const flyout = (Blockly.getMainWorkspace() as any).getToolbox().getFlyout();
        flyout.show(cssStyleToolboxConfig.contents);
        toast.success(`"${blockType}" 스타일 블록이 삭제되었습니다.`);
      },
    };

    Blockly.ContextMenuRegistry.registry.register(deleteOption);
  }

  createStyleBlock() {
    const inputValue = this.inputElement?.value;
    if (!inputValue) {
      return toast.error('클래스명을 입력해주세요.');
    }

    const existingBlocks: Tblock[] = cssStyleToolboxConfig!.contents || [];
    const isBlockAlreadyAdded = existingBlocks.some((block) => block.type === inputValue);
    if (isBlockAlreadyAdded) {
      return toast.error(`"${inputValue}" 입력한 클래스명 블록은 이미 존재합니다.`);
    }

    if (!Blockly.Blocks[inputValue!]) {
      Blockly.Blocks[inputValue!] = {
        init: function () {
          this.appendDummyInput().appendField(
            new CustomFieldLabelSerializable(inputValue!),
            'CLASS'
          ); // 입력된 이름 반영
          this.setOutput(true);
          this.setStyle(`default_block_css`);
        },
      };
    }

    // 기존 블록에 새 블록 추가
    cssStyleToolboxConfig!.contents = [...existingBlocks, { kind: 'block', type: inputValue }];
    const { addClassBlock } = useClassBlockStore.getState();
    addClassBlock(inputValue);

    this.show(cssStyleToolboxConfig.contents);
    toast.success(`입력한 클래스명 블록 "${inputValue}"이(가) 추가되었습니다.`);

    if (this.inputElement) {
      this.inputElement.value = '';
    }
  }
}