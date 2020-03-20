import eventBus from"../utils/eventBus";Component({behaviors:["wx://form-field"],externalClasses:["l-class","l-error-text","l-error-text-class"],relations:{"../checkbox/index":{type:"child",linked(e){this.init(e)},linkChanged(){},unlinked(){}}},properties:{placement:{type:String,value:"column"},maxSelected:{type:[Number,null],value:null},minSelected:{type:[Number,null],value:null}},data:{},attached(){let{minSelected:e,maxSelected:t}=this.properties;this.checkMax(e,t)},methods:{init(e){void 0===this._keys&&(this._keys={}),void 0===this._selected&&(this._selected={}),this.checkDefaultItem(e),this.checkedKeyRepeat(e)},checkedKeyRepeat(e){let{key:t}=e.properties;if(this._keys[t])throw new Error(`keys有重复元素, chekbox的key属性不能重复：${t}`);this._keys[t]=!0},checkDefaultItem(e){const{key:t,checked:l,cell:s}=e.properties;l&&(this._selected[t]={...s,checked:!0,value:t})},checkMax(e,t){if(null!==e&&e<0)throw new Error("最小选择个数必须大于等于0");if(null!==t&&t<0)throw new Error("最多选择个数必须大于0");if(null!==t&&null!==e&&e>=t)throw new Error("最多选择个数必须大于最小选择个数")},onEmitEventHandle(e){e.checked?this.addSelect(e):this.removeSelect(e.key),this.triggerEvent("linchange",e,{bubbles:!0,composed:!0}),eventBus.emit(`lin-form-change-${this.id}`,this.id)},onEmitOverflowHandle(e){this.triggerEvent("linout",e,{bubbles:!0,composed:!0})},removeSelect(e){delete this._selected[e]},addSelect(e){let{key:t,...l}=e;this._selected[t]={...l,value:t}},getValues(){return Object.values(this._selected)},reset(){return this._selected={},this.getRelationNodes("../checkbox/index").forEach(e=>e.setData({checked:!1}))}}});