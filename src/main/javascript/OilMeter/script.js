import Vue from 'vue';
import Chart from 'chart.js';

const MAX = 40;

export default Vue.extend({
  name: 'OilMeter',
  // ======================================================
  // プロパティ
  // ======================================================
  props: {
    /**
     * デフォルトの残量（リットル）
     */
    defaultAmount: Number
  },
  // ======================================================
  // 監視
  // ======================================================
  watch: {
    amount: 'onAmountUpdated'
  },
  // ======================================================
  // コンポーネントデータ
  // ======================================================
  data () {
    return {
      graph: null,
      amount: this.defaultAmount ? this.defaultAmount : 0
    }
  },
  // ======================================================
  // 算出プロパティ
  // ======================================================
  computed: {
    /**
     * 残量をミリリットルで取得
     */
    amountInMilli() {
      return this.amount ? this.amount * 1000 : 0;
    }
  },
  // ======================================================
  // ライフサイクルメソッド
  // ======================================================
  /**
   * インスタンスがマウントされた直後に呼ばれます。
   */
  mounted () {
    this.drawGraph();
  },
  // ======================================================
  // メソッド
  // ======================================================
  methods: {
    /**
     * グラフを描画します。
     */
    drawGraph() {
      // オプション
      let option = {
        elements: {arc: {borderWidth: 0}},
        title: {display: false},
        legend: {display: false},
        tooltips: {enabled: false},
        scales: {
          yAxes: [{display: true, ticks: {beginAtZero: true, stepValue: 5, max: 40}}]
        }
      };

      // パラメータ
      let parameter = {
        labels: ['残量'],
        datasets: [{
          data: [this.amount],
          backgroundColor: ['#388e3c'],
          borderWidth: 0
        }]
      };

      // 描画
      this.graph = Chart.Bar(this.$refs.d3canvas.getContext('2d'), {
        options: option,
        data: parameter
      });
    },
    /**
     * 給油ボタンがクリックされた際に呼び出されます。
     */
    onClickInrease() {
      if (!this.graph) {
        return;
      }

      if (this.amount >= MAX) {
        return;
      }

      this.amount += 5;
    },
    /**
     * 残量が更新された際に呼び出されます。
     */
    onAmountUpdated() {
      this.graph.data.datasets[0].data = [this.amount];
      this.graph.update();
    }
  }
})
