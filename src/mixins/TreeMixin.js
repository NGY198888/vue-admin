export default {
    methods:{
        setTreeData(arr,idField='id',pidField='pid') {
            // 删除所有的children,以防止多次调用
            arr.forEach(function(item) {
                delete item.children;
            });
            let map = {}; //构建map
            arr.forEach(i => {
                map[i[idField]] = i; //构建以id为键 当前数据为值
            });
            let treeData = [];
            arr.forEach(child => {
                const mapItem = map[child[pidField]]; //判断当前数据的parentId是否存在map中
                if (mapItem) {
                    //存在则表示当前数据不是最顶层的数据
                    //注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
                    (mapItem.children || (mapItem.children = [])).push(child); //这里判断mapItem中是否存在child
                } else {
                    //不存在则是顶层数据
                    treeData.push(child);
                }
            });
            return treeData;
         }
    }

}