import{j as r}from"./jsx-runtime-DR9Q75dM.js";import"./GuideVideo-MGmf4GR2.js";import{a as s}from"./HoveredEmptyWorkspace-BfEQC_gy.js";import"./WorkspaceLoadError-BuktD2D2.js";import"./NotHoveredEmptyWorkspace-loFxOJJf.js";import"./index-BXCeiWJk.js";import"./CssCategoryButton-BCvsdXHF.js";import"./client-Dbo3a7kb.js";import"./index-DRjF_FHU.js";import"./html2canvas.esm-T2p3Seyt.js";import{u as i}from"./index-x70cJmE6.js";const a=({workspaceList:t})=>{const n=i();return r.jsx(r.Fragment,{children:t.map(e=>r.jsx(s,{workspaceId:e.workspace_id,title:e.name,thumbnail:e.thumbnail||"",lastEdited:e.updated_at,onClick:()=>{n(`/workspace/${e.workspace_id}`)}},e.workspace_id))})};a.__docgenInfo={description:`@description
워크스페이스 목록 컴포넌트`,methods:[],displayName:"WorkspaceList",props:{workspaceList:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  name: string;
  updated_at: string;
  user_id: string;
  workspace_id: string;
  thumbnail: string | undefined;
  isCssReset: boolean;
  totalTotalCssPropertyObj: TTotalCssPropertyObj;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"updated_at",value:{name:"string",required:!0}},{key:"user_id",value:{name:"string",required:!0}},{key:"workspace_id",value:{name:"string",required:!0}},{key:"thumbnail",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!0}},{key:"isCssReset",value:{name:"boolean",required:!0}},{key:"totalTotalCssPropertyObj",value:{name:"signature",type:"object",raw:`{
  [key: string]: {
    checkedCssPropertyObj: TCheckedCssPropertyObj;
    cssOptionObj: TCssOptionObj;
  };
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
  checkedCssPropertyObj: TCheckedCssPropertyObj;
  cssOptionObj: TCssOptionObj;
}`,signature:{properties:[{key:"checkedCssPropertyObj",value:{name:"signature",type:"object",raw:`{
  [key: string]: boolean;
}`,signature:{properties:[{key:{name:"string"},value:{name:"boolean",required:!0}}]},required:!0}},{key:"cssOptionObj",value:{name:"signature",type:"object",raw:`{
  [key: string]: string;
}`,signature:{properties:[{key:{name:"string"},value:{name:"string",required:!0}}]},required:!0}}]},required:!0}}]},required:!0}}]}}],raw:"Array<TWorkspace>"},description:""}}};export{a as W};