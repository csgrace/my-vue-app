<template>
  <div class="login-container" v-if="!isLoggedIn">
    <h1>Login</h1> <!-- 登录标题 -->
    <form @submit.prevent="login">
      <div class="input-group">
        <input v-model="username" placeholder="Username" /> <!-- 用户名输入框 -->
      </div>
      <div class="input-group">
        <input v-model="password" type="password" placeholder="Password" /> <!-- 密码输入框 -->
      </div>
      <button type="submit" class="login-button">Login</button> <!-- 登录按钮 -->
      <div class="message-container">
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div> <!-- 错误信息 -->
        <div v-if="successMessage" class="success">{{ successMessage }}</div> <!-- 成功信息 -->
      </div>
    </form>
  </div>
  <div v-else class="welcome-container">
    <h2>Welcome, {{ username }}</h2> <!-- 欢迎信息 -->
    <div v-if="username === 'postgres' && password === 'huarui66'">
      <button @click="toggleService('ArticleService')">ArticleService</button>
      <div v-if="services.ArticleService">
        <p>geArticletArticleCitationsByYear</p>
        <p>addArticleAndUpdateIF</p>
      </div>
      <button @click="toggleService('AuthorService')">AuthorService</button>
      <div v-if="services.AuthorService">
        <p>getArticlesByAuthorSortedByCitations</p>
        <p>getJournalWithMostArticlesByAuthor</p>
        <p>getMinArticlesToLinkAuthors</p>
      </div>
      <button @click="toggleService('DatabaseService')">DatabaseService</button>
      <div v-if="services.DatabaseService">
        <p>getGroupMembers</p>
        <p>importData</p>
        <p>truncate</p>
        <p>sum</p>
      </div>
      <button @click="toggleService('GrantService')">GrantService</button>
      <div v-if="services.GrantService">
        <p>getCountryFundPapers</p>
      </div>
      <button @click="toggleService('JournalService')">JournalService</button>
      <div v-if="services.JournalService">
        <p>getImpactFactor</p>
        <p>updateJournalName</p>
      </div>
      <button @click="toggleService('KeywordService')">KeywordService</button>
      <div v-if="services.KeywordService">
        <p>getArticleCountByKeywordInPastYears</p>
      </div>
    </div>
    <button @click="logout" class="logout-button">Logout</button> <!-- 注销按钮 -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // 导入 Vuex 的 mapActions

export default {
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
      errorMessage: '', // 错误信息
      successMessage: '', // 成功信息
      isLoggedIn: false, // 登录状态
      services: {
        ArticleService: false,
        AuthorService: false,
        DatabaseService: false,
        GrantService: false,
        JournalService: false,
        KeywordService: false,
      },
    };
  },
  methods: {
    ...mapActions(['loginUser', 'logout']), // 映射 Vuex 的 loginUser 和 logout 动作
    async login() {
      try {
        await this.loginUser({ username: this.username, password: this.password }); // 调用 loginUser 动作
        this.successMessage = 'Valid user!'; // 设置成功信息
        this.isLoggedIn = true; // 设置登录状态
      } catch (error) {
        console.error('Login error:', error); // 添加调试信息
        this.errorMessage = 'Invalid username or password'; // 设置错误信息
        this.username = ''; // 清空用户名输入框
        this.password = ''; // 清空密码输入框
      }
    },
    logout() {
      this.logout(); // 调用 logout 动作
      this.isLoggedIn = false; // 重置登录状态
      this.username = ''; // 清空用户名输入框
      this.password = ''; // 清空密码输入框
      this.errorMessage = ''; // 清空错误信息
      this.successMessage = ''; // 清空成功信息
    },
    toggleService(service) {
      this.$set(this.services, service, !this.services[service]);
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 600px; /* 增加容器宽度 */
  margin: auto;
  padding: 40px; /* 增加容器内边距 */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0f7fa; /* 设置背景颜色为浅蓝色 */
}

h1 {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px; /* 增加输入框之间的距离 */
  width: 100%;
}

input {
  width: 100%;
  height: 40px; /* 设置输入框固定高度 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* 确保一致的尺寸 */
}

.login-button {
  width: 80%; /* 缩小按钮宽度 */
  padding: 10px;
  margin-top: 20px; /* 往下移按钮 */
  background-color: #4caf50; /* 设置按钮颜色为绿色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center; /* 按钮文本居中 */
}

.login-button:hover {
  background-color: #45a049;
}

.message-container {
  height: 20px; /* 设置消息容器固定高度 */
  margin-top: 10px;
}

.error {
  color: red;
}

.success {
  color: green;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 600px; /* 增加容器宽度 */
  margin: auto;
  padding: 40px; /* 增加容器内边距 */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0f7fa; /* 设置背景颜色为浅蓝色 */
}

.logout-button {
  width: auto; /* 调整注销按钮宽度 */
  padding: 10px 20px;
  background-color: #4caf50; /* 设置按钮颜色为绿色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center; /* 按钮文本居中 */
}

.logout-button:hover {
  background-color: #45a049;
}

button {
  cursor: pointer;
  color: #42b983;
}

p {
  margin-left: 20px;
}

.small-text {
  font-size: 0.8em;
}
</style>