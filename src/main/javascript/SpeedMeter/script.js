import _ from 'lodash';
import Vue from 'vue';
import Chart from 'chart.js';
import VueComponent from 'vue-class-component';

const MAX = 180;

@VueComponent({
  /**
   * プロパティ
   */
  props: {
    /**
     * デフォルトのスピード（時速）
     */
    defaultSpeed: {type: Number}
  },
  /**
   * 監視
   */
  watch: {
    /**
     * スピードが更新された
     */
    speed: 'onSpeedUpdated'
  }
})
export default class SpeedMeter extends Vue {
  // ======================================================
  // コンポーネントデータ(dataブロックにあたる)
  // ======================================================
  /**
   * グラフオブジェクト
   */
  graph = null;

  /**
   * スピード
   */
  speed = this.defaultSpeed ? this.defaultSpeed : 0;

  // ======================================================
  // 算出プロパティ(computedブロックにあたる)
  // ======================================================
  /**
   * スピードを分速で取得
   */
  get speedInMinutes() {
    return this.speed ? _.round(this.speed / 60, 1) : 0;
  }

  // ======================================================
  // ライフサイクルメソッド
  // ======================================================
  /**
   * インスタンスがマウントされた直後に呼ばれます。
   */
  mounted() {
    this.drawGraph();
  }

  // ======================================================
  // メソッド(methodsにあたる)
  // ======================================================
  /**
   * グラフを描画します。
   */
  drawGraph() {
    // オプション
    let option = {
      cutoutPercentage: 60,
      title: {display: false},
      legend: {display: false},
      tooltips: {enabled: false},
      rotation: Math.PI,
      circumference: Math.PI,
    };

    // パラメータ
    let parameter = {
      datasets: [{
        data: [this.speed, MAX - this.speed],
        backgroundColor: ['#FF6384', '#EEEEEE'],
        borderWidth: 0
      }]
    };

    // 描画
    this.graph = Chart.Doughnut(this.$refs.d3canvas.getContext('2d'), {
      options: option,
      data: parameter,
      plugins: [{afterDraw: this.drawSpeedLabel}]
    });
  }

  /**
   * スピードラベルを描画します。
   *
   * @param chart Chartオブジェクト
   */
  drawSpeedLabel(chart) {
    let ctx = chart.chart.ctx;

    ctx.save();

    // 文字描画の設定
    ctx.font = 'bold 48px sans-serif';
    ctx.fillStyle = '#666666';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // 描画
    let centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    let centerY = (chart.chartArea.top + chart.chartArea.bottom) * 2 / 3;
    ctx.fillText(this.speed + ' km', centerX, centerY);

    ctx.restore();
  }

  /**
   * スピードアップボタンがクリックされた際に呼び出されます。
   */
  onClickInrease() {
    if (!this.graph) {
      return;
    }

    if (this.speed >= MAX) {
      return;
    }

    this.speed += 10;
  }

  /**
   * スピードが更新された際に呼び出されます。
   */
  onSpeedUpdated() {
    this.graph.data.datasets[0].data = [this.speed, MAX - this.speed];
    this.graph.update();
  }
}
