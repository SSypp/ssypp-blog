<template>
  <div class="wrap">
    <p>所有分类</p>
    <el-table :data="kind_list" stripe style="width: 100%">
      <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="!scope.row.isShow">
            {{ scope.row.name }}
          </el-tag>
          <el-input
            v-if="scope.row.isShow"
            @change="handleChange(scope.row)"
            @blur="handleChange(scope.row)"
            v-model="scope.row.name"
            clearable
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "catelist",
  data() {
    return {
      kind_list: []
    };
  },
  mounted() {
    this.handleGetAll();
  },
  methods: {
    async handleGetAll() {
      if (!window.localStorage.getItem("kindlist")) {
        let code = 0;
        const kindList = [];
        let i = 1;
        let count = 0;
        while (code !== 422) {
          const res = await this.$get(`api/categories/${i}`);
          if (res.code !== 200) {
            i++;
            if (count <= 5) {
              count++;
              continue;
            } else {
              break;
            }
          }
          kindList.push(res.result);
          code = res.code;
          i++;
        }
        kindList.forEach(item => {
          item.isShow = false;
        });
        window.localStorage.setItem("kindlist", JSON.stringify(kindList));
        this.kind_list = kindList;
      } else {
        this.kind_list = JSON.parse(window.localStorage.getItem("kindlist"));
      }
    },
    handleEdit(row) {
      row.isShow = true;
    },
    async handleChange(row) {
      // console.log(row.name)
      if (row.name == "" || row.name.indexOf(" ") === 0) return;
      const catename = {
        Name: row.name
      };
      const res = await this.$put(`api/categories/${row.id}`, catename);
      if (res.code !== 200) return;
      window.localStorage.removeItem("kindlist");
      this.handleGetAll();
      this.$message({
        type: "success",
        message: "修改成功!"
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将删除所选分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$deleted(`api/categories/${row.id}`);
          if (res.code !== 200) return;
          window.localStorage.removeItem("kindlist");
          this.handleGetAll();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 0px;
  box-sizing: border-box;
  >p{
    background-color: #fff;
    padding:5px 10px;
  }
}
</style>
