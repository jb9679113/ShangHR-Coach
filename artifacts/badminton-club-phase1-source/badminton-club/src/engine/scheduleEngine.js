/**
 * scheduleEngine.js
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 山大校友·山青浩然羽毛球俱乐部 — 教练轮班核心算法
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 设计原则：
 *   1. 纯函数式，无 UI 框架依赖
 *   2. localStorage 操作集中在本模块，对外提供统一接口
 *   3. 与 UI 组件完全解耦，后期可直接替换为 Supabase SDK 调用
 *
 * 排班算法规则（队列循环法）：
 *   - 5 位教练固定顺序：孙刚、齐文泉、姜波、刘嵩、刘浩龙
 *   - 每次 3 位执教，2 位轮休
 *   - 步进 +2：本周最后一位（索引 +2）是下周第一位，确保组合不固定且公平循环
 *   - 验证序列（2026年7月）：
 *       第1周 07-02：孙刚、齐文泉、姜波
 *       第2周 07-09：姜波、刘嵩、刘浩龙
 *       第3周 07-16：刘浩龙、孙刚、齐文泉
 *       第4周 07-23：齐文泉、姜波、刘嵩
 *       第5周 07-30：刘嵩、刘浩龙、孙刚
 */

// ─── 常量 ──────────────────────────────────────────────────────────────────

/** 教练团队（固定顺序，决定排班循环） */
export const COACHES = ['孙刚', '齐文泉', '姜波', '刘嵩', '刘浩龙'];

export const COACHES_COUNT  = COACHES.length;  // 5
export const DUTY_COUNT     = 3;                // 每次执教人数
export const REST_COUNT     = COACHES_COUNT - DUTY_COUNT; // 2

/** 排班起始日期：2026年7月第一个周四 */
export const SCHEDULE_START_DATE = '2026-07-02';

/** 默认生成周数（约半年） */
export const DEFAULT_WEEKS = 26;

/** localStorage 存储键名（命名空间隔离） */
const STORAGE_KEY = 'shandaqianhao_schedule_overrides_v1';

// ─── 类型注释（JSDoc） ──────────────────────────────────────────────────────

/**
 * @typedef {Object} ScheduleItem
 * @property {number}   weekIndex      - 第几周（从 1 开始）
 * @property {string}   date           - 周四日期 'YYYY-MM-DD'
 * @property {string[]} baseCoaches    - 算法生成的原始三位执教教练
 * @property {string[]} displayCoaches - 最终页面渲染的三位（可被人工覆盖）
 * @property {boolean[]}isSubstitute   - 对应 displayCoaches 每位是否为临时替换
 * @property {string[]} restCoaches    - 本周轮休的两位教练（算法计算，不变）
 * @property {boolean}  isModified     - 是否存在人工调班记录
 */

/**
 * @typedef {Object} Override
 * @property {string[]} displayCoaches - 被覆盖的三位教练名
 */

// ─── 核心算法 ──────────────────────────────────────────────────────────────

/**
 * 生成基础轮班表（不含任何人工覆盖）
 *
 * @param {number} weeksCount - 生成周数，默认 DEFAULT_WEEKS
 * @returns {ScheduleItem[]}
 */
export function generateBaseSchedule(weeksCount = DEFAULT_WEEKS) {
  const schedule = [];
  let currentIndex = 0; // 从 孙刚（索引0）开始

  // 使用 UTC 时间构造日期，避免夏令时/时区导致的日期偏移
  const [y, m, d] = SCHEDULE_START_DATE.split('-').map(Number);
  let currentDate = new Date(Date.UTC(y, m - 1, d));

  for (let i = 0; i < weeksCount; i++) {
    const dateString = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // ── 轮流取出 3 位执教教练 ──────────────────────────────
    const c1 = COACHES[currentIndex % COACHES_COUNT];
    const c2 = COACHES[(currentIndex + 1) % COACHES_COUNT];
    const c3 = COACHES[(currentIndex + 2) % COACHES_COUNT];
    const onDuty = [c1, c2, c3];

    // ── 计算本周轮休的 2 位教练（供前端下拉菜单使用）─────────
    const resting = COACHES.filter(name => !onDuty.includes(name));

    schedule.push({
      weekIndex:      i + 1,
      date:           dateString,
      baseCoaches:    onDuty,                // 算法原始值，永不变更
      displayCoaches: [...onDuty],           // 渲染值，可被 localStorage 覆盖
      isSubstitute:   [false, false, false], // 是否为替补（初始全 false）
      restCoaches:    resting,               // 供下拉菜单选择的备用教练
      isModified:     false,
    });

    // ── 步进逻辑：下周起始人 = 本周第三位（索引 +2）──────────
    // 这确保了"本周最后一人是下周第一人"的公平循环
    currentIndex = (currentIndex + 2) % COACHES_COUNT;

    // 加 7 天（全程 UTC 运算，避免夏令时问题）
    currentDate = new Date(Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate() + 7,
    ));
  }

  return schedule;
}

// ─── LocalStorage 接口 ─────────────────────────────────────────────────────

/**
 * 从 localStorage 读取所有调班覆盖记录
 * @returns {Record<string, Override>} - key 为 'YYYY-MM-DD'
 */
export function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    console.warn('[scheduleEngine] localStorage 解析失败，返回空覆盖记录');
    return {};
  }
}

