<template>
  <div style="width: 700px" >

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>新增通知</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="notice-container">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <h2 align="center">新增通知</h2><br>
        <el-form-item label="通知标题" prop="title" >
          <el-input v-model="form.title" style="width:250px" ></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required >
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker
                  v-model="form.date"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
              >
              </el-date-picker>
            </el-form-item>

          </el-col>
        </el-form-item>
        <el-form-item label="通知类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="活动"></el-radio>
            <el-radio label="公告"></el-radio>
            <el-radio label="任务"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="通知人员">
          <el-button @click="getRoles" type="primary" style="margin-left: 16px;"
                     icon="el-icon-position" >选择人员</el-button>
        </el-form-item>

        <el-form-item label="通知内容" prop="body" >
          <input type="textarea" v-model="form.body" class="notice-body"></input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm(0)">立即发布通告</el-button>
          <el-button type="primary" @click="saveForm(1)">保存至草稿箱</el-button>
          <el-button @click="resetForm('from')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>


    <div>
      <el-drawer
          class="associated-member"
          title="关联成员"
          :with-header="false"
          :visible.sync="drawer"
          size="40%"
      >
        <el-col :span="12" class="section-left">
          <div class="header">
            <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
          </div>
          <el-input
              class="search"
              size="medium"
              placeholder="请输入姓名搜索"
              suffix-icon="el-icon-search"
              v-model="searchTextLeft"
              clearable
              @input="getSearch"
          />
          <div class="pos">
            <el-checkbox-group
                v-model:
            >
            </el-checkbox-group>
            <el-checkbox-group
                class="checkbox-group"
                v-model="checkedRoles"
                @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                  v-for="(role, index) in leftData"
                  :label="role.id"
                  :key="role.id"
                  class="check-item"
              >
                {{role.memberName}} {{role.phone}}
              </el-checkbox>
            </el-checkbox-group>

          </div>
        </el-col>

        <el-col :span="12" class="section-right">
          <div class="header">接收者</div>
          <el-input
              class="search"
              size="medium"
              placeholder="请输入姓名搜索"
              suffix-icon="el-icon-search"
              v-model="searchTextRight"
              clearable
              @input="getSearch"
          />
          <div class="pos">
            <div class="checked-group">
              <el-col
                  class="li"
                  v-for="(role, index) in selectedRoles"
                  :key="role.memberName + role.id"
              >
                {{ role.memberName }} {{ role.phone }}
                <!--                <zn-icon :iconName="'icon-close'" @click="delRole(role, index)" />-->
              </el-col>
            </div>
          </div>
        </el-col>

        <div class="drawer-footer">
          <el-button class="el-cancel" @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="save" >确定</el-button>
        </div>
      </el-drawer>
    </div>


  </div>




</template>

<script>
import {fetchAllMember, postNotice, saveNotice} from "../../api/notice";

