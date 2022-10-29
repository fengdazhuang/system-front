<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 消息中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>


        <div class="container" >
            <el-tabs v-model="message" >
                <el-tab-pane :label="`已发布(${this.total1})`"  name="first">
                    <el-table ref="table" :data="noticeFirst"  :show-header="false">
                      <el-table-column prop="createTime" width="180"></el-table-column>
                      <el-table-column prop="type" width="100"></el-table-column>
                      <el-table-column>
                        <template slot-scope="scope">
                          <span class="message-title">{{scope.row.title}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column width="120"  >
                        <template slot-scope="scope">
                          <el-button size="small" @click="toogleExpand(scope.row)">详情</el-button>
                        </template>
                      </el-table-column>

                      <!-- 展开部分 -->
                      <el-table-column type="expand" width="1">
                        <input  :value="inputValue" type="textarea" class="body-expand" readonly></input>
                      </el-table-column>
                    </el-table>


                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                      <router-link :to="{path:'/noticeEditor'}">
                        <el-button type="success" icon="el-icon-position" style="float: right">发布新公告</el-button>
                      </router-link>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`草稿箱(${this.total2})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="noticeSecond" :show-header="false" style="width: 100%">
                          <el-table-column prop="createTime" width="180"></el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="clearData(noticeSecond)">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${this.total3})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="noticeThird" :show-header="false" style="width: 100%">
                          <el-table-column prop="createTime" width="180"></el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="clearData(noticeThird)">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
import {deleteAll, fetchNoticeData } from "../../api/notice";

    export default {
        name: 'Notice',
        data() {
            return {
                query: {
                  pageIndex: 1,
                  pageSize: 10,
                },
                noticeFirst: [],
                noticeSecond:[],
                noticeThird:[],
                message: 'first',
                showHeader: false,
                total1:0,
                total2:0,
                total3:0,
                inputValue:''
            }

        },

        methods: {
            clearData(data){
              this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
              }).then(()=>{
                let str='';
                for(let i=0;i<data.length;i++){
                  str+=data[i].id+',';
                }
                deleteAll(str).then(res=>{
                  if(res.code===1){
                    this.$message.success("清空完成");
                  }else{
                    this.$message.error("清空失败");
                  }
                })
              })

            },

          toogleExpand(row) {

            this.inputValue=row.body;

            console.log(row.body)
            const $table = this.$refs.table
            // 注意，这里的 this.list 是上面 data 中的 list
            // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
            this.noticeFirst.map((item) => {
              if (row.id !== item.id) {
                $table.toggleRowExpansion(item, false)
              }
            })
            $table.toggleRowExpansion(row)


          },

            getData(){
              fetchNoticeData(this.query).then(res => {
                console.log(res)
                this.noticeFirst=res.map['notice0'].records;
                this.total1=res.map['notice0'].total;
                this.noticeSecond=res.map['notice1'].records;
                this.total2=res.map['notice1'].total;
                this.noticeThird=res.map['notice2'].records;
                this.total2=res.map['notice2'].total;
                console.log(this.total1)

              });

            },

            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            },

        },

        created() {
          this.getData()
        }
    }

</script>

<style >
.table-style{
  height: 250px;
}

.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
.body-expand{
   border:none;
   width: 1000px;
   height:80px;
　　box-radius:25%;
　　outline:medium;
　　text-align:center;
  outline: none;

}
</style>

