export const mockData = {
  classes: [
    {
      id: "classA",
      name: "Class A",
      taskType: "static", // 任務類型標識
      taskLabel: "靜態任務", // 任務類型顯示文字
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
              // 新增多題模式結構
              isMultiQuestion: true, // 標記為多題模式
              currentQuestion: 1,
              totalQuestions: 5,
              questions: [
                {
                  id: 1,
                  question: "第1題：如果一個蛋糕分6塊，3人如何公平分配？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  // 新增理想圖片
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  // 新增文字說明圖
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  // 新增表現評分
                  performanceScore: 85, // 0-100分，影響表情符號顯示
                  aiPositive:
                    "兩位學生專注相近區域，明確合作分工。小明在計算上表現強勢，小美在解釋上貢獻良多。",
                  aiNegative:
                    "注意力有時重疊，溝通上需更一致。可以嘗試先討論解題策略再進行解答。",
                  teacherFeedback:
                    "小明和小美在這題展現了很好的合作精神！小明的計算能力很強，小美的解釋很清楚。下次可以嘗試用更多方法來驗證答案，比如畫圖或用實物操作。整體表現很棒，繼續保持！",
                  aiHeatmapAnalysis:
                    "熱區圖顯示學生們的共同注意力主要集中在中央區域，這裡包含了解決問題的關鍵信息。邊緣區域的注意力較少，建議教師可以引導學生更全面地關注問題的所有要素，特別是左下角的相關數據。",
                  aiTraceAnalysis:
                    "聯合視覺注意力軌跡圖顯示學生們的注意力主要集中在問題的圖像區域，顯示良好的協作模式。學生 A 的注意重點(藍色)主要在問題的左側部分，而學生 B 的注意重點(紅色)則分布在右側，這表明他們採取了有效的分工策略。",
                  comments: [
                    { user: "小明", text: "我覺得我們合作很順利！" },
                    { user: "小美", text: "下次我可以再多說一些意見。" },
                    { user: "小明", text: "我算出每人可以分到2塊蛋糕。" },
                  ],
                },
                {
                  id: 2,
                  question:
                    "第2題：一盒巧克力有24顆，4個朋友要平分，每人分到幾顆？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 92,
                  aiPositive:
                    "學生能快速理解除法概念，分工討論效率高，計算準確。",
                  aiNegative: "可以多花時間驗證答案，確保理解除法的實際意義。",
                  teacherFeedback:
                    "很好！你們很快就算出正確答案，而且還用乘法來驗證，這是很好的數學習慣。小美的計算很準確，小明的驗證想法很棒。建議可以多想想這種除法在生活中還有什麼應用。",
                  aiHeatmapAnalysis:
                    "熱區分析顯示學生對數字區域關注度高，能夠有效識別關鍵數學信息。",
                  aiTraceAnalysis:
                    "軌跡圖顯示學生採用系統性解題方法，從問題理解到計算執行都有清晰脈絡。",
                  comments: [
                    { user: "小美", text: "24÷4=6，每人6顆！" },
                    { user: "小明", text: "我們可以用乘法驗證：6×4=24。" },
                  ],
                },
                {
                  id: 3,
                  question:
                    "第3題：媽媽買了18個蘋果，要放進每個袋子裝6個蘋果的袋子裡，需要幾個袋子？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 78,
                  aiPositive:
                    "學生理解實際應用情境，能將抽象數學概念與生活連結。",
                  aiNegative:
                    "對於「裝袋」概念的理解可以更深入，建議用實物演示。",
                  teacherFeedback:
                    "我很高興看到你們能把數學和實際生活連結起來！小明的計算正確，小美想到要畫圖驗證很聰明。下次遇到這種情境題時，可以先想像實際操作的過程，這樣更容易理解。",
                  aiHeatmapAnalysis:
                    "熱區分析顯示學生關注問題中的數量關係，顯示良好的數學思維模式。",
                  aiTraceAnalysis:
                    "軌跡分析顯示學生能夠識別關鍵信息，但在情境理解上還有提升空間。",
                  comments: [
                    { user: "小明", text: "18÷6=3，需要3個袋子。" },
                    { user: "小美", text: "我畫圖來驗證一下。" },
                  ],
                },
                {
                  id: 4,
                  question:
                    "第4題：學校圖書館有72本書，要平均分給9個班級，每個班級分到幾本書？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 88,
                  aiPositive:
                    "學生能處理較大數字的除法運算，展現數學運算能力的進步。",
                  aiNegative: "計算過程可以更仔細，避免粗心錯誤。",
                  teacherFeedback:
                    "處理大數字的除法你們做得很好！小美計算準確，小明用乘法表檢驗的方法很棒。這顯示你們的數學基礎很扎實。繼續練習，你們一定會越來越厲害！",
                  aiHeatmapAnalysis:
                    "熱區分析顯示學生對大數字運算保持專注，數學信心有所提升。",
                  aiTraceAnalysis:
                    "軌跡分析顯示學生採用多種解題策略，展現靈活的數學思維。",
                  comments: [
                    { user: "小美", text: "72÷9=8，每個班級8本書。" },
                    {
                      user: "小明",
                      text: "我用九九乘法表檢查：9×8=72，對了！",
                    },
                  ],
                },
                {
                  id: 5,
                  question:
                    "第5題：一條繩子長15公尺，要剪成每段3公尺的小段，可以剪成幾段？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 75,
                  aiPositive:
                    "學生能理解測量與除法的關係，具備良好的空間數學概念。",
                  aiNegative:
                    "對於「剪成段數」的概念理解可以更精確，建議實際操作體驗。",
                  teacherFeedback:
                    "你們能理解測量和除法的關係很棒！想到畫線段圖來確認答案更是聰明的做法。建議下次可以實際用繩子或紙條來操作看看，這樣會更有趣也更容易記住概念。",
                  aiHeatmapAnalysis:
                    "熱區分析顯示學生關注長度單位和數量關係，展現數學應用能力。",
                  aiTraceAnalysis:
                    "軌跡分析顯示學生能夠將抽象數學概念與實際測量情境結合。",
                  comments: [
                    { user: "小明", text: "15÷3=5，可以剪成5段。" },
                    { user: "小美", text: "我們可以畫線段圖來確認。" },
                  ],
                },
              ],
              parentSummary:
                "孩子這週在數學除法概念上表現出色，與組員配合順暢，解題思路清晰。",
            },
            {
              id: 2,
              question: "設計一個節省用水的方法，並說明原理。",
              heatmapImage:
                "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
              traceImage: "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
              idealHeatmapImage:
                "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
              idealTraceImage:
                "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
              explanationImage:
                "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
              performanceScore: 82,
              aiPositive:
                "小組成員專注在問題的不同部分，形成了良好的分工。創意思考和實際應用相結合。",
              aiNegative:
                "可以加強在科學原理說明上的合作，有些概念需要更清晰的解釋。",
              teacherFeedback:
                "你們的創意想法很棒！能想到雨水收集系統很有環保意識。小明的設計圖畫得很清楚，小美的想法很有創意。下次可以再詳細解釋一下水循環的科學原理，這樣你們的方案會更完整。",
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
              // 為 Group 2 也添加多題模式
              isMultiQuestion: true,
              currentQuestion: 1,
              totalQuestions: 5,
              questions: [
                {
                  id: 1,
                  question: "第1題：如果一個蛋糕分6塊，3人如何公平分配？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 65,
                  aiPositive: "小組討論熱烈，提出了多種分配方案。",
                  aiNegative:
                    "需要更好地聚焦於最終解決方案，有時討論偏離主題。",
                  teacherFeedback:
                    "小華和小強討論很積極！雖然你們提出了很多想法，但記得要聚焦在最重要的解決方法上。每人分2塊的答案是對的，下次可以先算出答案，再討論其他可能性。",
                  aiHeatmapAnalysis:
                    "熱區分析顯示小華與小強的注意力分散在多個區域，缺乏集中討論的焦點。建議引導學生更有條理地進行問題解析。",
                  aiTraceAnalysis:
                    "軌跡分析顯示小華與小強傾向於關注相同區域，協作模式較為重疊。建議鼓勵學生嘗試分工合作模式，提高解題效率。",
                  comments: [
                    { user: "小華", text: "我覺得可以每人分2塊。" },
                    { user: "小強", text: "但如果蛋糕大小不一樣呢？" },
                  ],
                },
                {
                  id: 2,
                  question:
                    "第2題：一盒巧克力有24顆，4個朋友要平分，每人分到幾顆？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 58,
                  aiPositive: "學生討論積極，嘗試不同解題方法。",
                  aiNegative: "計算準確度需要提升，建議多次檢驗答案。",
                  teacherFeedback:
                    "很好，小強算出正確答案了！小華提議再算一次確認是很好的習慣。計算時要細心一點，可以用不同方法來驗證答案的正確性。",
                  aiHeatmapAnalysis: "熱區分析顯示學生對數字的關注度不夠集中。",
                  aiTraceAnalysis:
                    "軌跡分析顯示討論缺乏系統性，需要更有組織的解題方式。",
                  comments: [
                    { user: "小強", text: "24除以4等於6。" },
                    { user: "小華", text: "我們再算一次確認。" },
                  ],
                },
                // 繼續添加更多題目...
                {
                  id: 3,
                  question:
                    "第3題：媽媽買了18個蘋果，要放進每個袋子裝6個蘋果的袋子裡，需要幾個袋子？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 72,
                  aiPositive: "學生能理解情境題的實際應用。",
                  aiNegative: "需要加強對除法概念的深入理解。",
                  teacherFeedback: "你們對這種生活應用題的理解不錯！繼續加油。",
                  aiHeatmapAnalysis: "熱區分析顯示學生注意力較為分散。",
                  aiTraceAnalysis: "軌跡分析顯示需要更系統化的解題思路。",
                  comments: [
                    { user: "小華", text: "需要3個袋子。" },
                    { user: "小強", text: "18÷6=3。" },
                  ],
                },
                {
                  id: 4,
                  question:
                    "第4題：學校圖書館有72本書，要平均分給9個班級，每個班級分到幾本書？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 69,
                  aiPositive: "學生能處理較大數字的計算。",
                  aiNegative: "計算過程需要更加仔細。",
                  teacherFeedback: "大數字除法處理得不錯，繼續練習會更熟練。",
                  aiHeatmapAnalysis: "熱區分析顯示學生對數字區域關注較好。",
                  aiTraceAnalysis: "軌跡分析顯示解題思路逐漸改善。",
                  comments: [
                    { user: "小強", text: "72÷9=8。" },
                    { user: "小華", text: "每個班級8本書。" },
                  ],
                },
                {
                  id: 5,
                  question:
                    "第5題：一條繩子長15公尺，要剪成每段3公尺的小段，可以剪成幾段？",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 63,
                  aiPositive: "學生理解測量概念。",
                  aiNegative: "需要加強對實際操作的想像。",
                  teacherFeedback:
                    "測量和除法的結合理解得還不錯，可以更深入思考。",
                  aiHeatmapAnalysis: "熱區分析顯示學生關注重點合理。",
                  aiTraceAnalysis: "軌跡分析顯示解題能力在進步中。",
                  comments: [
                    { user: "小華", text: "15÷3=5段。" },
                    { user: "小強", text: "對，可以剪成5段。" },
                  ],
                },
              ],
              parentSummary: "孩子參與度高，但需要提高解題效率和準確度。",
            },
          ],
        },
      ],
    },
    {
      id: "classB",
      name: "Class B",
      taskType: "dynamic", // 任務類型標識
      taskLabel: "動態任務", // 任務類型顯示文字
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
              // 新的動態任務結構
              isDynamicTask: true, // 標記為動態任務
              taskTitle: "智能機器人組裝與程式設計",
              currentStep: 1,
              totalSteps: 5,
              steps: [
                {
                  id: 1,
                  title: "機器人基礎組裝",
                  question:
                    "請協作組裝一個基礎移動機器人，包含主體結構、輪子和感測器。討論每個零件的功能並合理分工組裝。",
                  description:
                    "學習機器人的基本構造，了解各個組件的功能，培養動手能力和團隊協作精神。",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 90,
                  teacherFeedback:
                    "大明和大華在機器人組裝上分工很好！大明負責主體結構很細心，大華安裝感測器很專業。你們的團隊合作讓我印象深刻。下次可以互相教導對方自己負責的部分，這樣兩人都能學會完整的組裝技巧。",
                  aiHeatmapAnalysis:
                    "熱區分析顯示學生在機器人組裝過程中注意力主要集中在組件連接部位，大明較專注於結構組裝，大華則關注感測器安裝。",
                  aiTraceAnalysis:
                    "軌跡分析顯示兩位學生形成了良好的協作模式，大明負責主體組裝，大華負責細節調整，展現出有效的分工合作。",
                  isCompleted: true,
                  comments: [
                    { user: "大明", text: "我負責組裝主體結構。" },
                    { user: "大華", text: "我來安裝感測器和輪子。" },
                    { user: "大明", text: "我們需要確保連接穩固。" },
                  ],
                },
                {
                  id: 2,
                  title: "電路連接與測試",
                  question:
                    "為機器人連接電路系統，包括電池、馬達驅動和感測器線路。測試各個組件是否正常運作。",
                  description:
                    "學習基礎電路知識，了解電流路徑，培養邏輯思維和問題解決能力。",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 75,
                  teacherFeedback:
                    "看到你們認真研究電路圖很開心！正負極的概念你們掌握得很好。建議在連接電路前可以先畫出連接計畫，這樣可以避免錯誤，也能加深對電路的理解。安全第一，做得很好！",
                  aiHeatmapAnalysis:
                    "電路連接階段的熱區分析顯示學生專注於線路圖和實際連接點，顯示出良好的理論與實務結合能力。",
                  aiTraceAnalysis:
                    "軌跡分析顯示學生能夠有條理地進行電路連接，從理論規劃到實際操作展現系統性思維。",
                  isCompleted: false,
                  comments: [
                    { user: "大華", text: "我們先看一下電路圖。" },
                    { user: "大明", text: "紅線是正極，黑線是負極。" },
                  ],
                },
                {
                  id: 3,
                  title: "程式設計與邏輯",
                  question:
                    "使用圖形化程式設計工具為機器人編寫基礎移動程式，包括前進、後退、轉彎等動作。",
                  description:
                    "學習程式設計基礎概念，培養邏輯思維和抽象思考能力。",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 68,
                  teacherFeedback:
                    "程式設計的邏輯思維你們展現得不錯！圖形化編程讓複雜的概念變得容易理解。建議多嘗試不同的程式組合，看看機器人會有什麼不同的行為。記住，程式設計需要耐心和細心。",
                  aiHeatmapAnalysis:
                    "程式設計階段熱區顯示學生對邏輯流程圖的關注度高，能夠理解順序、判斷和循環的概念。",
                  aiTraceAnalysis:
                    "軌跡分析顯示學生在程式設計時展現出良好的邏輯思維，能夠將複雜問題分解為簡單步驟。",
                  isCompleted: false,
                  comments: [],
                },
                {
                  id: 4,
                  title: "功能測試與調整",
                  question:
                    "測試機器人的各項功能，根據測試結果調整程式和硬體，確保機器人能夠完成指定任務。",
                  description:
                    "學習測試與除錯方法，培養細心觀察和持續改進的能力。",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 55,
                  teacherFeedback:
                    "測試和調整是很重要的學習過程！雖然遇到一些困難，但你們沒有放棄，這種精神很值得讚賞。每次失敗都是學習的機會，要記錄下問題和解決方法，這樣下次就能更快找到答案。",
                  aiHeatmapAnalysis:
                    "測試階段的熱區分析顯示學生能夠系統性地檢查各個功能模組，具備良好的問題排除能力。",
                  aiTraceAnalysis:
                    "軌跡分析顯示學生在測試過程中展現出耐心和細心，能夠發現問題並提出改進方案。",
                  isCompleted: false,
                  comments: [],
                },
                {
                  id: 5,
                  title: "任務挑戰與展示",
                  question:
                    "讓機器人完成綜合挑戰任務：避障前進、物品搬運或循線行走。準備展示並解釋機器人的工作原理。",
                  description:
                    "整合所學知識，展現創造力和表達能力，體驗成功的成就感。",
                  heatmapImage:
                    "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg",
                  traceImage:
                    "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg",
                  idealHeatmapImage:
                    "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg",
                  idealTraceImage:
                    "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg",
                  explanationImage:
                    "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg",
                  performanceScore: 85,
                  teacherFeedback:
                    "最終展示很精彩！你們不但完成了技術挑戰，表達和解釋也很清楚。從組裝到程式設計，再到最後的展示，你們展現了完整的學習歷程。這個機器人項目讓你們學會了很多重要的技能。",
                  aiHeatmapAnalysis:
                    "最終挑戰階段熱區顯示學生能夠綜合運用所學知識，展現出創新思維和問題解決能力。",
                  aiTraceAnalysis:
                    "軌跡分析顯示學生在挑戰任務中展現出自信和創造力，能夠獨立思考並提出創新解決方案。",
                  isCompleted: false,
                  comments: [],
                },
              ],
              parentSummary:
                "孩子在機器人組裝項目中表現出色，動手能力和邏輯思維都有顯著提升。",
            },
          ],
        },
      ],
    },
  ],
};
