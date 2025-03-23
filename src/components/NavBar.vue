<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand" @click="router.push('/')">
      <img src="../assets/images/logo.svg" alt="溯古启智" class="logo">
      <span class="brand-text">溯古·启智</span>
    </div>

    <div class="nav-links" :class="{ 'show': showMenu }">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/favorites" class="nav-link">收藏夹</router-link>
      <router-link to="/about" class="nav-link">关于展馆</router-link>
    </div>

    <button class="menu-toggle" @click="toggleMenu">
      <span class="menu-icon"></span>
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-brand {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 10px;
  font-weight: bold;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.nav-links {
  margin-left: auto;
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #666;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #2196F3;
  background: rgba(33, 150, 243, 0.1);
}

.menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    transform: translateY(-100%);
    transition: transform 0.3s;
  }

  .nav-links.show {
    transform: translateY(0);
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }

  .menu-icon {
    display: block;
    width: 25px;
    height: 2px;
    background: #333;
    position: relative;
  }

  .menu-icon::before,
  .menu-icon::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: #333;
    transition: all 0.3s;
  }

  .menu-icon::before {
    top: -8px;
  }

  .menu-icon::after {
    bottom: -8px;
  }
}
</style> 