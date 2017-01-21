var store = {
			save: function(key,val) {
				localStorage.setItem(key,JSON.stringify(val));
			},
			fetch: function(key) {
				return JSON.parse(localStorage.getItem(key));
			}
		};
if(!store.fetch('todo')){
	var time = new Date().toLocaleString();
	store.save('todo', [{todo: '我的Todo', time: time, checkbox: false, detail: '', detailShow: false, confirm: false}]);
};
var vm = new Vue({
	el: '#app',
	data() {
		return {
			mytodo: '',
			todoList: store.fetch('todo') || [],
			confirmAll: false
		}
	},
	watch: {
		'todoList': {
			handler: function(){
				store.save('todo',this.todoList);
			},
			deep: true
		}
	},
	methods: {
		todoSubmit() {
			if( this.mytodo ){
				var time = new Date().toLocaleString();
				this.todoList.unshift({todo: this.mytodo, time: time, checkbox: false, detail: '', detailShow: false, confirm: false});
				store.save('todo',this.todoList);
				this.mytodo = '';
			}
		},
		sellectAll() {
			var todoList = this.todoList;
			for(i=0;i<todoList.length;i++){
				if( !todoList[i].checkbox ){
					todoList.forEach(function(todo){
						todo.checkbox = true;
					});
					return;
				}
			}
			todoList.forEach(function(todo){
				todo.checkbox = false;
			});
		},
		detachSellect() {
			this.confirmAll = true;
		},
		hideDetail(todo) {
			todo.detailShow = false;
			console.log(todo.detailShow);
		},
		showDetail(todo) {
			todo.detailShow = !todo.detailShow;
		},
		check(todo){
			todo.checkbox = !todo.checkbox;
		},
		detach(todo) {
			todo.confirm = true;
		},
		yes(index){
			this.todoList.splice(index,1);
			store.save('todo',this.todoList);
		},
		no(todo){
			todo.confirm = false;
		},
		yesAll(){
			var todoList = this.todoList;
			for(i=0;i<todoList.length;i++){
				if( todoList[i].checkbox ){
					todoList.splice(i,1);
					i--;
				}
			}
			store.save('todo',todoList);
			this.confirmAll = false;
		},
		noAll(){
			this.confirmAll = false;
		}
	}
});
