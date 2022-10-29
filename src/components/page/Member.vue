<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 成员表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>


                <el-select v-model="query.team" placeholder="组别" clearable class="handle-select mr10">
                    <el-option key="1" label="程序组" value="程序组"></el-option>
                    <el-option key="2" label="游戏组" value="游戏组"></el-option>
                    <el-option key="3" label="视创组" value="视创组"></el-option>
                    <el-option key="4" label="设计组" value="设计组"></el-option>
                    <el-option key="5" label="文案组" value="文案组"></el-option>
                </el-select>


                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" round icon="el-icon-zoom-in" @click="addData" style="float: right">添加新管理员</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="memberId" label="ID" width="120" align="center" ></el-table-column>
                <el-table-column prop="memberName" label="用户名" width="100"></el-table-column>
                <el-table-column prop="sex" label="性别" width="50"></el-table-column>
<!--                <el-table-column label="账户余额">-->
<!--                    <template slot-scope="scope">￥{{scope.row.money}}</template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="头像(查看大图)" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-image-->
<!--                            class="table-td-thumb"-->
<!--                            :src="scope.row.photo"-->
<!--                            :preview-src-list="[scope.row.photo]"-->
<!--                        ></el-image>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="team" label="组别" width="70"></el-table-column>
                <el-table-column prop="position" label="职位"></el-table-column>
<!--                <el-table-column label="状态" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-tag-->
<!--                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"-->
<!--                        >{{scope.row.state}}</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="collage" label="学院"></el-table-column>
                <el-table-column prop="createTime" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">

                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.id, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.row.id)"

                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {addMemberData, deleteData, fetchData, updateMemberData} from '../../api/member.js';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                team: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            resultType:'',
        };
    },
  computed:{
    delList(){
      return this.multipleSelection
    }
  },
    created() {
        this.getData();
    },
    methods: {
      addData(){
        this.editVisible=true;
        this.requestType='add';
        this.form={}
      },
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
              console.log(res)
                this.tableData = res.data.records;
                this.pageTotal = res.data.total || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(id) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                  deleteData(id).then(res=>{
                    console.log(this.query)
                    if(res.code===1){
                      this.$message.success('删除成功');
                      this.getData();
                    }else{
                      this.$message.error('删除失败');
                    }
                  })
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.delList.length;
            let str = '';
            console.log(this.delList)
            for (let i = 0; i < length; i++) {
              str += this.delList[i].id + ',';
            }
            console.log(str)
            this.handleDelete(str)
            this.multipleSelection = []
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
          if(this.requestType==='update'){
            updateMemberData(this.form).then(res=>{
              if(res.code===1){
                this.getData();
                this.$message.success(res.data);
              }else{
                this.$message.error(`修改成员失败`);
              }
            })
          }else{
            addMemberData(this.form).then(res=>{
              if(res.code===1){
                this.getData();
                this.$message.success(res.data);
              }else{
                this.$message.error(`添加成员失败`);
              }
            })
          }
          this.editVisible = false;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
