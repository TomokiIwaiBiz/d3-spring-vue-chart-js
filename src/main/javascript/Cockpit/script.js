import Vue from 'vue';
import VueComponent from 'vue-class-component';

import OilMeter from '@/OilMeter';
import SpeedMeter from '@/SpeedMeter';

@VueComponent({
  /**
   * 依存コンポーネント
   */
  components: {OilMeter, SpeedMeter}
})
export default class Cockpit extends Vue {
  speed = 80;
}
