<template>
    <div class="app-container">
        <div class="wrap">
            <el-button @click="handleAdd">新增</el-button>
            <div class="wrap_content">
                <el-input
                    placeholder="请输入小说名称"
                    v-model="name"
                    clearable
                    @clear="search"
                />
                <el-button type="primary" @click="search">搜索</el-button>
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID"> </el-table-column>
            <el-table-column prop="cover" label="小说封面">
                <template slot-scope="scope">
                    <img
                        style="width: 53px; height: 70px"
                        :src="scope.row.cover"
                        alt=""
                    />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="小说名称"> </el-table-column>
            <el-table-column prop="author" label="小说作者"> </el-table-column>
            <el-table-column prop="intro" label="小说简介"> </el-table-column>
            <el-table-column prop="class" label="小说类型"> </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text"
                        >编辑</el-button
                    >
                    <el-button type="text" @click="handleDelete(scope.row)"
                        >删除</el-button
                    >
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
            <el-form
                :model="addForm"
                status-icon
                label-width="100px"
                class="demo-addForm"
            >
                <el-form-item label="小说封面">
                    <el-upload
                        class="avatar-uploader"
                        action="/api/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="小说名称">
                    <el-input
                        v-model="addForm.name"
                        style="width: 90%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="小说作者">
                    <el-input
                        v-model="addForm.author"
                        style="width: 90%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="小说简介">
                    <el-input
                        v-model="addForm.intro"
                        style="width: 90%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="小说类型">
                    <el-select
                        v-model="value"
                        style="width: 90%"
                        clearable
                        placeholder="请选择小说类型"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureAdd">确 定</el-button>
                <el-button @click="addDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="editDialogVisible" width="30%">
            <el-form
                :model="editForm"
                status-icon
                label-width="100px"
                class="demo-editForm"
            >
                <el-form-item label="小说封面">
                    <el-upload
                        class="avatar-uploader"
                        action="/api/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="小说名称">
                    <el-input
                        v-model="editForm.name"
                        style="width: 90%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="小说作者">
                    <el-input
                        v-model="editForm.author"
                        style="width: 90%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="小说简介">
                    <el-input
                        v-model="editForm.intro"
                        style="width: 90%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="小说类型">
                    <el-select
                        v-model="value"
                        style="width: 90%"
                        clearable
                        placeholder="请选择小说类型"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>
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
            name: "", //搜索框数据
            addDialogVisible: false, //新增弹窗控制
            editDialogVisible: false, //修改弹窗控制
            pageNum: 1,
            pageSize: 5,
            total: 0,
            tableData: [],
            addForm: {},
            editForm: {},
            imageUrl: "",
            options: [],
            value: "",
        };
    },
    mounted() {
        this.getClassData();
        this.getBookData();
    },
    methods: {
        getClassData() {
            this.$axios({
                url: "/class/check",
                method: "get",
                params: {
                    pageNum: 1,
                    pageSize: 99,
                },
            }).then((res) => {
                if (res.code === 200) {
                    this.options = res.results;
                }
            });
        },
        getBookData() {
            this.$axios({
                url: "/book/check",
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
        handleAdd() {
            this.addForm = {};
            this.imageUrl = "";
            this.addDialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = "http://127.0.0.1:3000/upload/" + res.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 jpg 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        sureAdd() {
            this.$axios({
                url: "/book/add",
                method: "post",
                data: {
                    cover: this.imageUrl,
                    name: this.addForm.name,
                    author: this.addForm.author,
                    intro: this.addForm.intro,
                    class: this.value,
                },
            }).then((res) => {
                if (res.code === 200) {
                    this.addDialogVisible = false;
                    this.$message({
                        type: "success",
                        message: "添加成功",
                    });
                    this.pageNum = Math.ceil(++this.total / this.pageSize);
                    this.getBookData();
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
                        url: "/book/delete",
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
                            this.pageNum = 1;
                            this.getBookData();
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
            this.imageUrl = row.cover;
            this.value = row.class;
            this.editForm = { ...row };
            this.editDialogVisible = true;
        },
        sureEdit() {
            this.$axios({
                url: "/book/edit",
                method: "put",
                data: {
                    id: this.editForm.id,
                    cover: this.imageUrl,
                    name: this.editForm.name,
                    author: this.editForm.author,
                    intro: this.editForm.intro,
                    class: this.value,
                },
            }).then((res) => {
                console.log(res);
                if (res.code === 200) {
                    this.editDialogVisible = false;
                    this.$message({
                        type: "success",
                        message: "修改成功",
                    });
                    this.getBookData();
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
            this.getBookData();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getBookData();
        },
    },
};
</script>

<style lang="scss" scoped>
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
    height: 133px;
    line-height: 133px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 133px;
    display: block;
}
.el-message-box__btns {
    padding: 5px 15px 0;
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
}
</style>
