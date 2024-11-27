import * as Blockly from 'blockly/core';

import { addPreviousTypeName, removePreviousTypeName } from '@/shared/utils';

import { blockContents } from '@/shared/blockly';

export const htmlCodeGenerator = new Blockly.Generator('HTML');

// generator 내에서도 blockType 명을 넣을 때 addPreviousTypeName 사용해주시길 바랍니다!

// 함수: 태그 블록(html, head, body, p, button) 정보를 코드로 변환
const transferTagBlockToCode = (tagName: string) => {
  htmlCodeGenerator.forBlock[tagName] = function (block) {
    let cssClass = '';
    const cssClassBlock = block.getInputTargetBlock('css class'); // 블록에서 직접 연결된 블록을 가져옴
    if (cssClassBlock) {
      cssClass = cssClassBlock.getFieldValue('CLASS') || ''; // 직접 연결된 블록의 필드 값을 가져옴
    }

    const children = htmlCodeGenerator.statementToCode(block, 'children');
    const code = `<${removePreviousTypeName(tagName)} class="${cssClass}">\n${children}\n</${removePreviousTypeName(tagName)}>`;
    return code;
  };
};

// text 블록에 대한 코드 생성을 별도로 정의
htmlCodeGenerator.forBlock[addPreviousTypeName('text')] = function (block) {
  const textContent = block.getFieldValue('TEXT'); // 블록에서 텍스트 내용을 가져옴
  return textContent.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); // 특수문자 치환
};

// CSS 블록에 대한 코드 생성을 별도로 정의
htmlCodeGenerator.forBlock[addPreviousTypeName('css_style')] = function (block) {
  const classContent = block.getFieldValue('CLASS'); // 블록에서 텍스트 내용을 가져옴
  return classContent;
};

// head 블록에 대한 코드 생성을 별도로 정의
htmlCodeGenerator.forBlock[addPreviousTypeName('head')] = function () {
  /**
   * head에는 다른 속성 블록을 적용시키기 애매하기 때문에 statementInput속성(children 블록 연결)을 추가하지 않고 한줄 블록으로 생성하였습니다.
   * 이에 따라 다른 html 태그 블록처럼 제너레이터가 동작하면 안 되기때문에 수정해주었습니다.
   */
  return '<head> </head>';
};

// hr 블록에 대한 코드 생성을 별도로 정의
htmlCodeGenerator.forBlock[addPreviousTypeName('hr')] = function () {
  return '<hr/>';
};

// br 블록에 대한 코드 생성을 별도로 정의
htmlCodeGenerator.forBlock[addPreviousTypeName('br')] = function () {
  return '<br/>';
};

// 연속적인 코드 블록을 생성하기 위해 블록 연결을 처리하도록 코드 생성을 커스터마이즈
htmlCodeGenerator.scrub_ = function (block, code, thisOnly) {
  // 다음 블록 찾기
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  // 다음 블록의 코드를 추가
  if (nextBlock && !thisOnly) {
    return code + '\n' + htmlCodeGenerator.blockToCode(nextBlock);
  }
  return code;
};

transferTagBlockToCode(addPreviousTypeName('html'));
transferTagBlockToCode(addPreviousTypeName('body'));

Object.values(blockContents).forEach((blockInfoList) => {
  blockInfoList.forEach((blockInfo) => {
    if (
      blockInfo.type !== addPreviousTypeName('text') &&
      blockInfo.type !== addPreviousTypeName('hr') &&
      blockInfo.type !== addPreviousTypeName('br')
    ) {
      transferTagBlockToCode(blockInfo.type);
    }
  });
});