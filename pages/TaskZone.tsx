
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const MOCK_ASSIGNMENTS = [
  {
    id: 't1',
    title: 'Urdu Handwriting Practice',
    description: 'Copy 2 pages of Urdu text provided in the instructions.',
    reward: 150,
    time: '20 mins',
    difficulty: 'Easy'
  },
  {
    id: 't2',
    title: 'English Essay: Tech in Pakistan',
    description: 'Write a 300-word essay about the impact of IT on local economy.',
    reward: 350,
    time: '45 mins',
    difficulty: 'Medium'
  },
  {
    id: 't3',
    title: 'Math Quiz: Basic Algebra',
    description: 'Solve 10 algebra problems and submit the photo of your steps.',
    reward: 200,
    time: '30 mins',
    difficulty: 'Medium'
  },
  {
    id: 't4',
    title: 'Current Affairs Summary',
    description: 'Summarize today\'s top 3 news headlines from Dawn News.',
    reward: 100,
    time: '15 mins',
    difficulty: 'Easy'
  }
];

const TaskZone: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Today's Assignments</h1>
        <p className="text-gray-500 font-medium">Complete tasks precisely to get your payment approved quickly.</p>
      </div>

      {MOCK_ASSIGNMENTS.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {MOCK_ASSIGNMENTS.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-rose-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-rose-50 text-rose-600 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider">
                  {task.difficulty}
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-500">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center mb-8">
                    <div className="flex items-center text-xs font-bold text-gray-400">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {task.time}
                    </div>
                    <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                      <Zap className="w-4 h-4 mr-1.5" />
                      Rs. {task.reward} Reward
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/do-task/${task.id}`)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 text-white font-black rounded-2xl hover:bg-rose-600 transition-all flex items-center justify-center group/btn"
                  >
                    Start Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
          <ShieldCheck className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-gray-400">No Work Available</h2>
          <p className="text-gray-400 mt-2">New assignments drop every morning at 9:00 AM.</p>
        </div>
      )}
    </div>
  );
};

export default TaskZone;
