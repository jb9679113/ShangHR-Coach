/**
 * App.jsx — 应用根组件
 */
import { useState } from 'react';
import Header from './components/Header';
import CoursesSection from './components/CoursesSection';
import ScheduleSection from './components/ScheduleSection';

export default function App() {
  const [activeTab, setActiveTab] = useState('schedule');

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 顶部导航高度占位（固定导航 header 高度约 96px） */}
      <div className="h-24" />

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {activeTab === 'courses'
          ? <CoursesSection />
          : <ScheduleSection />
        }
      </main>

      <footer className="mt-12 py-6 border-t border-slate-200 text-center text-slate-400 text-xs">
        <p>⛅ 山大校友·山青浩然羽毛球俱乐部 &nbsp;|&nbsp; 第一阶段前端原型 &nbsp;|&nbsp; 数据仅保存于本地浏览器</p>
        <p className="mt-1">每周四晚 20:00–22:00 &nbsp;·&nbsp; 排班自 2026.07.02 起正式运行</p>
      </footer>
    </div>
  );
}
