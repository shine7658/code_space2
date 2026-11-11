// ===== 在這裡新增／修改頻道資料 =====
const BOOK={title:"優質教育頻道選集",en:"Curated Learning Channels",subtitle:"跨平台 · 精選 · 自學指南",author:"第十組：徐瑞穎、劉宇崴、林建宇、林哲旭"};
const CHANNELS=[
{name:"泛科學 PanSci",platform:"YouTube",tags:["科學","台灣","綜合"],intro:"台灣最大的科學傳播平台之一，以輕鬆的方式解說科學新知、時事與生活中的科學。",why:"中文內容、貼近台灣生活，非常適合當作科學入門。",url:"https://www.youtube.com/results?search_query=泛科學"},
{name:"3Blue1Brown",platform:"YouTube",tags:["數學","視覺化","英文"],intro:"以精美的動畫講解線性代數、微積分與神經網路等數學概念，著重直覺理解。",why:"把抽象的數學變成看得見的畫面，是理解公式背後意義的最佳選擇。",url:"https://www.youtube.com/results?search_query=3Blue1Brown"},
{name:"Kurzgesagt",platform:"YouTube",tags:["科學","動畫","英文"],intro:"用獨特的插畫動畫，探討宇宙、生命、科技與人類未來等大哉問。",why:"畫面精緻、敘事流暢，看完會想繼續思考。",url:"https://www.youtube.com/results?search_query=Kurzgesagt"},
{name:"Crash Course",platform:"YouTube",tags:["綜合","學科入門","英文"],intro:"涵蓋歷史、化學、哲學、心理學等多個學科的系列入門課程，適合自學。",why:"系列完整，像是一學期的大學通識課。",url:"https://www.youtube.com/results?search_query=Crash+Course"},
{name:"李永樂老師",platform:"B站 / YouTube",tags:["科學","數學","中文"],intro:"以黑板講解的方式，說明科學原理與社會時事背後的數理邏輯。",why:"講解一步一步，邏輯清楚，像在上一堂小型家教課。",url:"https://search.bilibili.com/all?keyword=李永樂老師"},
{name:"毕导THU",platform:"B站",tags:["科學","中文","幽默"],intro:"清華背景的科普 UP 主，以幽默風格拆解生活中的偽科學與流行說法。",why:"培養批判思考，也很好笑。",url:"https://search.bilibili.com/all?keyword=毕导THU"},
{name:"TED-Ed",platform:"YouTube",tags:["綜合","動畫","英文"],intro:"短小精悍的教育動畫，主題涵蓋科學、文學、歷史與哲學。",why:"每支只有幾分鐘，很適合利用零碎時間學習。",url:"https://www.youtube.com/results?search_query=TED-Ed"},
{name:"Veritasium",platform:"YouTube",tags:["科學","物理","英文"],intro:"透過實驗與訪談，探討物理、工程與各種反直覺的科學現象。",why:"擅長從「大家以為的答案」切入，帶你看到真正的原理。",url:"https://www.youtube.com/results?search_query=Veritasium"},
{name:"Vsauce",platform:"YouTube",tags:["科學","思考","英文"],intro:"從日常小問題出發，延伸到物理、心理與哲學，培養好奇心與跳脫框架的思考。",why:"一個問題能帶你想到很遠的地方。",url:"https://www.youtube.com/results?search_query=Vsauce"},
{name:"Numberphile",platform:"YouTube",tags:["數學","英文"],intro:"邀請數學家在紙上親自演算，介紹各種有趣的數字、定理與數學故事。",why:"讓人看到數學家為什麼覺得數學有趣。",url:"https://www.youtube.com/results?search_query=Numberphile"},
{name:"Mark Rober",platform:"YouTube",tags:["工程","科學","英文"],intro:"前 NASA 工程師，用大型實驗與創意發明，把工程與科學原理變成有趣的挑戰。",why:"證明學科學與工程可以非常好玩。",url:"https://www.youtube.com/results?search_query=Mark+Rober"},
{name:"CS50 哈佛電腦科學",platform:"YouTube",tags:["程式","學科入門","英文"],intro:"哈佛大學的電腦科學入門課，從零開始教你程式設計與運算思維。",why:"完整的大學課程，免費就能學。",url:"https://www.youtube.com/results?search_query=CS50"},
{name:"freeCodeCamp",platform:"YouTube",tags:["程式","學科入門","英文"],intro:"提供長篇完整的程式教學影片，涵蓋網頁開發、資料分析與演算法等主題。",why:"想學特定技術時，通常可以找到完整的教學。",url:"https://www.youtube.com/results?search_query=freeCodeCamp"},
{name:"阿滴英文",platform:"YouTube",tags:["語言學習","台灣","中文"],intro:"以台灣學習者的角度，分享英文學習方法、生活用語與文化差異。",why:"用中文解說，生活化又好記。",url:"https://www.youtube.com/results?search_query=阿滴英文"},
{name:"志祺七七",platform:"YouTube",tags:["時事","台灣","中文"],intro:"用輕鬆的方式整理時事、社會與生活議題，幫助觀眾快速掌握重點。",why:"複雜新聞三分鐘看懂。",url:"https://www.youtube.com/results?search_query=志祺七七"},
{name:"回形針 PaperClip",platform:"B站",tags:["科學","人文","中文"],intro:"以精緻的圖像動畫，解說科學、社會與生活中的各種現象。",why:"資料紮實、畫面清楚，適合入門深度主題。",url:"https://search.bilibili.com/all?keyword=回形针PaperClip"},
{name:"罗翔说刑法",platform:"B站",tags:["法律","人文","中文"],intro:"法學教授透過生活案例講解刑法與法律思維，也探討道德與人性的問題。",why:"把法律講得生動，也教你思考「對」與「錯」。",url:"https://search.bilibili.com/all?keyword=罗翔说刑法"},
{name:"中科院物理所",platform:"B站",tags:["物理","科學","中文"],intro:"由中國科學院物理研究所經營，用淺顯的方式介紹前沿物理與科研趣聞。",why:"由研究單位直接製作，內容可信度高。",url:"https://search.bilibili.com/all?keyword=中科院物理所"},
{name:"何同学",platform:"B站",tags:["科技","工程","中文"],intro:"以創意實驗與產品體驗，探索各種科技與生活應用。",why:"從使用者角度理解科技，也能啟發做專題的靈感。",url:"https://search.bilibili.com/all?keyword=何同学"},
{name:"戴建业",platform:"B站",tags:["人文","中文"],intro:"文學教授講解古典文學與詩詞，風格風趣、口音獨特，在年輕人之間很受歡迎。",why:"讓古典文學不再枯燥。",url:"https://search.bilibili.com/all?keyword=戴建业"},
{name:"Khan Academy 可汗學院",platform:"Khan Academy",tags:["綜合","學科入門","英文"],intro:"非營利的線上學習平台，提供數學、科學、經濟等科目的課程與練習題。",why:"有練習題與學習進度，適合有系統地自學。",url:"https://www.khanacademy.org/"},
{name:"TED Talks",platform:"TED 官網",tags:["綜合","英文"],intro:"邀請各領域專家，用十幾分鐘分享具有啟發性的想法與研究。",why:"快速接觸各領域的新觀點。",url:"https://www.ted.com/talks"},
{name:"科技島讀",platform:"Podcast",tags:["科技","台灣","中文"],intro:"每集用口語方式整理科技產業與商業趨勢，適合通勤時收聽。",why:"不用看畫面，就能持續吸收科技新知。",url:"https://www.google.com/search?q=科技島讀+podcast"},
{name:"百靈果 NEWS",platform:"Podcast",tags:["時事","台灣","中文","幽默"],intro:"以輕鬆幽默的方式討論國內外時事與社會議題的 Podcast 節目。",why:"嚴肅議題也能聽得很輕鬆。",url:"https://www.google.com/search?q=百靈果NEWS+podcast"}
];
// ====================================
