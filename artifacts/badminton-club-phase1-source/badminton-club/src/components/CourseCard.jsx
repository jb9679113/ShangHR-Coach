/**
 * CourseCard.jsx — 单个课程卡片
 */
import { DIFFICULTY_CONFIG } from '../data/coursesData';

const CATEGORY_COLORS = {
  footwork: 'from-teal-500 to-cyan-500',
  stroke:   'from-blue-500 to-indigo-500',
  serve:    'from-violet-500 to-purple-500',
  receive:  'from-sky-500 to-blue-500',
  strategy: 'from-amber-500 to-orange-500',
};

const CATEGORY_ICONS = {
  footwork: '👟',
  stroke:   '🏸',
  serve:    '🏹',
  receive:  '🛡️',
  strategy: '🧠',
};

const CATEGORY_NAMES = {
  footwork: '步法',
  stroke:   '击球技术',
  serve:    '发球',
  receive:  '接球',
  strategy: '战术',
};

export default function CourseCard({ course }) {
  const { title, category, difficulty, description, keyPoints, videoUrl, tags } = course;
  const gradientClass = CATEGORY_COLORS[category] || 'from-slate-500 to-slate-600';
  const diffConfig = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG['入门'];

  return (
    <div className="card flex flex-col group hover:shadow-md transition-shadow duration-300 animate-slide-up">
      {/* 顶部色带 */}
      <div className={`h-1.5 bg-gradient-to-r ${gradientClass}`} />

      <div className="flex flex-col flex-1 p-5">
        {/* 元信息行 */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <span>{CATEGORY_ICONS[category]}</span>
            <span>{CATEGORY_NAMES[category]}</span>
          </span>
          <span className={`badge ${diffConfig.color} text-xs`}>{difficulty}</span>
        </div>

        {/* 课程标题 */}
        <h3 className="text-slate-800 font-bold text-base leading-snug mb-2 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>

        {/* 简介 */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* 核心要点 */}
        <div className="flex-1 mb-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            核心要点
          </p>
          <ul className="space-y-1.5">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-0.5 text-accent-500 flex-shrink-0 font-bold">·</span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 标签行 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map(tag => (
              <span key={tag} className="badge bg-slate-100 text-slate-500 border-slate-200 text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA 按钮 */}
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary justify-center w-full"
        >
          <span>▶</span>
          <span>去哔哩哔哩学习</span>
        </a>
      </div>
    </div>
  );
}
