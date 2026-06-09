/**
 * Header.jsx — 顶部导航栏
 * 固定定位，包含俱乐部品牌标识 + 两个功能标签页
 */
export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">
      {/* 主导航区 */}
      <div
        className="px-4 py-3"
        style={{ background: 'linear-gradient(135deg, #0f2444 0%, #1a3a6b 60%, #2d5aa0 100%)' }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo + 标题 */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl flex-shrink-0" role="img" aria-label="羽毛球">🏸</span>
            <div className="min-w-0">
              <h1 className="text-white font-bold text-base sm:text-lg leading-tight truncate">
                山大校友·山青浩然
              </h1>
              <p className="text-blue-200 text-xs sm:text-sm truncate">
                羽毛球俱乐部初学者平台
              </p>
            </div>
          </div>

          {/* 标签导航 */}
          <nav className="flex items-center gap-1 flex-shrink-0 bg-white/10 rounded-xl p-1">
            <TabButton
              active={activeTab === 'courses'}
              onClick={() => onTabChange('courses')}
              icon="📚"
              label="课程学习"
            />
            <TabButton
              active={activeTab === 'schedule'}
              onClick={() => onTabChange('schedule')}
              icon="📅"
              label="教练排班"
            />
          </nav>
        </div>
      </div>

      {/* 底部活动信息条 */}
      <div className="bg-accent-600/90 backdrop-blur-sm px-4 py-1.5">
        <p className="text-center text-white/90 text-xs">
          📍 每周四晚 <strong className="text-white">20:00 – 22:00</strong> &nbsp;|&nbsp;
          五位轮值教练：孙刚、齐文泉、姜波、刘嵩、刘浩龙 &nbsp;|&nbsp;
          排班自 <strong className="text-white">2026.07.02</strong> 起
        </p>
      </div>
    </header>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
        transition-all duration-200 whitespace-nowrap
        ${active
          ? 'bg-white text-primary-800 shadow-sm'
          : 'text-white/80 hover:text-white hover:bg-white/10'
        }
      `}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