export default {
  name:"NoticeEditor",
  props: {
    modalToBody: {
      type: Boolean,
      default: () => true,
    },
  },
  data(){
    return{
      form:{
        title:'',
        body:'',
        type:'',
        data:'',
        status:'',
      },
      postParams:{
        body:'',
        title:'',
        receiver:[]
      },
      drawer: false,
      direction: 'rtl',
      checkAll: false,
      checkedRoles: [1, 3],
      roles: [

        // { name: '上海', id: 1, phone: '18989898998' },
        // { name: '广州', id: 2, phone: '18989898998' },
        // { name: '北京', id: 3, phone: '18989898998' },
        // { name: '深圳', id: 4, phone: '18989898998' },
        // { name: '石家庄', id: 5, phone: '18989898998' },
        // { name: '唐山', id: 6, phone: '18989898998' },
        // { name: '秦皇岛', id: 7, phone: '18989898998' },
        // { name: '邯郸', id: 8, phone: '18989898998' },
        // { name: '邢台', id: 9, phone: '18989898998' },
        // { name: '保定', id: 10, phone: '18989898998' },
        // { name: '张家口', id: 11, phone: '18989898998' },
        // { name: '承德', id: 12, phone: '18989898998' },
        // { name: '沧州', id: 13, phone: '18989898998' },
        // { name: '廊坊', id: 14, phone: '18989898998' },
        // { name: '上海', id: 15, phone: '18989898998' },
        // { name: '广州', id: 16, phone: '18989898998' },
        // { name: '北京', id: 17, phone: '18989898998' },
        // { name: '深圳', id: 18, phone: '18989898998' },
        // { name: '石家庄', id: 19, phone: '18989898998' },
        // { name: '唐山', id: 20, phone: '18989898998' },
        // { name: '秦皇岛', id: 21, phone: '18989898998' },
        // { name: '邯郸', id: 22, phone: '18989898998' },
        // { name: '邢台', id: 23, phone: '18989898998' },
        // { name: '保定', id: 24, phone: '18989898998' },
        // { name: '张家口', id: 25, phone: '18989898998' },
        // { name: '承德', id: 26, phone: '18989898998' },
        // { name: '沧州', id: 27, phone: '18989898998' },
        // { name: '廊坊', id: 28, phone: '18989898998' },
      ],
      isIndeterminate: true,
      searchTextLeft: '',
      searchTextRight: '',
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期时间', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        body: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 右侧已选数据
    selectedRoles() {
      let arr = []
      if (this.checkedRoles.length > 0) {
        arr = this.roles.filter((item) => this.checkedRoles.includes(item.id))
        if (this.searchTextRight) {
          return arr.filter((i) => i.name.includes(this.searchTextRight))

        } else {
          return arr //根据人名排序
        }
      }
    },
    leftData() {
      if (this.searchTextLeft) {
        return this.roles.filter((i) => i.name.includes(this.searchTextLeft))
      } else {
        return this.roles
      }
    },
  },
  methods:{
    getRoles(){
      console.log(this.drawer)
      this.drawer = true;
      fetchAllMember().then(res=>{
        console.log(res)
        this.roles=res.data;
      })
    },

    saveForm(status){
      this.form.status=status;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          saveNotice(this.form).then(res=>{
            if(res.code===1){
              if(status===0){
                this.postParams.receiver=this.selectedRoles;
                this.postParams.title=res.data.title;
                this.postParams.body=res.data.body;
                console.log(this.postParams)
                postNotice(this.postParams).then(res=>{
                  if(res.code===1){
                    this.$message.success(res.data);
                  }else{
                    this.$message.error("发送失败，已保存至草稿箱");
                  }
                  this.$router.push({path: '/notice'});
                })
              }else{
                this.$message.success("已保存至草稿箱");
              }
            }else{
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(){
        this.form={};
    },

    showEdit(row) {
      this.drawer = true
    },

    // 处理搜索
    getSearch() {
      if (this.searchTextLeft) {
        return this.leftData
      }
      if (this.searchTextRight) {
        return this.selectedRoles
      }
    },
    handleCheckAllChange(val) {
      this.checkedRoles =val
          ?this.roles.map((i) => {
            return i.id
          })
          : [] //深拷贝解决全选之后单个删除右侧数据会触发左侧数据源的删除
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.roles.length
      this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.roles.length
    },
    // 删除某一个
    delRole(role, index) {
      let idx = this.checkedRoles.findIndex((itm) => itm == role.id)
      if (idx != -1) {
        this.checkedRoles.splice(idx, 1)
      }
    },
    // 提交
    save() {
      console.log('this.selectedRoles', this.selectedRoles);
      this.drawer=false;
    },
  },

}
</script>

<style>
/*.pos::-webkit-scrollbar {*/
/*  width: 20px;*/
/*}*/

.li {
  height: 30px;
  padding-bottom: 5px;
  position: relative;
}

.notice-container{
  background-color: #FFFFFF;
  height: 680px;
}

.checked-group{
  height: 500px;
}

.section-left,.section-right{
  overflow-y: auto;
  padding-left: 10px;
  padding-right: 10px;
}
.header{
  height: 30px;
  padding-left: 16px;
  line-height: 30px;
  background-color: cornflowerblue;
}
.search{
  padding-bottom: 10px;
  padding-top: 10px;
}
.check-item{
  padding-bottom: 10px;
}
.drawer-footer{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  padding-bottom: 50px;
}
el-button{
  padding: 0;
  min-width: 83px;
  line-height: 36px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  border: none;
}

.notice-body{
  height: 300px;
  width: 500px;
  outline:none;
  outline:medium;
  text-align: start;
}
.pos {
  height: 650px;
  overflow: hidden;
  overflow-y: auto;
  background-color: #FFFFFF;
  font-size: 14px;
}
</style>