import{j as t}from"./jsx-runtime-DR9Q75dM.js";import{W as d}from"./WorkspaceGrid-C2jJPMUx.js";import{a as l,v as I}from"./HoveredEmptyWorkspace-BMs7Nsgo.js";import"./WorkspaceLoadError-BuktD2D2.js";import"./NotHoveredEmptyWorkspace-loFxOJJf.js";import"./index-BXCeiWJk.js";import"./CssCategoryButton-C0Kelp6b.js";import"./client-Dbo3a7kb.js";import"./ImageTagModalHeader-Kpuzz1BJ.js";import"./ImageTagModalImg-BJAMLe19.js";import"./ImageTagModalButton-DJiJ58eG.js";import"./ImageTagModalListItem-D30WR0c8.js";import{a as k}from"./chunk-D5ZWXAHU-CGElDDNX.js";import"./index-DRjF_FHU.js";import"./html2canvas.esm-BTtajP0W.js";import"./QueryClientProvider-BdRu95_o.js";import"./index-D1AAVYfs.js";import"./plus-C7enkl2d.js";import"./SquareButton-eIFPi1Hz.js";import"./Logo-DlHd6_yt.js";import"./index-x70cJmE6.js";import"./ToasterWithMax-D4jPvwZi.js";import"./Loading-CVQUyNmW.js";import"./Spinner-DNSVRT5F.js";import"./SkeletonWorkspace-D4UalYBK.js";import"./SkeletonWorkspaceList-LqBByOXs.js";import"./question-BUxmZXrP.js";import"./v4-CQkTLCs1.js";const H={title:"widgets/home/WorkspaceGrid",component:d,parameters:{layout:"fullscreen"},decorators:[a=>t.jsx("div",{className:"p-4",children:t.jsx(a,{})})],tags:["autodocs"]},e={args:{children:t.jsx(l,{workspaceId:I(),title:"예시 1",thumbnail:"",lastEdited:new Date().toISOString(),onClick:()=>{k("workspaceItem clicked")()}})}},r={render:()=>{const a=[{workspaceId:"1234",title:"예시 1",thumbnail:"",lastEdited:"2024-11-28T09:34:45.106+00:00"},{workspaceId:"1234",title:"예시 2",thumbnail:"",lastEdited:"2024-11-28T09:34:45.106+00:00"},{workspaceId:"1234",title:"예시 3",thumbnail:"",lastEdited:"2024-11-28T09:34:45.106+00:00"},{workspaceId:"1234",title:"예시 4",thumbnail:"",lastEdited:"2024-11-28T09:34:45.106+00:00"},{workspaceId:"1234",title:"예시 5",thumbnail:"",lastEdited:"2024-11-28T09:34:45.106+00:00"}];return t.jsx(d,{children:a.map(o=>t.jsx(l,{...o,onClick:()=>{k("workspaceItem clicked")()}},o.workspaceId))})}};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    children: <WorkspaceItem workspaceId={v4()} title="예시 1" thumbnail="" lastEdited={new Date().toISOString()} onClick={() => {
      action('workspaceItem clicked')();
    }} />
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var p,m,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const workspaceItemList = [{
      workspaceId: '1234',
      title: '예시 1',
      thumbnail: '',
      lastEdited: '2024-11-28T09:34:45.106+00:00'
    }, {
      workspaceId: '1234',
      title: '예시 2',
      thumbnail: '',
      lastEdited: '2024-11-28T09:34:45.106+00:00'
    }, {
      workspaceId: '1234',
      title: '예시 3',
      thumbnail: '',
      lastEdited: '2024-11-28T09:34:45.106+00:00'
    }, {
      workspaceId: '1234',
      title: '예시 4',
      thumbnail: '',
      lastEdited: '2024-11-28T09:34:45.106+00:00'
    }, {
      workspaceId: '1234',
      title: '예시 5',
      thumbnail: '',
      lastEdited: '2024-11-28T09:34:45.106+00:00'
    }];
    return <WorkspaceGrid>
        {workspaceItemList.map(workspaceItem => <WorkspaceItem key={workspaceItem.workspaceId} {...workspaceItem} onClick={() => {
        action('workspaceItem clicked')();
      }} />)}
      </WorkspaceGrid>;
  }
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const J=["Default","MultipleItems"];export{e as Default,r as MultipleItems,J as __namedExportsOrder,H as default};