/**
 * coursesData.js
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 大G羽毛球（哔哩哔哩 UID: 1423436652）初学者课程数据
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 📌 架构说明：
 *   此文件为静态数据层，提供与 UI 完全解耦的统一 Fetch 接口。
 *   后期可直接替换为 Supabase SDK 查询，无需改动任何 UI 组件。
 *
 * 📺 频道主页：https://space.bilibili.com/1423436652
 * ⚠️  注意：videoUrl 中的 BV 号需从 B 站频道页面核实，已按课程类型预填标记
 */

// ─── 频道信息 ──────────────────────────────────────────────────────────────

export const CHANNEL_INFO = {
  name:    '大G羽毛球',
  uid:     '1423436652',
  homeUrl: 'https://space.bilibili.com/1423436652',
  desc:    '专业羽毛球教学频道，系统讲解从入门到进阶的完整技术体系',
};

// ─── 课程分类 ──────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'all',      label: '全部课程', icon: '🏸' },
  { id: 'footwork', label: '步法',     icon: '👟' },
  { id: 'stroke',   label: '击球技术', icon: '🎯' },
  { id: 'serve',    label: '发球',     icon: '🏹' },
  { id: 'receive',  label: '接球',     icon: '🛡️' },
  { id: 'strategy', label: '战术',     icon: '🧠' },
];

// ─── 难度标签配置 ──────────────────────────────────────────────────────────

export const DIFFICULTY_CONFIG = {
  '入门': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  '初级': { color: 'bg-blue-100 text-blue-700 border-blue-200' },
  '中级': { color: 'bg-amber-100 text-amber-700 border-amber-200' },
};

// ─── 课程数据 ──────────────────────────────────────────────────────────────

export const coursesData = [
  {
    id: 1,
    category: 'footwork',
    difficulty: '入门',
    title: '羽毛球基础步法入门',
    description: '步法是羽毛球所有技术的根基，大G从起动、移动、还原三要素出发，系统讲解六个方向的标准步法路线。',
    keyPoints: [
      '起动技巧：蹬地→分腿起跳，比"交叉步"快 0.2 秒的秘密',
      '六方向步法：前网、后场、侧向的交叉步与并步选择时机',
      '还原中心位置：每次击球后回到 T 字区的肌肉记忆训练',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=步法',
    tags: ['必学', '基础'],
  },
  {
    id: 2,
    category: 'stroke',
    difficulty: '入门',
    title: '正手高远球完整教学',
    description: '正手高远球是初学者必须掌握的第一个主动进攻技术，建立正确动力链意识，打出真正有力量的高远球。',
    keyPoints: [
      '标准握拍姿势：正手握拍的虎口位置与三指贴合方式',
      '完整动力链：转腰→转肩→甩肘→屈腕的鞭打发力顺序',
      '击球点控制：在头部右上方最高点打球，"拍框换位"避免手腕扭伤',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=高远球',
    tags: ['必学', '基础'],
  },
  {
    id: 3,
    category: 'stroke',
    difficulty: '初级',
    title: '反手区域全面突破',
    description: '反手是初学者最大的薄弱区，大G专项拆解反手高远球、反手吊球、反手挡网的发力技巧与步法衔接。',
    keyPoints: [
      '反手握拍转换：拇指竖立顶压宽面，食指后移形成支撑',
      '反手高远球发力：以拇指顶推+手腕外翻为核心，加速击球',
      '反手区步法：右脚插入→转体→击球→左脚蹬回中场',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=反手',
    tags: ['初级', '难点突破'],
  },
  {
    id: 4,
    category: 'stroke',
    difficulty: '初级',
    title: '网前小球精讲：搓、推、勾、扑',
    description: '网前是制造进攻机会的关键战场，掌握四种核心网前技术，让对手无从应对。',
    keyPoints: [
      '搓球手腕动作：切击拍弦产生旋转，让球贴网翻滚过网',
      '推球时机判断：对方在网前仰角时，果断推直线底线',
      '扑球技术：高点拦截快扣，配合弓箭步快速起动',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=网前小球',
    tags: ['初级', '得分利器'],
  },
  {
    id: 5,
    category: 'serve',
    difficulty: '入门',
    title: '合法发球技术与规范',
    description: '合规且有效的发球是掌控节奏的第一步。系统讲解发球规则，避免常见违例，建立两种主流发球方式。',
    keyPoints: [
      '合法发球三要素：球拍框低于腰部 / 拍头低于握拍手 / 向前挥拍',
      '正手后场高远球发球：最常用的业余单打发球方式，角度与力量控制',
      '反手网前短球发球：双打主流发球，压制对手快速起拍进攻',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=发球',
    tags: ['必学', '基础'],
  },
  {
    id: 6,
    category: 'receive',
    difficulty: '初级',
    title: '接发球技术体系',
    description: '接发球直接决定每分的走向。建立系统化的接发球判断体系，做到"接到不失分，接好能得分"。',
    keyPoints: [
      '接发球站位：单打与双打的最佳准备位置与重心控制',
      '接网前短球：三种处理方式（搓/推/扑）的判断逻辑',
      '接后场高远球：高远回球 vs 进攻吊球 vs 杀球的时机选择',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=接发球',
    tags: ['初级', '实战'],
  },
  {
    id: 7,
    category: 'stroke',
    difficulty: '初级',
    title: '扣杀技术入门：发力与落点',
    description: '杀球是羽毛球最具威慑力的技术，掌握正确的起跳时机与鞭打发力，打出又快又准的扣杀。',
    keyPoints: [
      '起跳时机：踏跳杀球 vs 平地杀球的场景判断',
      '杀球发力链：转腰→沉肩→甩肘→内旋→屈腕的完整鞭打动作',
      '落点控制：正手直线杀 vs 斜线杀的拍面微调技巧',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=扣杀',
    tags: ['初级', '进攻'],
  },
  {
    id: 8,
    category: 'strategy',
    difficulty: '初级',
    title: '单打基础战术：攻防思路',
    description: '从"打到哪算哪"升级为"有意识地主动布局"，理解单打核心战术框架与得分套路。',
    keyPoints: [
      '中心位置原则：每次击球后必须快速回到 T 字区中央',
      '基础进攻套路：高远球→调动位置→下压吊球→扣杀得分',
      '控制对手：集中攻反手区 + 大角度拉开，制造空间机会',
    ],
    videoUrl: 'https://space.bilibili.com/1423436652/search/video?keyword=单打战术',
    tags: ['初级', '战术'],
  },
];

// ─── 统一 Fetch 接口（解耦设计，后期替换为 Supabase 无需改动 UI） ─────────

/**
 * 获取全部课程
 * @returns {Promise<typeof coursesData>}
 */
export async function fetchAllCourses() {
  // TODO（第二阶段）: return await supabase.from('courses').select('*')
  return coursesData;
}

/**
 * 按分类筛选课程
 * @param {string} categoryId - 分类 id，'all' 返回全部
 * @returns {Promise<typeof coursesData>}
 */
export async function fetchCoursesByCategory(categoryId) {
  if (categoryId === 'all') return coursesData;
  return coursesData.filter(c => c.category === categoryId);
}
