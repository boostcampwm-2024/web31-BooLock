import{j as s}from"./jsx-runtime-DR9Q75dM.js";import{r}from"./index-DRjF_FHU.js";const d=({children:e,width:t,height:n,onClick:o,disable:i=!1})=>s.jsx("button",{onClick:o,className:`flex items-center ${t} ${n} justify-center rounded-full bg-green-500 text-green-100 hover:border hover:border-green-500 hover:bg-green-100 hover:text-green-500`,disabled:i,children:e});d.__docgenInfo={description:`@description
원형 버튼 재사용 컴포넌트`,methods:[],displayName:"CircleButton",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},width:{required:!0,tsType:{name:"string"},description:""},height:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},disable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const c=e=>r.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},r.createElement("path",{d:"M4 12H20",stroke:"currentColor",strokeWidth:1.2,strokeLinecap:"round",strokeLinejoin:"round"}),r.createElement("path",{d:"M12 4L12 20",stroke:"currentColor",strokeWidth:1.2,strokeLinecap:"round",strokeLinejoin:"round"}));export{d as C,c as S};