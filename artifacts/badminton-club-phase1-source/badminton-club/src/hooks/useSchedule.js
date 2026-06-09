/**
 * useSchedule.js
 * 排班状态管理 Hook — 封装 scheduleEngine 与 React 状态的桥接
 */
import { useState, useCallback } from 'react';
import {
  getMergedSchedule,
  applySubstitution,
  resetWeekOverride,
  clearAllOverrides,
  DEFAULT_WEEKS,
} from '../engine/scheduleEngine';

/**
 * @param {number} weeksCount 生成周数
 * @returns {{ schedule, handleSubstitution, handleReset, handleClearAll }}
 */
export function useSchedule(weeksCount = DEFAULT_WEEKS) {
  // 初始加载：合并算法基础表 + localStorage 覆盖
  const [schedule, setSchedule] = useState(() => getMergedSchedule(weeksCount));

  /** 刷新本地排班状态（写入 localStorage 后调用） */
  const refresh = useCallback(() => {
    setSchedule(getMergedSchedule(weeksCount));
  }, [weeksCount]);

  /**
   * 临时替换某周某槽位的教练
   * @param {string}   date      - 'YYYY-MM-DD'
   * @param {number}   slotIndex - 0 | 1 | 2
   * @param {string}   newCoach  - 新教练名
   * @param {string[]} baseCoaches - 该周算法原始三人（防止传错）
   */
  const handleSubstitution = useCallback((date, slotIndex, newCoach, baseCoaches) => {
    applySubstitution(date, slotIndex, newCoach, baseCoaches);
    refresh();
  }, [refresh]);

  /**
   * 重置某周的全部调班记录
   * @param {string} date - 'YYYY-MM-DD'
   */
  const handleReset = useCallback((date) => {
    resetWeekOverride(date);
    refresh();
  }, [refresh]);

  /**
   * 清空全部调班记录（管理员操作）
   */
  const handleClearAll = useCallback(() => {
    clearAllOverrides();
    refresh();
  }, [refresh]);

  return { schedule, handleSubstitution, handleReset, handleClearAll };
}
