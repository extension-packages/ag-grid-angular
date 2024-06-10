(self.webpackChunkag_grid_angular=self.webpackChunkag_grid_angular||[]).push([[148],{"./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/ag-grid-extension.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ContentProjections:()=>ContentProjections,LoadingOverlay:()=>LoadingOverlay,SeachAndActions:()=>SeachAndActions,UpdateActionOnClick:()=>UpdateActionOnClick,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ag_grid_extension_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),ag_grid_angular=__webpack_require__("./node_modules/ag-grid-angular/fesm2020/ag-grid-angular.mjs");const presetActions={export:{icon:"file_download",tooltip:"Export as csv",clickFn:params=>{const{api}=params.event;api.exportDataAsCsv()}},fit:{icon:"view_column",tooltip:"Fit columns",clickFn:params=>{const{api}=params.event;api.sizeColumnsToFit()}},redo:{disabled:!0,icon:"redo",tooltip:"Redo",clickFn:params=>{const{api}=params.event;api.redoCellEditing()}},reset:{icon:"restart_alt",tooltip:"Reset columns",clickFn:params=>{const{api}=params.event;api.resetColumnState()}},undo:{disabled:!0,icon:"undo",tooltip:"Undo",clickFn:params=>{const{api}=params.event;api.undoCellEditing()}}},actionsSets={redoUndo:[presetActions.redo,presetActions.undo],standard:[presetActions.reset,presetActions.fit,presetActions.export]};var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var ag_grid_extension_componentngResource=__webpack_require__("./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/ag-grid-extension.component.scss?ngResource"),ag_grid_extension_componentngResource_default=__webpack_require__.n(ag_grid_extension_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let AgGridExtensionComponent=class AgGridExtensionComponent{constructor(cdr){this.cdr=cdr,this.actions=actionsSets.standard,this.debounceSearch=500,this.disableSearch=!1,this.enableSearch=!0,this.placeholderSearch="Search..."}get context(){return this.agGrid.context||this.agGrid.gridOptions?.context}get toolbarActionEvent(){const context=this.agGrid.context||this.agGrid.gridOptions?.context;return{api:this.agGrid.api,context}}ngAfterViewInit(){if(this.context)this.context.actions=this.actions;else{const context={actions:this.actions};this.agGrid.api.setGridOption("context",context)}this.cdr.detectChanges()}static#_=this.ctorParameters=()=>[{type:core.ChangeDetectorRef}];static#_2=this.propDecorators={actions:[{type:core.Input}],debounceSearch:[{type:core.Input}],disableSearch:[{type:core.Input}],enableSearch:[{type:core.Input}],placeholderSearch:[{type:core.Input}],agGrid:[{type:core.ContentChild,args:[ag_grid_angular.xs]}]}};AgGridExtensionComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ag-grid-extension",template:'<ag-grid-toolbar\n  [agGrid]="agGrid"\n  [debounceSearch]="debounceSearch"\n  [disableSearch]="disableSearch"\n  [enableSearch]="enableSearch"\n  [placeholderSearch]="placeholderSearch"\n>\n  <ng-content select="[toolbarLeft]" toolbarLeft></ng-content>\n  <ng-content select="[toolbarCenter]" toolbarCenter></ng-content>\n  <ng-content select="[toolbarRight]" toolbarRight></ng-content>\n  \x3c!-- Actions --\x3e\n  <ng-content select="[actionsLeft]" toolbarRight></ng-content>\n  <ng-container *ngFor="let action of actions" toolbarRight>\n    <ng-container *ngIf="!action?.icon">\n      <span class="toolbar-action-separator"></span>\n    </ng-container>\n\n    <div [title]="action.disabled ? action.tooltipDisabled || \'\' : \'\'">\n      <ag-grid-toolbar-action\n        *ngIf="action?.icon"\n        [color]="action?.color"\n        [disabled]="action?.disabled || false"\n        [icon]="action.icon"\n        [id]="action.id"\n        [tooltip]="action.tooltip || \'\'"\n        (click)="action?.clickFn?.({ event: toolbarActionEvent, action })"\n      ></ag-grid-toolbar-action>\n    </div>\n  </ng-container>\n  <ng-content select="[actionsRight]" toolbarRight></ng-content>\n  \x3c!-- Actions END --\x3e\n</ag-grid-toolbar>\n<div class="ag-grid-content">\n  <ng-content>\n    \x3c!-- ag-grid-angular --\x3e\n  </ng-content>\n</div>\n',host:{class:"ag-theme-extension"},styles:[ag_grid_extension_componentngResource_default()]})],AgGridExtensionComponent);var common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");var ag_grid_toolbar_componentngResource=__webpack_require__("./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/components/ag-grid-toolbar/ag-grid-toolbar.component.scss?ngResource"),ag_grid_toolbar_componentngResource_default=__webpack_require__.n(ag_grid_toolbar_componentngResource);let AgGridToolbarComponent=class AgGridToolbarComponent{constructor(){this.debounceSearch=500,this.disableSearch=!1,this.enableSearch=!0,this.placeholderSearch="Search..."}static#_=this.propDecorators={agGrid:[{type:core.Input}],debounceSearch:[{type:core.Input}],disableSearch:[{type:core.Input}],enableSearch:[{type:core.Input}],placeholderSearch:[{type:core.Input}]}};AgGridToolbarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ag-grid-toolbar",template:'<div class="ag-grid-toolbar">\n  <div class="ag-grid-toolbar-content">\n    <div class="ag-grid-toolbar-content-left">\n      <ag-grid-toolbar-search\n        *ngIf="enableSearch"\n        [agGrid]="agGrid"\n        [debounceTime]="debounceSearch"\n        [disabled]="disableSearch"\n        [placeholder]="placeholderSearch"\n      ></ag-grid-toolbar-search>\n      <ng-content select="[toolbarLeft]"></ng-content>\n    </div>\n    <div class="ag-grid-toolbar-content-center">\n      <ng-content select="[toolbarCenter]"></ng-content>\n    </div>\n    <div class="ag-grid-toolbar-content-right">\n      <ng-content select="[toolbarRight]"></ng-content>\n    </div>\n  </div>\n</div>\n',styles:[ag_grid_toolbar_componentngResource_default()]})],AgGridToolbarComponent);var ag_grid_toolbar_action_componentngResource=__webpack_require__("./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/components/ag-grid-toolbar-action/ag-grid-toolbar-action.component.scss?ngResource"),ag_grid_toolbar_action_componentngResource_default=__webpack_require__.n(ag_grid_toolbar_action_componentngResource);let AgGridToolbarActionComponent=class AgGridToolbarActionComponent{static#_=this.propDecorators={color:[{type:core.Input}],disabled:[{type:core.Input}],id:[{type:core.Input}],icon:[{type:core.Input}],tooltip:[{type:core.Input}]}};AgGridToolbarActionComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ag-grid-toolbar-action",template:'<span\n  class="toolbar-action material-icons-outlined"\n  [class.disabled]="disabled"\n  [id]="id"\n  [style.color]="disabled ? \'\' : color"\n  [title]="tooltip"\n>\n  {{ icon }}<ng-content></ng-content>\n</span>\n',styles:[ag_grid_toolbar_action_componentngResource_default()]})],AgGridToolbarActionComponent);var ag_grid_toolbar_search_componentngResource=__webpack_require__("./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/components/ag-grid-toolbar-search/ag-grid-toolbar-search.component.scss?ngResource"),ag_grid_toolbar_search_componentngResource_default=__webpack_require__.n(ag_grid_toolbar_search_componentngResource);let timer,AgGridToolbarSearchComponent=class AgGridToolbarSearchComponent{constructor(){this.debounceTime=500,this.disabled=!1,this.placeholder="Search..."}get context(){return this.agGrid.context||this.agGrid.gridOptions?.context}onSearch({target}){const{api}=this.agGrid;clearTimeout(timer),timer=setTimeout((()=>{"serverSide"===api.getModel().getType()?(this.setQuickFilter(target.value),api.onFilterChanged()):(api.setQuickFilter(target.value),this.setQuickFilter(target.value)),"multiple"!==this.agGrid.gridOptions?.rowSelection&&"multiple"!==this.agGrid.rowSelection&&api.deselectAll()}),this.debounceTime)}setQuickFilter(term){this.context&&(this.context.quickFilterText=term)}static#_=this.propDecorators={agGrid:[{type:core.Input}],debounceTime:[{type:core.Input}],disabled:[{type:core.Input}],placeholder:[{type:core.Input}]}};AgGridToolbarSearchComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ag-grid-toolbar-search",template:'<input\n  type="search"\n  [disabled]="disabled"\n  [placeholder]="placeholder"\n  (keyup)="onSearch($event)"\n  (search)="onSearch($event)"\n/>\n',styles:[ag_grid_toolbar_search_componentngResource_default()]})],AgGridToolbarSearchComponent);let AgGridExtensionModule=class AgGridExtensionModule{};AgGridExtensionModule=(0,tslib_es6.Cg)([(0,core.NgModule)({declarations:[AgGridExtensionComponent,AgGridToolbarComponent,AgGridToolbarActionComponent,AgGridToolbarSearchComponent],exports:[AgGridExtensionComponent,AgGridToolbarActionComponent],imports:[common.CommonModule]})],AgGridExtensionModule);let DatasourceService=class DatasourceService{constructor(){}createServerSideDatasource(dataCount=100){const server=this.createFakeServer(dataCount);return{getRows:params=>{console.log("[Datasource] - rows requested by grid: ",params.request);const response=server.getData(params.request);setTimeout((function(){response.success?params.success({rowData:response.rows}):params.fail()}),500)}}}generateItems(dataCount){const items=[];for(let i=0;i<=dataCount;i++){const brand=generateRandomBrand();items.push({id:i,brand,isNew:Math.random()>.5,model:generateRandomModel(brand),price:generateRandomPrice()})}return items}createFakeServer(dataCount){const items=this.generateItems(dataCount);return{getData:request=>({success:!0,rows:items.slice(request.startRow,request.endRow)})}}static#_=this.ctorParameters=()=>[]};DatasourceService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"})],DatasourceService);const items=[];for(let i=0;i<=100;i++){const brand=generateRandomBrand();items.push({id:i,brand,isNew:Math.random()>.5,model:generateRandomModel(brand),price:generateRandomPrice()})}function generateRandomBrand(){const brand=["BMW","Honda","Tesla","Volkswagen"];return brand[Math.floor(Math.random()*brand.length)]}function generateRandomModel(brand){const models={BMW:["X1","X2","X3","X4","X5","X6","X7"],Honda:["Accord","Civic"],Tesla:["Model S","Model 3","Model X","Model Y","Cybertruck"],Volkswagen:["e-Up","Golf","Polo"]}[brand];return models[Math.floor(Math.random()*models.length)]}function generateRandomPrice(){const price=Math.floor(5e4*Math.random())+2e4;return 100*Math.round(price/100)}let GridOptionsService=class GridOptionsService{constructor(){this.getDefaultColDef=()=>({editable:!0,sortable:!0}),this.getColDefs=()=>[{field:"id",width:50},{field:"brand"},{field:"model"},{field:"price",width:90},{field:"isNew",width:70}],this.core=()=>({defaultColDef:this.getDefaultColDef(),enableCellChangeFlash:!0,getRowId:params=>params.data.id,rowSelection:"single",undoRedoCellEditing:!0}),this.clientSide=()=>({...this.core(),rowModelType:"clientSide"}),this.serverSide=()=>({...this.core(),rowModelType:"serverSide"})}};GridOptionsService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"})],GridOptionsService);const datasourceService=new DatasourceService,gridOptionsService=new GridOptionsService,gridOptions=gridOptionsService.clientSide();gridOptions.rowSelection="multiple",gridOptions.columnDefs=[{checkboxSelection:!0,headerCheckboxSelection:!0,headerCheckboxSelectionFilteredOnly:!0,minWidth:35,suppressCellFlash:!0,width:35},...gridOptionsService.getColDefs()],gridOptions.rowData=datasourceService.generateItems(15),gridOptions.onSelectionChanged=event=>{const{api,context}=event,nodes=api.getSelectedNodes(),deleteAction=context.actions?.find((({icon})=>"delete"===icon)),editAction=context.actions?.find((({icon})=>"edit"===icon));deleteAction&&(deleteAction.disabled=0===nodes.length),editAction&&(editAction.disabled=0===nodes.length)},gridOptions.onCellValueChanged=event=>{const{api,context}=event,redoAction=context.actions?.find((({icon})=>"redo"===icon)),undoAction=context.actions?.find((({icon})=>"undo"===icon));redoAction&&(redoAction.disabled=0===api.getCurrentRedoSize()),undoAction&&(undoAction.disabled=0===api.getCurrentUndoSize())};class Utils{static getRandomColor(){const colorNames=["Red","Green","Blue","Yellow","Orange"];return colorNames[Math.floor(Math.random()*colorNames.length)]}}const actions=[{clickFn:params=>{const{api}=params.event,data={id:Number((1e3*Math.random()).toFixed(0))},transaction=api.applyTransaction({add:[data],addIndex:0});api.flashCells({rowNodes:transaction?.add})},color:"seagreen",icon:"add_circle",tooltip:"Add new row"},{clickFn:()=>{alert("Edit action clicked")},color:"dodgerblue",disabled:!0,icon:"edit",tooltip:"Edit",tooltipDisabled:"Select a row to edit"},{clickFn:params=>{const{api}=params.event,rows=api.getSelectedRows();api.applyTransaction({remove:rows})},color:"crimson",disabled:!0,icon:"delete",tooltip:"Delete selected row(s)",tooltipDisabled:"Select row(s) to delete"},{},...actionsSets.redoUndo,{},...actionsSets.standard],defaults={actions:actionsSets.standard,debounceSearch:500,disableSearch:!1,enableSearch:!0,placeholderSearch:"Search.."},ag_grid_extension_stories={title:"Ag Grid Extension",component:AgGridExtensionComponent,decorators:[(0,dist.componentWrapperDecorator)((story=>`<div style="height: 500px;">${story}</div>`)),(0,dist.moduleMetadata)({imports:[ag_grid_angular.$V,AgGridExtensionModule]})],render:args=>({props:{...args,gridOptions:{...gridOptions,...args.extraGridOptions}},template:'\n    <ag-grid-extension\n      [class]="agTheme"\n      [actions]="actions"\n      [disableSearch]="disableSearch"\n      [debounceSearch]="debounceSearch"\n      [enableSearch]="enableSearch"\n      [placeholderSearch]="placeholderSearch">\n      \n      <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>\n    </ag-grid-extension>\n    '}),tags:["autodocs"]},SeachAndActions={args:{...defaults,actions}},ContentProjections={args:{...defaults,actions},render:args=>({props:{...args,gridOptions},template:'\n    <ag-grid-extension\n      [class]="agTheme"\n      [actions]="actions"\n      [disableSearch]="disableSearch"\n      [debounceSearch]="debounceSearch"\n      [enableSearch]="enableSearch"\n      [placeholderSearch]="placeholderSearch">\n      <div toolbarLeft>toolbarLeft</div>\n      <div toolbarCenter>toolbarCenter</div>\n      <div toolbarRight>toolbarRight</div>\n      <ag-grid-toolbar-action actionsLeft tooltip="I\'m here because of *actionsLeft* content projection">arrow_left</ag-grid-toolbar-action>\n      <ag-grid-toolbar-action actionsRight tooltip="I\'m here because of *actionsRight* content projection">arrow_right</ag-grid-toolbar-action>\n\n      <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>\n    </ag-grid-extension>\n    '})},LoadingOverlay={args:{...defaults,extraGridOptions:{onGridReady:({api})=>{api.showLoadingOverlay()}}}},UpdateActionOnClick={args:{...defaults,actions:[{icon:"home",clickFn:params=>{const{action}=params,color=Utils.getRandomColor();action.color=color,action.tooltip=`Action color changed to ${color}`}}]}};SeachAndActions.parameters={...SeachAndActions.parameters,docs:{...SeachAndActions.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...defaults,\n    actions: actions\n  }\n}",...SeachAndActions.parameters?.docs?.source}}},ContentProjections.parameters={...ContentProjections.parameters,docs:{...ContentProjections.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...defaults,\n    actions: actions\n  },\n  render: args => ({\n    props: {\n      ...args,\n      gridOptions\n    },\n    template: `\n    <ag-grid-extension\n      [class]="agTheme"\n      [actions]="actions"\n      [disableSearch]="disableSearch"\n      [debounceSearch]="debounceSearch"\n      [enableSearch]="enableSearch"\n      [placeholderSearch]="placeholderSearch">\n      <div toolbarLeft>toolbarLeft</div>\n      <div toolbarCenter>toolbarCenter</div>\n      <div toolbarRight>toolbarRight</div>\n      <ag-grid-toolbar-action actionsLeft tooltip="I\'m here because of *actionsLeft* content projection">arrow_left</ag-grid-toolbar-action>\n      <ag-grid-toolbar-action actionsRight tooltip="I\'m here because of *actionsRight* content projection">arrow_right</ag-grid-toolbar-action>\n\n      <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>\n    </ag-grid-extension>\n    `\n  })\n}',...ContentProjections.parameters?.docs?.source}}},LoadingOverlay.parameters={...LoadingOverlay.parameters,docs:{...LoadingOverlay.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...defaults,\n    extraGridOptions: {\n      onGridReady: ({\n        api\n      }) => {\n        api.showLoadingOverlay();\n      }\n    }\n  }\n}",...LoadingOverlay.parameters?.docs?.source}}},UpdateActionOnClick.parameters={...UpdateActionOnClick.parameters,docs:{...UpdateActionOnClick.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...defaults,\n    actions: [{\n      icon: 'home',\n      clickFn: params => {\n        const {\n          action\n        } = params;\n        const color = Utils.getRandomColor();\n        action.color = color;\n        action.tooltip = `Action color changed to ${color}`;\n      }\n    }]\n  }\n}",...UpdateActionOnClick.parameters?.docs?.source}}};const __namedExportsOrder=["SeachAndActions","ContentProjections","LoadingOverlay","UpdateActionOnClick"]},"./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/ag-grid-extension.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n}\n:host ::ng-deep ag-grid-angular {\n  height: 100%;\n}\n:host ::ng-deep .ag-root-wrapper {\n  border-top-left-radius: 0px;\n  border-top-right-radius: 0px;\n}\n\n.ag-grid-content {\n  flex-grow: 1;\n}\n\n::ng-deep .toolbar-action-separator {\n  border-right: 1px solid var(--ag-border-color);\n  height: 22px;\n}\n\n::ng-deep .ag-aria-description-container {\n  display: none;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/components/ag-grid-toolbar-action/ag-grid-toolbar-action.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: contents;\n}\n\n.toolbar-action {\n  color: var(--ag-secondary-foreground-color);\n  font-size: 24px;\n  padding: 8px;\n  -webkit-user-select: none;\n          user-select: none;\n}\n.toolbar-action.disabled {\n  pointer-events: none;\n  color: var(--ag-disabled-foreground-color, --ag-input-disabled-border-color);\n}\n.toolbar-action:hover {\n  cursor: pointer;\n  border-radius: 3px;\n  background: var(--ag-input-disabled-border-color);\n}\n.toolbar-action:active {\n  background: var(--ag-border-color);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/components/ag-grid-toolbar-search/ag-grid-toolbar-search.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"input {\n  border: 1px solid var(--ag-border-color);\n  border-radius: 4px;\n  height: 30px;\n  padding: 0px 8px 0px 28px;\n  background: white url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='gray' width='16' height='16' viewBox='0 0 16 16'><path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' ></path></svg>\") no-repeat 8px center;\n}\ninput:hover:not(:disabled) {\n  border-color: var(--ag-range-selection-border-color);\n}\ninput:focus-visible {\n  outline: none;\n  border-color: var(--ag-range-selection-border-color);\n}\ninput:disabled {\n  background-color: var(--ag-input-disabled-background-color);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/extension-packages/ag-grid-angular/src/lib/ag-grid-extension/components/ag-grid-toolbar/ag-grid-toolbar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".ag-grid-toolbar {\n  align-items: center;\n  background: var(--ag-header-background-color);\n  border: var(--ag-borders) var(--ag-border-color);\n  border-top-left-radius: var(--ag-wrapper-border-radius);\n  border-top-right-radius: var(--ag-wrapper-border-radius);\n  border-bottom: none;\n  display: flex;\n  height: 48px;\n  overflow-x: auto;\n}\n\n.ag-grid-toolbar-content {\n  align-items: center;\n  display: flex;\n  gap: 8px;\n  justify-content: space-between;\n  padding: 0px 8px;\n  width: 100%;\n}\n.ag-grid-toolbar-content-left {\n  align-items: center;\n  display: flex;\n  gap: 8px;\n}\n.ag-grid-toolbar-content-center {\n  align-items: center;\n  display: flex;\n  gap: 8px;\n}\n.ag-grid-toolbar-content-right {\n  align-items: center;\n  display: flex;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);