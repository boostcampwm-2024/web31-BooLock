import{j as s}from"./jsx-runtime-DR9Q75dM.js";import"./GuideVideo-MGmf4GR2.js";import{C as e}from"./HoveredEmptyWorkspace-C7MjS4iN.js";import"./WorkspaceLoadError-FmbY_INt.js";import"./NotHoveredEmptyWorkspace-CddEnm-X.js";import"./RedoButton-Cb0DZdXt.js";import"./UndoButton-Bt5naQtv.js";import"./index-BXCeiWJk.js";import"./CssCategoryButton-BgdQUONP.js";import"./client-Dbo3a7kb.js";import{c as m}from"./cssCategoryList-BM9pfLyE.js";import"./blockly_compressed-Csa91utS.js";import{u as p}from"./useWorkspaceStore-B_R62rvF.js";const a=()=>{const{selectedCssCategory:r}=p();return s.jsx("article",{className:"flex h-full w-full flex-col gap-4 overflow-y-auto p-3",children:m.filter(t=>t.category===r).map(t=>t.items.map((o,i)=>s.jsx(e,{cssItem:o,index:i},o.label)))})};a.__docgenInfo={description:`@description
CSS 속성을 설정할 수 있는 컴포넌트의 목록을 보여주는 컴포넌트`,methods:[],displayName:"CssOptionItemList"};export{a as C};
