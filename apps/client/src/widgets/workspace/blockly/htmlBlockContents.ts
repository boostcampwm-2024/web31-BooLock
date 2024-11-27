import { TBlockContents, TBlockInfo } from '@/shared/types';
import { addPreviousTypeName } from '@/shared/utils';

const containerBlockContents: TBlockInfo[] = [
  {
    kind: 'block',
    type: addPreviousTypeName('div'),
    description: '여러 내용을 담을 수 있는 상자예요. 레고 블록처럼 여러 개를 쌓을 수 있어요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('span'),
    description: '글자나 작은 내용을 감싸는 작은 상자예요. 문장 중간에 넣을 수 있어요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('header'),
    description: '웹페이지의 머리 부분이에요. 보통 로고나 메뉴가 들어가는 곳이에요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('section'),
    description: '비슷한 내용들을 모아두는 구역이에요. 책의 한 챕터같은 거예요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('nav'),
    description: '웹사이트에서 다른 페이지로 이동할 수 있는 메뉴가 있는 곳이에요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('main'),
    description: '페이지에서 가장 중요한 내용이 들어가는 곳이에요. 책의 본문 같은 거예요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('article'),
    description: '하나의 완성된 이야기나 내용을 담는 곳이에요. 신문 기사처럼요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('footer'),
    description: '웹페이지의 맨 아래 부분이에요. 주소나 연락처 같은 정보가 들어가요.',
  },
];

const textBlockContents: TBlockInfo[] = [
  {
    kind: 'block',
    type: addPreviousTypeName('p'),
    description: '문단을 만드는 태그예요. 하나의 생각이나 이야기를 묶어서 쓸 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('strong'),
    description: '정말 중요한 내용을 굵은 글씨로 보여줄 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('h1'),
    description: '가장 큰 제목을 쓸 때 사용해요. 책의 제목같은 거예요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('h2'),
    description: '두 번째로 큰 제목이에요. 책의 장(章) 제목 같은 거예요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('h3'),
    description: '세 번째로 큰 제목이에요. 책의 절(節) 제목 같은 거예요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('h4'),
    description: '네 번째로 큰 제목이에요. 작은 주제를 쓸 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('h5'),
    description: '다섯 번째로 큰 제목이에요. 아주 작은 주제를 쓸 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('h6'),
    description: '가장 작은 제목이에요. 제일 세세한 주제를 쓸 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('small'),
    description: '작은 글씨로 보여주고 싶을 때 사용해요. 부가 설명을 쓸 때 좋아요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('br'),
    description: '줄을 바꾸고 싶을 때 사용해요. 엔터 키를 누른 것처럼요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('em'),
    description: '글씨를 기울여서 강조하고 싶을 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('i'),
    description: '글씨를 기울여 쓰고 싶을 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('blockquote'),
    description: '다른 사람의 말을 인용할 때 사용해요. 책에서 따온 문장 같은 거예요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('hr'),
    description: '가로줄을 그어서 내용을 구분하고 싶을 때 사용해요.',
  },
];

const formBlockContents: TBlockInfo[] = [
  {
    kind: 'block',
    type: addPreviousTypeName('button'),
    description: '클릭할 수 있는 버튼이에요. 제출하기나 확인 같은 동작을 할 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('option'),
    description: '선택할 수 있는 항목 하나를 나타내요. 여러 가지 중에 고를 수 있어요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('textarea'),
    description: '긴 글을 쓸 수 있는 큰 입력창이에요. 게시글이나 댓글을 쓸 때 사용해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('select'),
    description: '여러 개 중에서 하나를 선택할 수 있는 목록이에요. 드롭다운 메뉴같은 거예요.',
  },
];

const tableBlockContents: TBlockInfo[] = [
  {
    kind: 'block',
    type: addPreviousTypeName('td'),
    description: '표의 칸 하나예요. 내용을 채워 넣을 수 있어요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('tr'),
    description: '표의 가로줄 하나예요. 여러 칸을 옆으로 나열할 수 있어요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('th'),
    description: '표의 제목 칸이에요. 각 항목이 무엇을 의미하는지 설명해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('caption'),
    description: '표의 제목이에요. 표가 어떤 내용인지 설명해줘요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('table'),
    description: '표를 만들 때 사용해요. 시간표나 성적표 같은 걸 만들 수 있어요.',
  },
];

const listBlockContents: TBlockInfo[] = [
  {
    kind: 'block',
    type: addPreviousTypeName('ul'),
    description: '순서가 없는 목록을 만들어요. 점이나 동그라미로 항목을 구분해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('ol'),
    description: '순서가 있는 목록을 만들어요. 1, 2, 3처럼 숫자로 항목을 구분해요.',
  },
  {
    kind: 'block',
    type: addPreviousTypeName('li'),
    description: '목록의 각 항목이에요. 하나하나의 내용을 적을 수 있어요.',
  },
];

const etcBlockContents: TBlockInfo[] = [
  {
    kind: 'block',
    type: addPreviousTypeName('text'),
    description: '일반 글자를 보여주는 기본 텍스트예요. 특별한 꾸밈이 없는 평범한 글자랍니다.',
  },
];

export const blockContents: TBlockContents = {
  container: containerBlockContents,
  text: textBlockContents,
  form: formBlockContents,
  table: tableBlockContents,
  list: listBlockContents,
  etc: etcBlockContents,
};