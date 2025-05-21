export const mockData = {
  classes: [
    {
      id: "classA",
      name: "Class A",
      groups: [
        {
          id: "group1",
          name: "Group 1",
          students: ["小明", "小美"],
          progress: 75,
          commentCount: 6,
          weeks: [
            {
              id: 1,
              question: "如果一個蛋糕分6塊，3人如何公平分配？",
              heatmapImage:
                "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
              traceImage: "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
              aiPositive:
                "兩位學生專注相近區域，明確合作分工。小明在計算上表現強勢，小美在解釋上貢獻良多。",
              aiNegative:
                "注意力有時重疊，溝通上需更一致。可以嘗試先討論解題策略再進行解答。",
              aiHeatmapAnalysis:
                "熱區圖顯示學生們的共同注意力主要集中在中央區域，這裡包含了解決問題的關鍵信息。邊緣區域的注意力較少，建議教師可以引導學生更全面地關注問題的所有要素，特別是左下角的相關數據。",
              aiTraceAnalysis:
                "聯合視覺注意力軌跡圖顯示學生們的注意力主要集中在問題的圖像區域，顯示良好的協作模式。學生 A 的注意重點(藍色)主要在問題的左側部分，而學生 B 的注意重點(紅色)則分布在右側，這表明他們採取了有效的分工策略。",
              parentSummary:
                "孩子這週專注度高，與組員配合順暢，在分數計算方面表現出色。",
              comments: [
                { user: "小明", text: "我覺得我們合作很順利！" },
                { user: "小美", text: "下次我可以再多說一些意見。" },
                { user: "小明", text: "我算出每人可以分到2塊蛋糕。" },
              ],
            },
            {
              id: 2,
              question: "設計一個節省用水的方法，並說明原理。",
              heatmapImage:
                "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
              traceImage: "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
              aiPositive:
                "小組成員專注在問題的不同部分，形成了良好的分工。創意思考和實際應用相結合。",
              aiNegative:
                "可以加強在科學原理說明上的合作，有些概念需要更清晰的解釋。",
              aiHeatmapAnalysis:
                "熱區圖分析顯示在節省用水方案討論中，學生主要關注實際應用方面，對於基礎原理部分注意力不足。建議在教學中強化科學原理與應用之間的連接。",
              aiTraceAnalysis:
                "軌跡圖顯示兩位學生的討論模式呈互補型，完成了從問題理解到方案設計的完整過程。小美較專注於創意發想，小明則側重於技術細節，形成良好協作。",
              parentSummary:
                "孩子在創意思考方面表現突出，但需要加強科學概念的理解和表達。",
              comments: [
                { user: "小美", text: "我想到用雨水收集系統！" },
                { user: "小明", text: "我可以畫出設計圖。" },
                { user: "小美", text: "我們還需要解釋水循環原理。" },
              ],
            },
          ],
        },
        {
          id: "group2",
          name: "Group 2",
          students: ["小華", "小強"],
          progress: 60,
          commentCount: 4,
          weeks: [
            {
              id: 1,
              question: "如果一個蛋糕分6塊，3人如何公平分配？",
              heatmapImage:
                "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
              traceImage: "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
              aiPositive: "小組討論熱烈，提出了多種分配方案。",
              aiNegative: "需要更好地聚焦於最終解決方案，有時討論偏離主題。",
              aiHeatmapAnalysis:
                "熱區分析顯示小華與小強的注意力分散在多個區域，缺乏集中討論的焦點。建議引導學生更有條理地進行問題解析。",
              aiTraceAnalysis:
                "軌跡分析顯示小華與小強傾向於關注相同區域，協作模式較為重疊。建議鼓勵學生嘗試分工合作模式，提高解題效率。",
              parentSummary: "孩子參與度高，但需要提高解題效率。",
              comments: [
                { user: "小華", text: "我覺得可以每人分2塊。" },
                { user: "小強", text: "但如果蛋糕大小不一樣呢？" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "classB",
      name: "Class B",
      groups: [
        {
          id: "group1",
          name: "Group 1",
          students: ["大明", "大華"],
          progress: 85,
          commentCount: 7,
          weeks: [
            {
              id: 1,
              question: "如果一個蛋糕分6塊，3人如何公平分配？",
              heatmapImage:
                "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
              traceImage: "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
              aiPositive: "合作默契良好，解題思路清晰。",
              aiNegative: "可以嘗試探索更多元的解決方案。",
              aiHeatmapAnalysis:
                "熱區分析顯示大明和大華的合作專注度高，關注點集中在核心問題區域，解題路徑明確。",
              aiTraceAnalysis:
                "軌跡分析顯示兩位學生的視覺注意方式非常協調，呈現高效的協作模式。能夠在關鍵點上達成共識，同時也有各自負責的部分。",
              parentSummary: "孩子表現出色，邏輯思維能力強。",
              comments: [
                { user: "大明", text: "我覺得每人2塊是最公平的。" },
                { user: "大華", text: "同意，這樣分配最簡單。" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
