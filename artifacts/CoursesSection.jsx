/**
 * CoursesSection.jsx — 课程学习模块
 */
import { useState } from 'react';
import { coursesData, CATEGORIES, CHANNEL_INFO } from '../data/coursesData';
import CourseCard from './CourseCard';

export default function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? coursesData
    : coursesData.filter(c => c.category === activeCategory);

  return (
    <div className="animate-fade-in">
      {/* 频道来源说明 */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary-900/5 to-accent-600/5 border border-primary-200/30">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📺</span>
          <div>
            <p className="font-semibold text-slate-700 text-sm">
              课程内容来源：<strong className="text-primary-700">{CHANNEL_INFO.name}</strong>
            </p>
            <p className="text-slate-500 text-xs mt-0.5">{CHANNEL_INFO.desc}</p>
            <a
              href={CHANNEL_INFO.homeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-accent-600 hover:text-accent-500 mt-1 font-medium"
            >
              前往 B 站频道主页 →
            </a>
          </div>
        </div>
      </div>

      {/* 分类筛选标签 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
              border transition-all duration-200
              ${activeCategory === cat.id
                ? 'bg-primary-700 text-white border-primary-700 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-700'
              }
            `}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            {cat.id !== 'all' && (
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {coursesData.filter(c => c.category === cat.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 课程网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-3">🏸</p>
          <p>该分类暂无课程</p>
        </div>
      )}
    </div>
  );
}
