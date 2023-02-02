<template>
    <div>
        <el-container>
            <el-header>
                <div class="logo">
                    <a href="#">
                        <img
                            src="https://qidian.gtimg.com/hongxiu/images/logo.92022.png"
                            alt=""
                        />
                    </a>
                </div>
                <div class="search-wrap">
                    <input
                        type="text"
                        class="search-box"
                        placeholder="傲气如我"
                    />
                    <button class="submit-btn">
                        <i class="el-icon-search"></i>
                    </button>
                </div>
                <div class="user-wrap">
                    <div class="avatar" id="j-userWrap">
                        <a class="link" href="javascript:" id="j-avatar"
                            ><img
                                src="//qidian.gtimg.com/hongxiu/images/ico/account.1e031.png"
                        /></a>
                        <div class="down-drop" id="j-userDownDrop">
                            <dl>
                                <dd>
                                    <a href="javascript:" id="sign-out">退出</a>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <a
                                class="head-msg"
                                href="javascript:"
                                title="消息中心"
                            >
                                <em class="iconfont"></em>
                            </a>
                        </li>
                        <li>    
                            <a class="head-shelf" href="javascript:">
                                <em class="iconfont"></em>我的书架
                            </a>
                        </li>
                    </ul>
                </div>
            </el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.el-header,
.el-footer {
    // background-color: #b3c0d1;
    /* color: #333; */
    text-align: center;
    // line-height: 60px;
}

.el-header {
    width: 1020px;
    height: 86px !important;
    margin: 0 auto;
    padding: 0;
    display: flex;
    align-items: center;
    .logo {
    }
    .search-wrap {
        display: flex;
        .search-box {
            font: 14px/34px PingFangSC-Regular, "-apple-system", Simsun;
            width: 244px;
            height: 34px;
            padding: 0 10px 0 18px;
            border: 2px solid #f01742;
            border-right: none;
            border-radius: 100px 0 0 100px;
            background: 0 0;
            outline: 0px;
        }
        .submit-btn {
            color: #f01742;
            background-color: #fff;
            width: 44px;
            height: 34px;
            border: 2px solid #f01742;
            border-left: none;
            border-radius: 0 100px 100px 0;
        }
    }
}
.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
</style>
