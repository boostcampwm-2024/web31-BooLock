import 'blockly/blocks';
import * as Blockly from 'blockly/core';

import { useEffect, useState } from 'react';

import htmlCodeGenerator from '@/widgets/workspace/blockly/htmlCodeGenerator';

import {
  CssPropsSelectBox,
  htmlTagToolboxConfig,
  initTheme,
  PreviewBox,
  cssCodeGenerator,
} from '@/widgets';

import { useCssPropsStore, useWorkspaceStore } from '@/shared/store';
import FixedFlyout from '@/core/fixedFlyout';
import TabbedToolbox from '@/core/tabbedToolbox';
import { registerCustomComponents } from '@/core/register';
import { tabToolboxConfig } from './blockly/tabConfig';
import { defineBlocks } from './blockly/defineBlocks';
import CustomZoomControls from '@/core/customZoomControls';
import CustomTrashcan from '@/core/customTrashcan';
import { blockContents } from './blockly/htmlBlockContents';
import { initializeBlocks } from './blockly/initBlocks';
import { ResizePanel } from '@/shared/ui/resizePanel/ResizePanel';
import { ResizePanelAlign, ResizePanelType, useResizePanel } from '@/shared/hooks/useResize';

registerCustomComponents();
defineBlocks(blockContents);

Blockly.WorkspaceSvg.prototype.addZoomControls = function () {
  this.zoomControls_ = new CustomZoomControls(this);
  const svgZoomControls = this.zoomControls_.createDom();
  this.svgGroup_.appendChild(svgZoomControls);
};

Blockly.WorkspaceSvg.newTrashcan = function (workspace: Blockly.WorkspaceSvg): CustomTrashcan {
  return new CustomTrashcan(workspace);
};

Blockly.WorkspaceSvg.prototype.addTrashcan = function () {
  this.trashcan = Blockly.WorkspaceSvg.newTrashcan(this);
  const svgTrashcan = this.trashcan.createDom();
  this.svgGroup_.insertBefore(svgTrashcan, this.getCanvas());
};

export const WorkspaceContent = () => {
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const { totalCssPropertyObj } = useCssPropsStore();
  const { workspace, setWorkspace } = useWorkspaceStore();
  const {
    size: leftWidth,
    isMinOrMax: isMinOrMaxWidth,
    handleResizeStart: handleHorizontalResizeStart,
    handleResize: handleHorizontalResize,
    handleResizeEnd: handleHorizontalResizeEnd,
  } = useResizePanel({
    minSize: 20,
    maxSize: 80,
    initialSize: 32,
    align: ResizePanelAlign.VERTICAL,
  });

  const {
    size: previewHeight,
    isMinOrMax: isMinOrMaxHeight,
    handleResizeStart: handleVerticalResizeStart,
    handleResize: handleVerticalResize,
    handleResizeEnd: handleVerticalResizeEnd,
  } = useResizePanel({
    minSize: 30,
    maxSize: 70,
    initialSize: 50,
    align: ResizePanelAlign.HORIZONTAL,
  });

  useEffect(() => {
    const newWorkspace = Blockly.inject('blocklyDiv', {
      plugins: {
        flyoutsVerticalToolbox: FixedFlyout,
        toolbox: TabbedToolbox,
      },
      renderer: 'boolock',
      toolboxPosition: 'end',
      toolbox: htmlTagToolboxConfig,
      theme: initTheme, // 커스텀 테마 적용
      zoom: {
        // 확대 및 축소 버튼 설정
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      maxTrashcanContents: 0,
    });

    (newWorkspace.getToolbox() as TabbedToolbox).setConfig(tabToolboxConfig);

    initializeBlocks(newWorkspace);

    newWorkspace.clearUndo();

    // workspace 변화 감지해 자동 변환
    const handleAutoConversion = (event: Blockly.Events.Abstract) => {
      if (
        event.type === Blockly.Events.BLOCK_CREATE ||
        event.type === Blockly.Events.BLOCK_MOVE ||
        event.type === Blockly.Events.BLOCK_DRAG ||
        event.type === Blockly.Events.BLOCK_CHANGE ||
        event.type === Blockly.Events.BLOCK_DELETE
      ) {
        const code = htmlCodeGenerator.workspaceToCode(newWorkspace);
        setHtmlCode(code);
      }
    };

    newWorkspace.addChangeListener(handleAutoConversion);

    if (workspace === null) {
      setWorkspace(newWorkspace);
    }

    return () => {
      newWorkspace.removeChangeListener(handleAutoConversion);
      newWorkspace.dispose();
    };
  }, []);

  useEffect(() => {
    setCssCode(cssCodeGenerator(totalCssPropertyObj));
  }, [htmlCode, totalCssPropertyObj]);

  return (
    <div
      className="flex flex-1"
      onMouseMove={handleHorizontalResize}
      onMouseUp={handleHorizontalResizeEnd}
      onMouseLeave={handleHorizontalResizeEnd}
    >
      <div
        className="flex h-full w-[32rem] flex-shrink-0 flex-col"
        style={{ width: `${leftWidth}%` }}
      >
        <div
          className="flex-shrink-0"
          style={{ height: `${previewHeight}%` }}
          onMouseMove={handleVerticalResize}
          onMouseUp={handleVerticalResizeEnd}
          onMouseLeave={handleVerticalResizeEnd}
        >
          <PreviewBox htmlCode={htmlCode} cssCode={cssCode} />
        </div>
        <ResizePanel
          onMouseDown={handleVerticalResizeStart(ResizePanelType.PROPERTY)}
          invalid={isMinOrMaxHeight(previewHeight)}
          align={ResizePanelAlign.HORIZONTAL}
        />
        <div style={{ height: `${100 - previewHeight}%` }}>
          <CssPropsSelectBox />
        </div>
      </div>
      <ResizePanel
        onMouseDown={handleHorizontalResizeStart(ResizePanelType.WORKSPACE)}
        invalid={isMinOrMaxWidth(leftWidth)}
        align={ResizePanelAlign.VERTICAL}
      />
      <div id="blocklyDiv" className="h-full w-full" style={{ width: `${100 - leftWidth}%` }}></div>
    </div>
  );
};