/**
 * 将覆盖记录写入 localStorage
 * @param {Record<string, Override>} overrides
 */
export function saveOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.error('[scheduleEngine] localStorage 写入失败', e);
  }
}

// ─── 合并逻辑 ──────────────────────────────────────────────────────────────

/**
 * 合并基础排班 + localStorage 覆盖，返回最终可渲染数据
 * （页面加载时调用此函数获取完整排班表）
 *
 * 流程：
 *   1. generateBaseSchedule()   → 纯算法基础表
 *   2. loadOverrides()          → 读取人工微调记录
 *   3. 合并：若某周有覆盖记录，用覆盖记录替换 displayCoaches
 *
 * @param {number} weeksCount
 * @returns {ScheduleItem[]}
 */
export function getMergedSchedule(weeksCount = DEFAULT_WEEKS) {
  const base      = generateBaseSchedule(weeksCount);
  const overrides = loadOverrides();

  return base.map(item => {
    const ov = overrides[item.date];
    if (!ov || !ov.displayCoaches) return item;

    const displayCoaches = ov.displayCoaches;
    // isSubstitute 由 displayCoaches 与 baseCoaches 比较得出（无需单独存储）
    const isSubstitute = displayCoaches.map((c, i) => c !== item.baseCoaches[i]);

    return {
      ...item,
      displayCoaches,
      isSubstitute,
      isModified: true,
    };
  });
}

// ─── 调班操作 ──────────────────────────────────────────────────────────────

/**
 * 临时替换某周某个执教槽位的教练（仅对当周生效，不影响后续算法）
 *
 * @param {string}   date               - 目标周的日期 'YYYY-MM-DD'
 * @param {number}   slotIndex          - 槽位索引 0 | 1 | 2
 * @param {string}   newCoach           - 替换为的教练名
 * @param {string[]} baseCoachesForDate - 该周算法原始三位（用于比较是否已恢复）
 */
export function applySubstitution(date, slotIndex, newCoach, baseCoachesForDate) {
  const overrides = loadOverrides();

  // 取当前 displayCoaches：来自已有覆盖记录 或 算法基础值
  const current = overrides[date]?.displayCoaches
    ? [...overrides[date].displayCoaches]
    : [...baseCoachesForDate];

  current[slotIndex] = newCoach;

  // 若全部槽位已恢复为算法原值，则删除该周覆盖记录（保持 localStorage 整洁）
  const allOriginal = current.every((c, i) => c === baseCoachesForDate[i]);

  if (allOriginal) {
    delete overrides[date];
  } else {
    overrides[date] = { displayCoaches: current };
  }

  saveOverrides(overrides);
}

/**
 * 重置某周全部调班记录，恢复算法原始排班
 * @param {string} date - 'YYYY-MM-DD'
 */
export function resetWeekOverride(date) {
  const overrides = loadOverrides();
  delete overrides[date];
  saveOverrides(overrides);
}

/**
 * 清空全部人工调班记录（谨慎使用）
 */
export function clearAllOverrides() {
  localStorage.removeItem(STORAGE_KEY);
}

// ─── UI 辅助函数 ───────────────────────────────────────────────────────────

/**
 * 获取某个执教槽位的下拉菜单选项
 *
 * 规则：
 *   - 基础教练（算法原值）：始终作为首选项，用于"撤销替换"
 *   - 原始轮休教练中，未被其他槽位占用的：可选替补
 *   - 去重，避免同一教练出现在多个槽位
 *
 * @param {ScheduleItem} scheduleItem
 * @param {number}       slotIndex - 0 | 1 | 2
 * @returns {string[]} 可选教练名列表（第一项为基础教练）
 */
export function getDropdownOptions(scheduleItem, slotIndex) {
  const { baseCoaches, displayCoaches, restCoaches } = scheduleItem;
  const baseCoach = baseCoaches[slotIndex];

  // 其他槽位当前正在使用的教练（不能再次使用）
  const otherDisplayed = displayCoaches.filter((_, i) => i !== slotIndex);

  // 可用的轮休教练：在 restCoaches 中 且 未被其他槽位占用
  const availableRest = restCoaches.filter(c => !otherDisplayed.includes(c));

  // 最终选项：基础教练（首位）+ 可用轮休教练，去重
  return [...new Set([baseCoach, ...availableRest])];
}

/**
 * 格式化日期为中文简短形式
 * @param {string} dateStr 'YYYY-MM-DD'
 * @returns {string} '7月2日'
 */
export function formatDateCN(dateStr) {
  const [, m, d] = dateStr.split('-').map(Number);
  return `${m}月${d}日`;
}

/**
 * 格式化日期为月份标题
 * @param {string} dateStr 'YYYY-MM-DD'
 * @returns {string} '2026年7月'
 */
export function formatMonthCN(dateStr) {
  const [y, m] = dateStr.split('-').map(Number);
  return `${y}年${m}月`;
}

/**
 * 在排班表中，找到距今最近的未来周次索引（用于高亮"最近一次活动"）
 * @param {ScheduleItem[]} schedule
 * @returns {number} 数组下标
 */
export function getNextActiveIndex(schedule) {
  const todayStr = new Date().toISOString().split('T')[0];
  const idx = schedule.findIndex(item => item.date >= todayStr);
  return idx >= 0 ? idx : 0;
}
