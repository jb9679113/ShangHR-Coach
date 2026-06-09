/**
 * CoachSlot.jsx — 单个执教教练槽位（含替换下拉菜单）
 */
import { getDropdownOptions } from '../engine/scheduleEngine';

/**
 * @param {object} props
 * @param {import('../engine/scheduleEngine').ScheduleItem} props.scheduleItem
 * @param {number}   props.slotIndex  - 0 | 1 | 2
 * @param {Function} props.onSubstitute - (date, slotIndex, newCoach, baseCoaches) => void
 */
export default function CoachSlot({ scheduleItem, slotIndex, onSubstitute }) {
  const { date, displayCoaches, isSubstitute, baseCoaches } = scheduleItem;
  const coach   = displayCoaches[slotIndex];
  const isSub   = isSubstitute[slotIndex];
  const options = getDropdownOptions(scheduleItem, slotIndex);

  function handleChange(e) {
    const newCoach = e.target.value;
    if (newCoach !== coach) {
      onSubstitute(date, slotIndex, newCoach, baseCoaches);
    }
  }

  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* 替换标签 */}
      {isSub && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10
                         text-[10px] font-bold bg-amber-400 text-white
                         px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
          替
        </span>
      )}

      {/* 下拉选择 */}
      <div className="relative w-full">
        <select
          value={coach}
          onChange={handleChange}
          title={isSub ? `原始：${baseCoaches[slotIndex]}` : '点击替换教练'}
          className={`
            w-full pl-3 pr-7 py-2 rounded-xl text-sm font-semibold
            border-2 appearance-none cursor-pointer text-center
            transition-all duration-200 focus:outline-none focus:ring-2
            ${isSub
              ? 'bg-amber-50 border-amber-300 text-amber-800 focus:ring-amber-300 focus:border-amber-400'
              : 'bg-blue-50 border-blue-200 text-blue-900 hover:border-blue-400 focus:ring-blue-300 focus:border-blue-400'
            }
          `}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt === baseCoaches[slotIndex] && opt !== coach ? `↩ ${opt}` : opt}
            </option>
          ))}
        </select>

        {/* 下拉箭头图标 */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
          ▾
        </span>
      </div>

      {/* 被替换的原始教练提示 */}
      {isSub && (
        <p className="text-[10px] text-amber-600 font-medium">
          代替 {baseCoaches[slotIndex]}
        </p>
      )}
    </div>
  );
}
