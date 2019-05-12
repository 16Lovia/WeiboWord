<template>
  <div>
  <div :class="['post-view', selected ? 'post-view--active' : '' , ready ? 'post-view--ready' : '' ]">
    <div class="post-view__image" :style="'background-image:url('+postImage+');clip-path:'+clipPath">
    </div>
    <div class="post-view__container" v-if="selected">
      <div class="post-controls">
        <div class="post-control post-control--close" @click="closePost()"><i class="el-icon-close"></i></div>
        <div class="post-control" id="next-post" @click="nextPost()"><i class="el-icon-arrow-right"></i></div>
        <div class="post-control" id="prev-post" @click="prevPost()"><i class="el-icon-arrow-left"></i></div>
      </div>
      <h2 class="post-view__title">{{currentPost.title}}</h2>
      <h3 class="post-view__date">{{currentPost.date}}</h3>
      <div class="post-view__content" v-html="currentPost.description"></div>
    </div>
  </div>
  <div :class="['post-list', selected ? 'post-list--hide' : '']">
    <div class="post" v-for="(item, index) in posts" :key="(item, index)" v-on:mouseenter="changePost(index)" @click="selectedPost(index)">
      <h2 class="post__title">{{item.title}} <span class="post__date">{{item.date}}</span></h2>
    </div>
  </div>
</div>
</template>

