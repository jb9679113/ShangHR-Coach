/**
 * WeekScheduleCard.jsx — 单周排班卡片
 */
import CoachSlot from './CoachSlot';
import { formatDateCN } from '../engine/scheduleEngine';

/**
 * @param {object} props
 * @param {import('../engine/scheduleEngine').ScheduleItem} props.item
 * @param {boolean}  props.isNext      - 是否是最近一次活动（高亮）
 * @param {Function} props.onSubstitute
 * @param {Function} props.onReset     - 重置本周调班
 */
export default function WeekScheduleCard({ item, isNext, onSubstitute, onReset }) {
  const { weekIndex, date, restCoaches, isModified } = item;
  const dateCN = formatDateCN(date);

  return (
    <div className={`
      card transition-all duration-300
      ${isNext ? 'ring-2 ring-accent-400 shadow-accent-100 shadow-md' : ''}
    `}>
      {/* 卡片头部 */}
      <div className={`
        px-4 py-3 flex items-center justify-between
        ${isNext ? 'bg-gradient-to-r from-accent-600 to-accent-500' : 'bg-primary-800'}
      `}>
        <div className="flex items-center gap-2.5">
          <span className="text-white/80 text-xs font-medium">第 {weekIndex} 周</span>
          <span className="w-px h-3 bg-white/30" />
          <span className="text-white font-bold text-sm">{dateCN} 周四</span>
          <span className="text-white/70 text-xs">20:00–22:00</span>
        </div>

        <div className="flex items-center gap-2">
          {isNext && (
            <span className="badge bg-white text-accent-600 border-white text-xs font-bold animate-pulse">
              📍 即将开始
            </span>
          )}
          {isModified && !isNext && (
            <span className="badge bg-amber-400/20 text-amber-200 border-amber-400/30 text-xs">
              ✏ 已调班
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* 执教教练区 */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <span className="text-blue-500">●</span>
            执教教练（3位）
            <span className="text-slate-300 font-normal">— 点击名字可临时换班</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(idx => (
              <CoachSlot
                key={idx}
                scheduleItem={item}
                slotIndex={idx}
                onSubstitute={onSubstitute}
              />
            ))}
          </div>
        </div>

        {/* 轮休教练区 */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="text-slate-300">○</span>
            本周轮休（2位）
          </p>
          <div className="flex gap-2">
            {restCoaches.map(coach => (
              <span key={coach} className="coach-resting">
                {coach}
              </span>
            ))}
          </div>
        </div>

        {/* 重置按钮（仅修改过的周次显示） */}
        {isModified && (
          <div className="pt-3 border-t border-slate-100 mt-3">
            <button
              onClick={() => onReset(date)}
              className="btn-ghost text-xs text-amber-600 hover:text-amber-700 hover:bg-amber-50 w-full justify-center"
            >
              ↩ 撤销本周调班，恢复算法原排
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
