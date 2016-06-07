// 时间复杂度是O(n)的列表diff实现

function diff(oldList, newList, key) {
	var listCommon = [];

	var oldListMap = makeKeyMap(oldList, key);
	var newListMap = makeKeyMap(newList, key);

	var oldListKeys = Object.keys(newListMap);

	var simulateList = [];

	// 包含添加和删除的项
	var moveList = [];

	// 遍历旧的列表，将 旧的列表不在新的列表的项 排除之后得到一个新的列表
	var delCount = 0;
	oldList.forEach(function(item, index) {
		var itemKey = item[key];

		if (itemKey in newListMap) {
			simulateList.push(item);
		} else {
			addRemoveItem(moveList, item, index - delCount);
			delCount++;
		}
	});

	// 遍历新的列表，得到需要移动的项，并将其放置到moveList
	var oldIndex = 0;

	newList.forEach(function(newItem, newIndex) {
		var oldItem = simulateList[oldIndex];
		var oldVal;

		var newVal = newItem[key];

		if (oldItem) {
			oldVal = oldItem[key];

			if (oldVal === newVal) {
				// 两个相等，说明对旧列表不需要做任何操作
				oldIndex++;
			} else {
				var nextOldVal = simulateList[oldIndex + 1][key];

				// 下一项跟当前项相同
				if (nextOldVal === newVal) {
					removeItem(simulateList, oldIndex); // 模拟列表当前项也没用了，保留下一项
					addRemoveItem(moveList, oldItem, newIndex); // 将老的列表当前项删除掉，而保留下一项
					oldIndex++;
				} else {
					// 当前项和下一项都跟新的列表当前项不一样，说明该项是新增的
					insert(moveList, newItem, newIndex);
				}
			}
		} else {
			// 表明新的比旧的要长，此时直接添加进去
			insert(moveList, newItem, newIndex);
		}
	});


	var simulateListLen = simulateList.length;

	// 如果旧列表oldIndex未能达到最后一项，说明需要把旧的项也移除掉
	if (oldIndex < simulateListLen) {
		var lastNum = simulateListLen - oldIndex;

		var newListLen = newList.length;

		for (; lastNum < simulateListLen; lastNum++) {
			addRemoveItem(moveList, simulateList[lastNum], newListLen);
		}
	}

	return moveList;
}

function makeKeyMap(list, key) {
	var obj = Object.create(null);

	list.forEach(function(item, index) {
		obj[item[key]] = index;
	});

	return obj;
}

function insert(list, item, index) {
	list.push({
		type: 'insert',
		item: item,
		index: index
	});
}

function addRemoveItem(list, item, index) {
	list.push({
		item: item,
		index: index,
		type: 'delete'
	});
}

function removeItem(list, index) {
	list.splice(index, 1);
}