<script>
const posts = [
  {
    id: 1,
    title: "风住尘香花已尽（上）",
    date: "2019/3/9",
    description:
      "<p>“生当为人杰，死亦为鬼雄，至今思项羽，不肯过江东。”应当是一个女人对英雄的倾慕，一个时代对英雄的需要吧。说时势也乱透。恍惚又是秦末，狼烟四起，天下起干戈。却再无一个西楚霸王出来，扫平天下。七十二路诸侯，膝行而前，莫敢仰视。然而天下，或者李清照这样的香草美人，都需要这样的男人来拥有和保护。那时北宋灭亡，宋室南渡。赵构在临安建都，改年号为“建炎”。但南宋倾危，纵然偏安一隅退缩江南，也改变不了大金铁骑铮铮而下兵临城下的局面。可是也有人觉得靖康之耻已成旧事，往事不堪回首。明日这一颗好头颅还不知是谁割将去呢？不如，今朝有酒今朝醉，明日愁来明日愁。于是便有了“山外青山楼外楼，西湖歌舞几时休？暖风熏得游人醉，直把杭州作汴州。”林升在《题临安邸》中描绘的浮靡景象。这是我小时候背的古诗，现在仍记得清明。我外公怕我不理解（诗不理解则不能体会它的好处，当然就记不住），他是一力反对死背的，就告诉我说，那时候赵匡胤辛苦建立的北宋已经覆亡了，他的子孙把国都迁到临安，今天的杭州。他们只拥有半壁江山了，可依然不想着抵御外族侵略，不知道重用忠臣良将，一味醉生梦死，歌舞升平……到最后，南宋也亡了。外公说，杭州是个花柳缠绵地，人间富贵乡，人间的天堂，让人沉迷。可是那时候，不是沉迷的时候。</p>",
    image:"http://image.hnol.net/c/2015-05/11/20/201505112004354716-2282561.jpg",
    clip_path: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
  },
  {
    id: 2,
    title: "风住尘香花已尽（下）",
    date: "2019/3/9",
    description:
    "<p>寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时节，最难将息。三杯两盏淡酒，怎敌他，晚来风急。雁过也，正伤心，却是旧时相识。 满地黄花堆积，憔悴损，如今有谁堪摘？守着窗儿，独自怎生得黑。梧桐更兼细雨，到黄昏，点点滴滴。这次第，怎一个愁字了得！我不服。难道就是为了让易安词再添一点沉郁雄浑之气，添一点忧时忧民的慨伤，就一定要这个女人，随着小朝廷南渡，在人世间颠沛流离，孤独终老？如果是真的，那老天真是残酷。她熬住了。虽然，丈夫故去，亲人离散；虽然，国破山河破，凝眸处，从今又添一段新愁，她毕竟是熬住了。而且，任是自身这样潦倒，仍念念不忘国恨。别人元宵佳节赏灯时，她一面怀念追忆昔日的风光，一面又不由得因这末世里的繁华而大起悲意。因这浮华实在是人们沉溺不醒的明证。她写下《永遇乐?元宵》。一个女子，静夜沉吟，忧国忧民之思比男子还深切三分。原来，是为了看她会不会被尘世的惊涛骇浪湮灭，家破人亡的哀痛会不会将她摧毁；浮生浮世，她最后会不会拔节而出。毕竟上下千年的岁月，这样出色的女文人，除了易安，再没有第二个了。英雄美人，原也是想着迎合时代的，只是迎合不上，必要饱经忧患。原来，需等到风住尘香花已尽，才可以看到最后的风清月朗，花好月圆。浮花浪蕊的人生，哪那么容易就断了呢？</p>",
    image: "https://tse2.mm.bing.net/th?id=OIP.pjDeHpjIYx82z6iKjz0sVAHaEn&pid=Api",
    clip_path: "polygon(31% 23%, 90% 30%, 50% 100%, 0% 50%)"
  },
  {
    id: 3,
    title: "奈何离别多",
    date: "2019/3/8",
    description:'',
    image: "http://pic.90sjimg.com/back_pic/00/04/20/33/7649805be640e4d89608e85aee28f895.jpg",
    clip_path: "polygon(0 29%, 100% 0, 100% 70%, 48% 100%)"
  },
  {
    id: 4,
    title: "半生颠簸，红颜命薄",
    date: "2019/3/8",
    description:'',
    image: "http://pkimg.b0.upaiyun.com/upload/20130731/0f3f836029a9633765c2ed836a63d606.JPG",
    clip_path: "polygon(24% 0, 90% 30%, 79% 78%, 13% 76%)"
  },
];
export default {
  data() {
    return {
      test: "",
      posts: posts,
      selectedClipPath: "polygon(0 100%, 0 0, 100% 0, 100% 100%)",
      postImage: posts[0].image,
      currentPost: null,
      postIndex: 0,
      selected: false,
      ready: false,
      lastSelectedPost: null,
      clipPath: posts[0].clip_path
    };
  },
  methods: {
    changePost(index) {
      if (this.postImage != this.posts[index].image && this.selected == false) {
        this.postImage = this.posts[index].image;
        this.clipPath = this.posts[index].clip_path;
      }
    },
    closePost() {
      if (this.lastSelectedPost != null) {
        this.selected = false;
        this.ready = false;
        this.clipPath = this.posts[this.lastSelectedPost].clip_path;
      }
    },
    selectedPost(index) {
      this.selected = true;
      this.clipPath = this.selectedClipPath;
      this.lastSelectedPost = index;
      this.currentPost = this.posts[index];
      setTimeout(() => {
        this.ready = true;
      }, 600);
    },
    nextPost() {
      if (this.lastSelectedPost < this.posts.length - 1) {
        this.lastSelectedPost++;
        this.ready = false;
        setTimeout(() => {
          this.currentPost = this.posts[this.lastSelectedPost];
          this.postImage = this.currentPost.image;
          this.ready = true;
        }, 600);
      }
    },
    prevPost() {
      if (
        this.lastSelectedPost <= this.posts.length - 1 &&
        this.lastSelectedPost != 0
      ) {
        this.lastSelectedPost--;
        this.ready = false;
        setTimeout(() => {
          this.currentPost = this.posts[this.lastSelectedPost];
          this.postImage = this.currentPost.image;
          this.ready = true;
        }, 600);
      }
    }
  },
  created() {
    window.addEventListener("keydown", e => {
      e.keyCode == 39 ? this.nextPost() : false;
      e.keyCode == 37 ? this.prevPost() : false;
      e.keyCode == 27 ? this.closePost() : false;
    });
  }}
</script>

<style lang="scss">
$heading-font: 'Nunito',
sans-serif;
$body-font: 'Inconsolata',
monospace;
$color: #bf9e94;
* {
  box-sizing: border-box;
}

