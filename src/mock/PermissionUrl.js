const data =[
    {
        type: 0,
        'checked': false,  //选中状态  false 不选
        'id': '1',  //角色ID
        'description': '用户管理', //角色描述
        isIndeterminate: false,// isIndeterminate属性是控制多选半选中状态，
        checkAll: false,//是控制全选中状态
        act: '全选',
        children: [
            {
                type: 1,
                id: 6,
                'description': '用户列表',
                'parentId': '-1',  //父级ID
                'checked': false,
                selectchecked: [],  // 放置sonData1选中项  例如:[7,4,3,2]
                checkAll: false,
                isIndeterminate: false,
                'sonData1': [
                    {
                        type: 2,
                        'description': '用户新增',
                        'parentId': '6',
                        'checked': false,
                        'id': '7'

                    },
                    {
                        type: 2,
                        'description': '用户修改',
                        'parentId': '6',
                        'checked': false,
                        'id': '8'
                    },
                    {
                        type: 2,
                        'description': '用户删除',
                        'parentId': '6',
                        'checked': false,
                        'id': '9'
                    }
                ]
            },
            {
                type: 1,
                id: 13,
                'description': '角色列表',
                'parentId': '-1',
                'checked': false,
                selectchecked: [],
                checkAll: false,
                isIndeterminate: false,
                'sonData1': [
                    {
                        type: 2,
                        'description': '角色授权',
                        'parentId': '6',
                        'checked': false,
                        'id': '10'

                    },
                    {
                        type: 2,
                        'description': '角色修改',
                        'parentId': '6',
                        'checked': false,
                        'id': '11'
                    },
                    {
                        type: 2,
                        'description': '角色删除',
                        'parentId': '6',
                        'checked': false,
                        'id': '12'
                    }
                ]
            }
        ]
    },
    {
        type: 0,
        'checked': false,
        'id': '2',
        'description': '设备管理',
        isIndeterminate: false,
        checkAll: false,
        act: '全选',
        children: [
            {
                type: 1,
                id: 6,
                'description': '设备列表',
                'parentId': '-1',
                'checked': false,
                selectchecked: [],
                checkAll: false,
                isIndeterminate: false,
                'sonData1': [
                    {
                        type: 2,
                        'description': '设备新增',
                        'parentId': '6',
                        'checked': false,
                        'id': '17'

                    },
                    {
                        type: 2,
                        'description': '设备修改',
                        'parentId': '6',
                        'checked': false,
                        'id': '18'
                    },
                    {
                        type: 2,
                        'description': '设备删除',
                        'parentId': '6',
                        'checked': false,
                        'id': '19'
                    }
                ]
            }
        ]
    }
]

export default data;
