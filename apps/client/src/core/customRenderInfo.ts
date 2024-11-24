import * as Blockly from 'blockly/core';
import { CustomRenderer } from './customRenderer';
import { CustomFieldTextInput } from './customFieldTextInput';

const Types = Blockly.blockRendering.Types;

/*
  블록내에서 inlineInputField 와 blockl label field를 space-between처럼 좌우에 고정시키기 위해 커스텀한 renderInfo 클래스입니다.
  renderInfo는 블록 좌표, 어떤 블록 타입인지, 어떤 길이를 가지는지 등등 블록에 대한 정보를 전부 설정해주는 클래스로, 
  drawer 이전 마지막으로 호출되는 클래스이기에 이 부분에서 field가 그려질 좌표를 수정해주었습니다.
*/
export class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer: CustomRenderer, block: Blockly.BlockSvg) {
    super(renderer, block);
  }

  override finalize_(): void {
    super.finalize_();

    let finalizeMaxWidth = this.topRow.width;
    const MIN_ROW_WIDTH = 150;
    const MAX_DYNAMIC_WIDTH = this.constants_.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
    const MAX_DYNAMIC_HEIGHT = MAX_DYNAMIC_WIDTH * 1.5;
    const EMPTY_PADDING = this.constants_.EMPTY_INLINE_INPUT_PADDING;

    const calculateRowWidth = (
      row: Blockly.blockRendering.Row,
      fieldLabel: { width: number; xPos: number },
      inputField: { width: number; height: number; xPos: number }
    ) => {
      const height = Math.min(inputField.height, MAX_DYNAMIC_HEIGHT);
      const radius = height / 4;

      let totalRowWidth = Math.max(row.width, MIN_ROW_WIDTH);
      const difference = inputField.width - (radius + EMPTY_PADDING);

      if (difference) {
        totalRowWidth += difference > 40 ? difference / 2 + 20 : difference;
      }

      const remainingSpace =
        totalRowWidth -
        (fieldLabel.width + inputField.width) -
        (difference > 40 ? difference / 2 - 20 : 0);
      inputField.xPos = fieldLabel.width + remainingSpace - fieldLabel.xPos;

      return {
        rowWidth: difference > 40 ? totalRowWidth - (difference / 2 + 20 - 40) : totalRowWidth,
        blockWidthIncrease: difference > 40 ? 40 : difference,
      };
    };

    let isProcessedBetween = false;

    this.rows.forEach((row) => {
      if (row.hasInlineInput && row.elements.length === 5) {
        const fieldLabel = row.elements[1];
        const inputField = row.elements[row.elements.length - 2];

        const { rowWidth, blockWidthIncrease } = calculateRowWidth(row, fieldLabel, inputField);
        row.width = rowWidth;
        this.block_.width += blockWidthIncrease;
        finalizeMaxWidth = Math.max(finalizeMaxWidth, row.width);
        isProcessedBetween = true;
      } else {
        let isInlineCustomInput = row.elements.some(
          (elem) =>
            Types.isField(elem) &&
            (elem as Blockly.blockRendering.Field).field instanceof CustomFieldTextInput
        );

        if (isInlineCustomInput) {
          const inputField = row.elements[row.elements.length - 2];
          const fieldLabel = row.elements.length > 3 ? row.elements[1] : { width: 0, xPos: 8 };

          const { rowWidth, blockWidthIncrease } = calculateRowWidth(row, fieldLabel, inputField);
          row.width = rowWidth;
          this.block_.width += blockWidthIncrease;
          finalizeMaxWidth = Math.max(finalizeMaxWidth, row.width);
          isProcessedBetween = true;
        } else {
          finalizeMaxWidth = Math.max(finalizeMaxWidth, MIN_ROW_WIDTH);
        }
      }
    });

    if (finalizeMaxWidth > this.topRow.width) {
      const difference = finalizeMaxWidth - this.topRow.width;
      const additionalWidth =
        difference > 40 && isProcessedBetween ? difference / 2 + 20 : difference;

      this.topRow.elements[this.topRow.elements.length - 2].width += additionalWidth;
      this.bottomRow.elements[this.bottomRow.elements.length - 2].width += additionalWidth;

      this.rows.forEach((row) => {
        if (row.hasStatement) {
          row.width += additionalWidth;
        }
      });
    }
  }
}