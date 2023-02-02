<template>
  <div class="app-container">
    <div class="wrap">
      <el-button @click="handleAdd">新增</el-button>
      <div class="wrap_content">
        <el-input placeholder="请输入类型名称" v-model="name" clearable @clear="search" />
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="类型名称"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="addForm" status-icon label-width="100px" class="demo-addForm">
        <el-form-item label="类型名称">
          <el-input v-model="addForm.name" style="width: 90%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureAdd">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="editForm" status-icon label-width="100px" class="demo-editForm">
        <el-form-item label="类型名称">
          <el-input v-model="editForm.name" style="width: 90%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureEdit">确 定</el-button>
        <el-button @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      addDialogVisible: false, //新增弹窗控制
      editDialogVisible: false, //修改弹窗控制
      addForm: {},
      editForm: {},
      pageNum: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "/class/check",
        method: "get",
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        },
      }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.results;
          this.total = res.total;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },
    handleAdd() {
      this.addForm = {};
      this.addDialogVisible = true;
    },
    sureAdd() {
      this.$axios({
        url: "/class/add",
        method: "post",
        data: {
          name: this.addForm.name,
        },
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.addDialogVisible = false;
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.pageNum = Math.ceil(++this.total / this.pageSize);
          this.getData();
        }
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/class/delete",
            method: "delete",
            data: {
              id: row.id,
            },
          }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              const totalPage = Math.ceil((this.total - 1) / this.pageSize); // 总页数
              this.pageNum = this.pageNum > totalPage ? totalPage : this.pageNum;
              this.pageNum = this.pageNum < 1 ? 1 : this.pageNum;
              this.getData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(row) {
      this.editForm = { ...row };
      this.editDialogVisible = true;
    },
    sureEdit() {
      this.$axios({
        url: "/class/edit",
        method: "put",
        data: {
          id: this.editForm.id,
          name: this.editForm.name,
        },
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.editDialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.getData();
        } else {
          this.$message({
            type: "error",
            message: res.data,
          });
        }
      });
    },
    search() {
      this.pageNum = 1;
      this.getData();
    },
  },
};
</script>

<style lang="scss">
.line {
  text-align: center;
}
.wrap {
  display: flex;
  justify-content: space-between;
  .wrap_content {
    display: flex;
    input {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    button {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-left: 0px;
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-message-box__btns {
  padding: 5px 15px 0;
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
}
</style>
