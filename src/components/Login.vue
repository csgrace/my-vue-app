<template>
  <div>
    <div v-if="!isLoggedIn" class="login">
      <h2>Log in</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password" class="password-label">Password:</label>
          <input type="password" v-model="password" required class="password-input" />
        </div>
        <button type="submit" class="login-button">commit</button>
        <div class="message-container">
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </div>
      </form>
    </div>
    <div v-else class="welcome-container">
      <h2>Welcome, {{ username }}</h2>
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
          <p class="small-text">getArticleCountByKeywordInPastYears</p>
        </div>
      </div>
      <button @click="logout" class="logout-button">Log out</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '', // 用户输入的用户名
      password: '', // 用户输入的密码
      errorMessage: '', // 错误信息
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
    login() {
      // 定义本地存储的用户数据
      const users = [
        { username: 'postgres', password: 'huarui66' },
        { username: 'user2', password: 'password2' },
      ];

      // 匹配用户输入
      const user = users.find(
        (u) => u.username === this.username && u.password === this.password
      );

      if (user) {
        // 登录成功
        this.isLoggedIn = true;
        this.errorMessage = '';
      } else {
        // 登录失败
        this.errorMessage = 'Invalid username or password';
      }
    },
    logout() {
      // 重置状态
      this.username = '';
      this.password = '';
      this.isLoggedIn = false;
      this.errorMessage = '';
    },
    toggleService(service) {
      this.$set(this.services, service, !this.services[service]);
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 600px; /* 增加容器宽度 */
  margin: auto;
  text-align: center; /* 文本居中 */
  background-color: #e0f7fa; /* 设置背景颜色为浅蓝色 */
  padding: 40px; /* 增加容器内边距 */
  border-radius: 10px;
}

.input-group {
  margin-bottom: 40px; /* 增加输入框之间的间距 */
}

.password-label {
  margin-top: 40px; /* 往下移动密码标签 */
  display: block; /* 将标签设置为块级元素 */
}

.password-input {
  margin-top: 10px; /* 往下移动密码输入框 */
}

input {
  width: 100%;
  height: 40px; /* 设置输入框固定高度 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box; /* 确保一致的尺寸 */
}

.login-button {
  width: 60%; /* 缩小按钮宽度 */
  padding: 10px;
  margin-top: 30px; /* 往下移按钮 */
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
  margin-top: 50px;
}

.error {
  color: red;
}

.welcome-container {
  text-align: center; /* 文本居中 */
  margin-top: 50px; /* 顶部外边距 */
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

h3 {
  cursor: pointer;
  color: #42b983;
}

p {
  margin-left: 20px;
}

.small-text {
  font-size: 0.9em; /* 设置较小的字体大小 */
}
</style>