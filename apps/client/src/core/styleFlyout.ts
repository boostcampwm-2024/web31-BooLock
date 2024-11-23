import * as Blockly from 'blockly/core';
import TabbedToolbox from './tabbedToolbox';
import FixedFlyout from './fixedFlyout';
import Dom from './dom';
import { cssStyleToolboxConfig } from '@/widgets';
import { useClassBlockStore } from '@/shared/store';
import toast from 'react-hot-toast';

export default class StyleFlyout extends FixedFlyout {
  static registryName = 'StyleFlyout';

  inputElement: HTMLInputElement | null = null;
  buttonElement: HTMLButtonElement | null = null;

  init(targetWorkspace: Blockly.WorkspaceSvg): void {
    super.init(targetWorkspace);
    const toolbox = this.targetWorkspace.getToolbox() as TabbedToolbox;

    const styleTop = Dom.createElement<HTMLDivElement>('div', {
      class: 'contentCreatingBlock',
    });

    this.inputElement = Dom.createElement<HTMLInputElement>('input', {
      type: 'text',
      placeholder: '스타일명을 정해주세요',
      class: 'flyout-input',
    });

    this.inputElement.style.zIndex = '99999';

    this.buttonElement = Dom.createElement<HTMLButtonElement>('button', {
      class: 'flyout-button',
    });
    this.buttonElement.textContent = '+';

    this.buttonElement.addEventListener('click', () => this.createStyleBlock());

    styleTop.appendChild(this.inputElement);
    styleTop.appendChild(this.buttonElement);

    toolbox.addElementToContentArea(styleTop);
    // TODO: toolbox 중복 호출 수정
    this.show(cssStyleToolboxConfig.contents);
  }

  createStyleBlock() {
    const inputValue = this.inputElement?.value.trim();
    const { addClassBlock } = useClassBlockStore.getState();

    if (inputValue === null) {
      return;
    }

    if (inputValue?.trim() === '') {
      return alert('블록 이름을 입력해주세요.');
    }

    if (!Blockly.Blocks[inputValue!]) {
      Blockly.Blocks[inputValue!] = {
        init: function () {
          this.appendDummyInput().appendField(
            new Blockly.FieldLabelSerializable(inputValue!),
            'CLASS'
          ); // 입력된 이름 반영
          this.setOutput(true);
          this.setColour('#02D085');
        },
      };
    }

    // 기존 블록 유지 및 새 블록 추가
    const existingBlocks = cssStyleToolboxConfig!.contents || [];
    const isBlockAlreadyAdded = existingBlocks.some((block) => block.type === inputValue);

    if (isBlockAlreadyAdded) {
      toast.error(`"${inputValue}" 스타일 블록은 이미 존재합니다.`);
      return;
    }

    if (inputValue) {
      cssStyleToolboxConfig!.contents = [...existingBlocks, { kind: 'block', type: inputValue }];
      addClassBlock(inputValue);
    }
    this.show(cssStyleToolboxConfig.contents);
    toast.success(`새 스타일 블록 "${inputValue}"이(가) 추가되었습니다.`);
  }
}
