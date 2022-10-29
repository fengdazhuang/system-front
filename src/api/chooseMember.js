export default {
    getEmployeeList () {
        return {
            returncode: 0,
            message: '',
            result: [
                {
                    id: 1,
                    employeeName: '吴亦凡',
                    departmentId: 44
                },
                {
                    id: 2,
                    employeeName: '鹿晗',
                    departmentId: 45
                },
                {
                    id: 3,
                    employeeName: '孙红雷',
                    departmentId: 44
                },
                {
                    id: 4,
                    employeeName: '周杰伦',
                    departmentId: 45
                },
                {
                    id: 5,
                    employeeName: '张国荣',
                    departmentId: 45
                },
                {
                    id: 6,
                    employeeName: '陈百强',
                    departmentId: 45
                },
                {
                    id: 7,
                    employeeName: '谭咏麟',
                    departmentId: 41
                },
                {
                    id: 8,
                    employeeName: '谷村新司',
                    departmentId: 45
                },
                {
                    id: 9,
                    employeeName: '中岛美雪',
                    departmentId: 46
                },
                {
                    id: 10,
                    employeeName: '周润发',
                    departmentId: 47
                },
                {
                    id: 14,
                    employeeName: '周慧敏',
                    departmentId: 58
                },
                {
                    id: 13,
                    employeeName: '张学友',
                    departmentId: 58
                }
            ]
        }
    },
    getDepartmentList () {
        return {
            returncode: 0,
            message: '',
            result: [
                {
                    id: 40,
                    name: '研发一部',
                    parentId: 37,
                    sequence: 2
                },
                {
                    id: 41,
                    name: '研发二部',
                    parentId: 37,
                    sequence: 4
                },
                {
                    id: 43,
                    name: '市场',
                    parentId: 0,
                    sequence: 6
                },
                {
                    id: 44,
                    name: '销售',
                    parentId: 0,
                    sequence: 4
                },
                {
                    id: 45,
                    name: '财务',
                    parentId: 0,
                    sequence: 5
                },
                {
                    id: 46,
                    name: '研发三部',
                    parentId: 37,
                    sequence: 1
                },
                {
                    id: 47,
                    name: '研发四部',
                    parentId: 37,
                    sequence: 3
                },
                {
                    id: 37,
                    name: '研发',
                    parentId: 0,
                    sequence: 5
                },
                {
                    id: 58,
                    name: '研发一部',
                    parentId: 57,
                    sequence: 1
                },
                {
                    id: 59,
                    name: '测试',
                    parentId: 0,
                    sequence: 5
                },
                {
                    id: 60,
                    name: '测试一部',
                    parentId: 59,
                    sequence: 1
                },
                {
                    id: 61,
                    name: '测试二部',
                    parentId: 59,
                    sequence: 2
                },
                {
                    id: 62,
                    name: '研发二部',
                    parentId: 57,
                    sequence: 2
                }
            ]
        }
    }
}