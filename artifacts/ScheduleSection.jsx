/**
 * ScheduleSection.jsx — 教练排班模块
 */
import { useMemo } from 'react';
import { useSchedule } from '../hooks/useSchedule';
import WeekScheduleCard from './WeekScheduleCard';
import { formatMonthCN, getNextActiveIndex, COACHES } from '../engine/scheduleEngine';

export default function ScheduleSection() {
  const { schedule, handleSubstitution, handleReset, handleClearAll } = useSchedule(26);

  // 最近一次活动的下标
  const nextIdx = useMemo(() => getNextActiveIndex(schedule), [schedule]);

  // 按月份分组
  const monthGroups = useMemo(() => {
    const groups = [];
    let currentMonth = '';
    schedule.forEach(item => {
      const month = formatMonthCN(item.date);
      if (month !== currentMonth) {
        currentMonth = month;
        groups.push({ month, items: [] });
      }
      groups[groups.length - 1].items.push(item);
    });
    return groups;
  }, [schedule]);

  // 本月已调班数量
  const modifiedCount = useMemo(
    () => schedule.filter(s => s.isModified).length,
    [schedule]
  );

  return (
    <div className="animate-fade-in">
      {/* 顶部说明卡 */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="🗓" label="排班总周数" value={`${schedule.length} 周`} />
        <StatCard icon="👥" label="教练团队" value={`${COACHES.length} 位轮值`} />
        <StatCard icon="✏️" label="临时调班记录" value={`${modifiedCount} 处`}
          highlight={modifiedCount > 0} />
        <StatCard icon="🔄" label="轮班周期" value="每 5 周完整循环" />
      </div>

      {/* 操作说明 */}
      <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
        <span className="text-lg flex-shrink-0">💡</span>
        <div className="text-sm text-amber-800">
          <strong>临时调班说明：</strong>
          点击执教教练的下拉菜单，可选择本周轮休教练进行临时替换。
          调班仅对当周生效，<strong>不影响后续任何周次的算法排班</strong>，修改自动保存至浏览器本地。
        </div>
      </div>

      {/* 清空全部按钮（有调班记录时显示） */}
      {modifiedCount > 0 && (
        <div className="mb-5 flex justify-end">
          <button
            onClick={() => {
              if (window.confirm(`确认清空全部 ${modifiedCount} 处临时调班记录？此操作不可撤销。`)) {
                handleClearAll();
              }
            }}
            className="btn-ghost text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-200"
          >
            🗑 清空全部调班记录
          </button>
        </div>
      )}

      {/* 按月份渲染排班表 */}
      <div className="space-y-8">
        {monthGroups.map(({ month, items }) => (
          <section key={month}>
            {/* 月份标题 */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-primary-800">{month}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary-200 to-transparent" />
              <span className="text-xs text-slate-400">{items.length} 次活动</span>
            </div>

            {/* 本月周次网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((item, i) => {
                // 计算这个 item 在全局 schedule 中的下标
                const globalIdx = schedule.indexOf(item);
                return (
                  <WeekScheduleCard
                    key={item.date}
                    item={item}
                    isNext={globalIdx === nextIdx}
                    onSubstitute={handleSubstitution}
                    onReset={handleReset}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* 底部循环说明 */}
      <div className="mt-10 p-4 bg-primary-900/5 rounded-2xl border border-primary-200/30">
        <p className="text-xs font-semibold text-primary-700 mb-3">📐 排班循环验证（2026年7月参考）</p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {[
            { week: '第1周 07-02', coaches: '孙刚、齐文泉、姜波', rest: '刘嵩、刘皓龙' },
            { week: '第2周 07-09', coaches: '姜波、刘嵩、刘皓龙', rest: '孙刚、齐文泉' },
            { week: '第3周 07-16', coaches: '刘皓龙、孙刚、齐文泉', rest: '姜波、刘嵩' },
            { week: '第4周 07-23', coaches: '齐文泉、姜波、刘嵩', rest: '刘皓龙、孙刚' },
            { week: '第5周 07-30', coaches: '刘嵩、刘皓龙、孙刚', rest: '齐文泉、姜波' },
          ].map(r => (
            <div key={r.week} className="bg-white rounded-lg p-2.5 border border-primary-100">
              <p className="font-semibold text-primary-700 mb-1">{r.week}</p>
              <p className="text-slate-700">✅ {r.coaches}</p>
              <p className="text-slate-400 mt-0.5">轮休：{r.rest}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, highlight = false }) {
  return (
    <div className={`card p-4 flex items-center gap-3 ${highlight ? 'border-amber-200 bg-amber-50' : ''}`}>
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`font-bold text-sm ${highlight ? 'text-amber-700' : 'text-slate-800'}`}>{value}</p>
      </div>
    </div>
  );
}
