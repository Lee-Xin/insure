const PermissionList = [{ id: 1, name: "权限1", createTime: "创建时间" }];
const PermissionDetail = {
    name: "策略组名",
    permissionList: [
        {
            name: "首页模块",
            list: [
                {
                    id: 1,
                    name: "首页",
                    checked: true,
                    operation: []
                }
            ]
        },
        {
            name: "供应商模块",
            list: [
                {
                    id: 2,
                    checked: false,
                    name: "供应商列表",
                    operation: [
                        { id: 21, name: "详情", checked: false },
                        { id: 22, name: "添加", checked: true },
                        { id: 23, name: "删除", checked: false },
                        { id: 24, name: "编辑", checked: false }
                    ]
                },
                {
                    id: 3,
                    checked: false,
                    name: "产品列表",
                    operation: [
                        { id: 31, name: "发布", checked: true },
                        { id: 32, name: "添加", checked: false },
                        { id: 33, name: "删除", checked: false },
                        { id: 34, name: "编辑", checked: false }
                    ]
                }
            ]
        }
    ]
};
const allPermissionList = [
    {
        name: "首页模块",
        list: [
            {
                id: 1,
                name: "首页",
                checked: false,
                operation: []
            }
        ]
    },
    {
        name: "供应商模块",
        list: [
            {
                id: 2,
                checked: false,
                name: "供应商列表",
                operation: [
                    { id: 21, name: "详情", checked: false },
                    { id: 22, name: "添加", checked: false },
                    { id: 23, name: "删除", checked: false },
                    { id: 24, name: "编辑", checked: false }
                ]
            },
            {
                id: 3,
                checked: false,
                name: "产品列表",
                operation: [
                    { id: 31, name: "发布", checked: false },
                    { id: 32, name: "添加", checked: false },
                    { id: 33, name: "删除", checked: false },
                    { id: 34, name: "编辑", checked: false }
                ]
            }
        ]
    }
];
export { PermissionList, PermissionDetail, allPermissionList };
