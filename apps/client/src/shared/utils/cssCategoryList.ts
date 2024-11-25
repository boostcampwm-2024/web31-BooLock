import { TcssCategoryList } from '@/shared/types';

export const cssCategoryList: TcssCategoryList = [
  {
    category: '레이아웃',
    items: [
      {
        label: 'display',
        type: 'select',
        option: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
        description: '요소의 표시 방법을 지정합니다.',
      },
      {
        label: 'position',
        type: 'select',
        option: ['absolute', 'relative', 'fixed', 'static'],
        description: '요소의 위치를 지정합니다.',
      },
      {
        label: 'top',
        type: 'input',
        description: '위쪽 여백을 지정합니다.',
      },
      {
        label: 'right',
        type: 'input',
        description: '오른쪽 여백을 지정합니다.',
      },
      {
        label: 'bottom',
        type: 'input',
        description: '아래쪽 여백을 지정합니다.',
      },
      {
        label: 'left',
        type: 'input',
        description: '왼쪽 여백을 지정합니다.',
      },
      {
        label: 'z-index',
        type: 'input',
        description: '요소의 쌓이는 순서를 지정합니다.',
      },
    ],
  },
  {
    category: '박스모델',
    items: [
      {
        label: 'width',
        type: 'input',
        description: '요소의 너비를 지정합니다.',
      },
      {
        label: 'height',
        type: 'input',
        description: '요소의 높이를 지정합니다.',
      },
      {
        label: 'box-sizing',
        type: 'select',
        option: ['content-box', 'border-box'],
        description: '요소의 크기를 계산하는 방법을 지정합니다.',
      },
      {
        label: 'overflow',
        type: 'select',
        option: ['visible', 'hidden', 'scroll', 'auto'],
        description: '요소의 내용이 너무 클 때 처리 방법을 지정합니다.',
      },
    ],
  },
  {
    category: '타이포그래피',
    items: [
      {
        label: 'line-height',
        type: 'input',
        description: '줄 높이를 지정합니다.',
      },
      {
        label: 'font-size',
        type: 'input',
        description: '글꼴 크기를 지정합니다.',
      },
      {
        label: 'text-align',
        type: 'select',
        option: ['left', 'center', 'right', 'justify'],
        description: '텍스트 정렬 방법을 지정합니다.',
      },
      {
        label: 'color',
        type: 'color',
        description: '글꼴 색상을 지정합니다.',
      },
    ],
  },
  {
    category: '배경',
    items: [
      {
        label: 'background-color',
        type: 'color',
        description: '요소의 배경 색상을 지정합니다.',
      },
    ],
  },
  {
    category: '테두리',
    items: [
      {
        label: 'border',
        type: 'input',
        description: '테두리 스타일, 두께, 색상을 지정합니다.',
      },
      {
        label: 'border-radius',
        type: 'input',
        description: '테두리의 모서리를 둥글게 만듭니다.',
      },
      {
        label: 'border-width',
        type: 'input',
        description: '테두리의 두께를 지정합니다.',
      },
    ],
  },
  {
    category: '간격',
    items: [
      {
        label: 'margin',
        type: 'input',
        description: '요소의 외부 여백을 지정합니다.',
      },
      {
        label: 'padding',
        type: 'input',
        description: '요소의 내부 여백을 지정합니다.',
      },
    ],
  },
  {
    category: 'flex 속성',
    items: [
      {
        label: 'flex',
        type: 'input',
        description: 'flex-grow, flex-shrink, flex-basis 속성을 한 번에 지정합니다.',
      },
      {
        label: 'flex-direction',
        type: 'select',
        option: ['row', 'row-reverse', 'column', 'column-reverse'],
        description: 'flex 요소의 주 축을 지정합니다.',
      },
      {
        label: 'justify-content',
        type: 'select',
        option: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
        description: 'flex 요소의 주 축 정렬 방법을 지정합니다.',
      },
      {
        label: 'align-items',
        type: 'select',
        option: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
        description: 'flex 요소의 교차 축 정렬 방법을 지정합니다.',
      },
    ],
  },
  {
    category: 'grid 속성',
    items: [
      {
        label: 'grid',
        type: 'input',
        description: 'grid-template-rows, grid-template-columns, gap 속성을 한 번에 지정합니다.',
      },
      {
        label: 'grid-template-rows',
        type: 'input',
        description: '그리드 행의 크기를 지정합니다.',
      },
      {
        label: 'grid-template-columns',
        type: 'input',
        description: '그리드 열의 크기를 지정합니다.',
      },
      {
        label: 'gap',
        type: 'input',
        description: '그리드 행과 열 사이의 간격을 지정합니다.',
      },
    ],
  },
];