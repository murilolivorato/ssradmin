<template>
  <div id="app">
   <div class="sidebar"  >
      <div class="sidebar-wrapper">
        <div class="row">
          <ul class="nav" >
            <li class="cat_list " >
              <router-link  :to="{ name: 'AdminHome'}" class="top" >
                <p>Home</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- main-panel -->
    <div class="main-panel">
      <router-view></router-view>
    </div>
    <!-- end main-panel -->

    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="credits ml-auto">
                                  <span class="copyright">
                                    ©2020 Admin
                                  </span>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'AdminApp'
}
</script>

<style scoped>

  div.image-profile-area {
    padding-top:30px;
    padding-bottom:20px;
    padding-left:20px;
  }

  div.image-profile-area figure{
    float:left;
  }

  div.image-profile-area div.description{
    float:left;
    width:100px;
    padding-left:20px;
  }
  div.image-profile-area div.description h4{
    color:#b9bdc6;
    font-size:19px;
  }

</style>
