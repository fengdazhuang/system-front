<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 管理员表
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

        <el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
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
        <el-table-column prop="id" label="ID" width="120" align="center" ></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="password" label="密码" ></el-table-column>

        <el-table-column prop="createTime" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">

            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
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
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
import {addManagerData,
  deleteManagerData, fetchManagerData, updateManagerData} from '../../api/manager.js';
export default {
  name: 'basetable',
  data() {
    return {
      query: {
        username: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      editVisible: false,
      pageTotal: 0,
      form: {
        id:'',
        name:'',
        password:''
      },
      idx: -1,
      id: -1,
      requestType:''
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

    // 获取 分页 的模拟数据
    getData() {
      fetchManagerData(this.query).then(res => {
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
            deleteManagerData(id).then(res=>{
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
    handleEdit(row) {
      this.form = row;
      this.editVisible = true;
      this.requestType='update';
    },
    // 保存编辑
    saveEdit() {

      if(this.requestType==='update'){
        updateManagerData(this.form).then(res=>{
          if(res.code===1){
            this.getData();
            this.$message.success(res.data);
          }else{
            this.$message.error(`修改管理员失败`);
          }
        })
      }else{
        addManagerData(this.form).then(res=>{
          if(res.code===1){
            this.getData();
            this.$message.success(res.data);

          }else{
            this.$message.error(`添加管理员失败`);
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