body {
  font-family: $body-font;
}

.post {
  cursor: pointer;
  margin-bottom: 50px;
  text-align: center;
  padding: 0 40px;
  &__date {
    display: block;
    width: 100%;
    font-family: $body-font;
    font-size: .5em;
    margin-top: 30px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: normal;
  }
  &__title {
    font-family: $heading-font;
    font-size: 2em;
    padding: 12px 30px;
    font-weight: bold;
    position: relative;
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0;
      z-index: -1;
      transition: width .3s ease 0s;
      content: "";
      background: $color;
      transform: skew(-20deg);
    }
    &:hover:after {
      width: 100%;
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
}

.post-list {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 30px 0;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all .3s ease 0s;
  transform: translateY(0px);
  visibility: visible;
  &--hide {
    transform: translateY(-20px);
    opacity: 0;
    visibility: hidden;
  }
}

.post-view {
  transition: .3s ease 0s;
  width: 100%;
  min-height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &__date {
    font-family: $body-font;
    margin-bottom: -10px;
    transform: translateY(45px);
    transition: transform .3s ease 0s;
  }
  &__image {
    position: fixed;
    transition: all .5s ease 0s;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    width: 800px;
    background-size: cover;
    background-position: top;
    overflow: hidden;
    height: 450px;
    top: 50%;
    margin-top: -225px;
  }
  &__container {
    position: absolute;
    top: 100px;
    width: 100%;
    max-width: 900px;
    z-index: 99;
    opacity: 0;
    transition: all .3s ease 0s;
  }
  &__content {
    background-image: url('/img/xinzhi.jpg');
    padding: 40px;
    margin-bottom: 80px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, .1);
    transform: translateY(85px);
    transition: transform .3s ease 0s;
    p {
      font-size: 1.125em;
      margin-bottom: 30px;
      line-height: 25px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &--active {
    .post-view__image {
      background-position: top;
      transition: all .6s ease 0s;
      width: 100%;
      height: 520px;
      margin-top: 0;
      top: 0;
    }
  }
  &__title {
    font-size: 2.875em;
    font-weight: bold;
    font-family: $heading-font;
    margin: -35px 0 50px 0;
    transform: translateY(45px) scaleY(0);
    transition: transform .3s ease-out 0s;
  }
  &--ready {
    .post-view {
      &__container {
        opacity: 1;
      }
      &__date,
      &__content {
        transform: translateY(0px)
      }
      &__title {
        transform: translateY(0px) scaleY(1)
      }
    }
  }
}

.post-controls {
  position: fixed;
  right: 20px;
  flex-direction: column;
  top: 20px;
  display: flex;
}

.post-control {
  cursor: pointer;
  font-size: 1.375em;
  background: $color;
  margin-bottom: 15px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 43px;
  transition: all .3s ease 0s;
  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, .1);
  }
  &--close {
    font-size: 2em;
    background: rgba(#000, .3);
    color: #fff;
    &:hover {
      background: #000;
    }
  }
}

@media only screen and (max-width: 991px) {
  html {
    font-size: 13px;
  }
  .post-controls {
    bottom: 10px;
    z-index: 99;
    top: auto;
    background: rgba(#000, .7);
    padding: 0 5px;
    justify-content: center;
    margin: auto;
    border-radius: 30px;
    height: 55px;
    align-items: center;
    flex-direction: row-reverse;
  }
  .post-control {
    margin: 0 5px;
    &--close {
      background: #000;
    }
  }
  .post-view__container {
    padding: 0 30px;
  }
}

.logo {
  cursor: pointer;
  position: fixed;
  left: 30px;
  top: 30px;
  z-index: 9;
  width: 50px;
  height: 50px;
  transition: .3s ease 0s;
  &--absolute {
    position: absolute;
    svg {
      fill: $color;
    }
  }
  &--active {
    svg {
      fill: #fff;
    }
  }
  svg {
    width: 100%;
    transition: all .3s ease 0s;
  }
}
</style>

