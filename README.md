# list-diff
时间复杂度是O(n)的两个列表diff算法

## 使用
```javascript
	var diff = require("list-diff");
	var oldList = [{id: "a"}, {id: "b"}, {id: "c"}, {id: "d"}, {id: "e"}];
	var newList = [{id: "c"}, {id: "a"}, {id: "b"}, {id: "e"}, {id: "f"}];

	var moves = diff(oldList, newList, "id");
	// `moves` is a sequence of actions (remove or insert): 
	// type 0 is removing, type 1 is inserting
	// moves: [
	//   {index: 3, type: "delete"},
	//   {index: 0, type: "insert", item: {id: "c"}}, 
	//   {index: 0, type: "delete"}, 
	//   {index: 4, type: "insert", item: {id: "f"}}
	//  ]

	moves.forEach(function(move) {
	  	if (move.type === 'delete') {
	    	oldList.splice(move.index, 1); // type 0 is removing
	  	} else {
	    	oldList.splice(move.index, 0, move.item); // type 1 is inserting
	  	}
	});

	// now `oldList` is equal to `newList`
	// [{id: "c"}, {id: "a"}, {id: "b"}, {id: "e"}, {id: "f"}]
	console.log(oldList); // [{id: "c"}, {id: "a"}, {id: "b"}, {id: "e"}, {id: "f"}]
```
## 说明
两个list列表的diff实现，这是一个。还有一种是最小编辑距离实现，是基于`动态规划`的，有兴趣的可以自己研究下。