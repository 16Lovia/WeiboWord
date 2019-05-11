<template>
<transition name="person-show">
    <li v-if="show" class="person" :id="caption" :class="{'person-expanded' : expanded, 'person-hover' : hover}">
        <div class="person-content">
        <transition name="fade">
            <div class="person-caption" v-if="!expanded">
            <h2>{{ caption }}</h2>
            </div>
        </transition>
        
        <transition name="fade">
            <div class="content" v-if="expanded">
            <div class="person-title">
                <h1 >{{ person.firstname }} {{ person.lastname }}</h1>
                <h2>{{ person.alias }}</h2>
                <p>{{ person.bio }}</p>
                <p v-if="person.bioextended">{{ person.bioextended }}</p>
            </div>
            
            </div>
        </transition>
        
            <a href="#"
                v-if="expanded"
                @click.prevent="expand(person)">X Close</a>
        
        <a href="#"
            v-if="!expanded"
            @click.prevent="expand(person)"
            @mouseenter="hoverPerson(person)"
            @mouseleave="hoverPerson(person)" v-bind="{'title' : 'More about ' + caption }"></a>
        </div>
        
        <svg preserveAspectRatio="xMinYMin" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 618 560" class="image">
        <defs>
            <mask :id="caption + '-mask'">
            <image width="618" height="560" v-bind="{'xlink:href' : person.mask}"></image>
            </mask>
        </defs>
        
        <image width="618" height="560" v-bind="{'mask' : 'url(#' + caption + '-mask)', 'xlink:href' : person.image}"></image>
        </svg>
    </li>
</transition>
</template>

<script>
import EventBus from './bus';
export default {
  props: ['person'],
  data() {
    return {
      show: true,
      expanded: false,
      hover: false
    }
  },
  computed: {
    caption() {
      if (this.person.lastname) {
        return this.person.lastname
      } else {
        return this.person.firstname
      }
    }
  },
  methods: {
    hoverPerson() {
      this.hover = !this.hover;
    },
    expand() {
      this.expanded = !this.expanded;

      if (this.expanded) {
        EventBus.$emit('item-expanded')
      } else {
        EventBus.$emit('item-collapsed')
      }
    }
  },
  created() {
    EventBus.$on('item-expanded', () => {
      if (!this.expanded) {
        this.show = false;
      }
    });
    EventBus.$on('item-collapsed', () => {
      this.show = true;
    });
  }
}
</script>