import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowRight, CheckCircle, Mail, TrendingUp, Download, FileText } from 'lucide-react';

const GrowthReadinessAssessment = () => {
  const [step, setStep] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const questions = [
    {
      id: 'market_position',
      category: 'Market Position',
      question: 'How would you describe your competitive position in your primary market?',
      options: [
        { text: 'We are the clear market leader with significant differentiation', value: 5 },
        { text: 'We are among the top 3 players in our market', value: 4 },
        { text: 'We are a strong mid-tier competitor', value: 3 },
        { text: 'We are struggling to differentiate from competitors', value: 2 },
        { text: 'We are losing market share consistently', value: 1 }
      ]
    },
    {
      id: 'market_trends',
      category: 'Market Position',
      question: 'How well do you understand and respond to market trends?',
      options: [
        { text: 'We anticipate and lead market trends', value: 5 },
        { text: 'We quickly adapt to emerging trends', value: 4 },
        { text: 'We follow trends but with some delay', value: 3 },
        { text: 'We struggle to keep pace with market changes', value: 2 },
        { text: 'We are reactive and often miss opportunities', value: 1 }
      ]
    },
    {
      id: 'strategic_clarity',
      category: 'Strategic Clarity',
      question: 'How clear and aligned is your organization on growth strategy?',
      options: [
        { text: 'Crystal clear - everyone can articulate our strategic direction', value: 5 },
        { text: 'Leadership is aligned and actively cascading', value: 4 },
        { text: 'We have a strategy but alignment varies by level', value: 3 },
        { text: 'Strategy exists but is not widely understood', value: 2 },
        { text: 'No clear strategic direction or alignment', value: 1 }
      ]
    },
    {
      id: 'strategic_execution',
      category: 'Strategic Clarity',
      question: 'How effective is your strategic planning and execution process?',
      options: [
        { text: 'Highly disciplined with consistent execution and tracking', value: 5 },
        { text: 'Good planning with regular review cycles', value: 4 },
        { text: 'Plans exist but execution is inconsistent', value: 3 },
        { text: 'Strategic planning is ad-hoc', value: 2 },
        { text: 'Little connection between strategy and execution', value: 1 }
      ]
    },
    {
      id: 'org_structure',
      category: 'Organizational Capability',
      question: 'How well is your organization structured to execute growth plans?',
      options: [
        { text: 'Highly agile structure that enables rapid execution', value: 5 },
        { text: 'Generally capable structure with minor friction', value: 4 },
        { text: 'Some structural barriers to execution exist', value: 3 },
        { text: 'Significant organizational silos and constraints', value: 2 },
        { text: 'Structure actively hinders growth initiatives', value: 1 }
      ]
    },
    {
      id: 'org_processes',
      category: 'Organizational Capability',
      question: 'How mature are your core business processes and systems?',
      options: [
        { text: 'World-class processes with continuous improvement', value: 5 },
        { text: 'Well-documented and consistently followed', value: 4 },
        { text: 'Basic processes in place with some gaps', value: 3 },
        { text: 'Inconsistent processes across the organization', value: 2 },
        { text: 'Ad-hoc approaches with little standardization', value: 1 }
      ]
    },
    {
      id: 'talent_leadership',
      category: 'Talent & Leadership',
      question: 'How ready is your leadership team to drive transformation?',
      options: [
        { text: 'Exceptional leaders with proven change track record', value: 5 },
        { text: 'Strong leadership bench with good capabilities', value: 4 },
        { text: 'Capable leaders who need development', value: 3 },
        { text: 'Limited change leadership experience', value: 2 },
        { text: 'Significant leadership capability gaps', value: 1 }
      ]
    },
    {
      id: 'talent_pipeline',
      category: 'Talent & Leadership',
      question: 'How strong is your talent acquisition and development pipeline?',
      options: [
        { text: 'Strong employer brand attracting top talent with robust development', value: 5 },
        { text: 'Good hiring and development programs in place', value: 4 },
        { text: 'Adequate but facing increasing talent challenges', value: 3 },
        { text: 'Struggling to attract and retain key talent', value: 2 },
        { text: 'Critical talent gaps across the organization', value: 1 }
      ]
    },
    {
      id: 'talent_performance',
      category: 'Talent & Leadership',
      question: 'How effective is your performance management system?',
      options: [
        { text: 'Clear metrics with strong accountability and development', value: 5 },
        { text: 'Regular reviews with meaningful feedback', value: 4 },
        { text: 'Annual reviews but limited impact', value: 3 },
        { text: 'Inconsistent performance management', value: 2 },
        { text: 'Lack of clear performance expectations', value: 1 }
      ]
    },
    {
      id: 'culture_change',
      category: 'Culture & Mindset',
      question: 'How would you describe your organizational culture regarding change?',
      options: [
        { text: 'Embraces change as opportunity with innovation mindset', value: 5 },
        { text: 'Generally open to change and new ideas', value: 4 },
        { text: 'Mixed reactions - pockets of resistance', value: 3 },
        { text: 'Change-averse culture with significant resistance', value: 2 },
        { text: 'Actively resistant to change initiatives', value: 1 }
      ]
    },
    {
      id: 'culture_collaboration',
      category: 'Culture & Mindset',
      question: 'How collaborative is your organizational culture?',
      options: [
        { text: 'Highly collaborative with strong cross-functional teamwork', value: 5 },
        { text: 'Good collaboration when needed', value: 4 },
        { text: 'Some collaboration but silos exist', value: 3 },
        { text: 'Limited cross-functional collaboration', value: 2 },
        { text: 'Siloed with minimal collaboration', value: 1 }
      ]
    },
    {
      id: 'growth_investment',
      category: 'Growth Investment',
      question: 'How well-resourced are your growth initiatives?',
      options: [
        { text: 'Fully funded with dedicated resources and clear ROI tracking', value: 5 },
        { text: 'Adequately resourced with executive support', value: 4 },
        { text: 'Some resources but competing priorities', value: 3 },
        { text: 'Under-resourced with limited budget', value: 2 },
        { text: 'No dedicated growth investment or resources', value: 1 }
      ]
    },
    {
      id: 'data_insights',
      category: 'Data & Insights',
      question: 'How data-driven are your strategic decisions?',
      options: [
        { text: 'Highly analytical with robust predictive insights', value: 5 },
        { text: 'Good data capabilities with regular analysis', value: 4 },
        { text: 'Basic analytics and reporting in place', value: 3 },
        { text: 'Limited data-driven decision making', value: 2 },
        { text: 'Decisions mostly based on intuition', value: 1 }
      ]
    },
    {
      id: 'data_infrastructure',
      category: 'Data & Insights',
      question: 'How mature is your data infrastructure and capabilities?',
      options: [
        { text: 'Advanced analytics with integrated data platforms', value: 5 },
        { text: 'Solid infrastructure with good data quality', value: 4 },
        { text: 'Basic systems with some data quality issues', value: 3 },
        { text: 'Fragmented data across multiple systems', value: 2 },
        { text: 'Poor data quality and limited infrastructure', value: 1 }
      ]
    },
    {
      id: 'execution_speed',
      category: 'Execution Speed',
      question: 'How quickly can your organization move from decision to action?',
      options: [
        { text: 'Very fast - highly responsive with agile processes', value: 5 },
        { text: 'Reasonably quick with clear decision-making', value: 4 },
        { text: 'Moderate speed with some delays', value: 3 },
        { text: 'Slow to execute due to bureaucracy', value: 2 },
        { text: 'Paralyzed by decision-making processes', value: 1 }
      ]
    }
  ];

  const calculateScores = () => {
    const categoryScores = {};
    questions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { total: 0, count: 0, questions: [] };
      }
      const answerValue = answers[q.id] || 0;
      categoryScores[q.category].total += answerValue;
      categoryScores[q.category].count += 1;
      categoryScores[q.category].questions.push({ question: q.question, score: answerValue * 20 });
    });

    const radarData = Object.keys(categoryScores).map(category => ({
      category: category,
      score: Math.round((categoryScores[category].total / categoryScores[category].count) * 20)
    }));

    const barData = Object.keys(categoryScores).map(category => ({
      category: category.length > 20 ? category.substring(0, 17) + '...' : category,
      score: Math.round((categoryScores[category].total / categoryScores[category].count) * 20),
      fullCategory: category
    }));

    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 5;
    const percentageScore = Math.round((totalScore / maxScore) * 100);

    return { radarData, barData, percentageScore, categoryScores };
  };

  const getReadinessLevel = (score) => {
    if (score >= 80) return { level: 'High Growth Ready', color: 'text-green-600', bgColor: 'bg-green-100', desc: 'Your organization demonstrates strong capabilities across all dimensions and is well-positioned for accelerated growth.' };
    if (score >= 60) return { level: 'Growth Capable', color: 'text-blue-600', bgColor: 'bg-blue-100', desc: 'Your organization has solid foundations with specific areas requiring focus to maximize growth potential.' };
    if (score >= 40) return { level: 'Building Foundation', color: 'text-yellow-600', bgColor: 'bg-yellow-100', desc: 'Your organization is developing growth capabilities but needs strategic investments in key areas.' };
    return { level: 'Requires Transformation', color: 'text-red-600', bgColor: 'bg-red-100', desc: 'Significant organizational transformation is needed to build the foundation for sustainable growth.' };
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setStep('preview'), 300);
    }
  };

  const handleEmailSubmit = () => {
    if (email && company) {
      setStep('results');
      console.log('Lead captured:', { email, company, answers });
    }
  };

  const generatePDF = () => {
    alert('PDF generation would trigger here. In production, this would call your backend to generate a personalized PDF report with all insights, benchmarks, and recommendations.');
  };

  const { radarData, barData, percentageScore, categoryScores } = step === 'preview' || step === 'results' ? calculateScores() : { radarData: [], barData: [], percentageScore: 0, categoryScores: {} };
  const readiness = getReadinessLevel(percentageScore);

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
              Growth Readiness Assessment
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              Discover your organization's capacity for strategic growth with our comprehensive diagnostic
            </p>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Your personalized report includes:</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive assessment across 8 growth dimensions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Visual diagnostic showing strengths and opportunity areas</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Detailed dimension-by-dimension breakdown with scores</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Downloadable PDF report for your leadership team</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('questions')}
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center group"
            >
              Start Assessment
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              15 questions • 5 minutes • No credit card required
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const q = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="mb-3">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {q.category}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-blue-500" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Your Growth Readiness Score
            </h2>

            <div className="mb-10 text-center">
              <div className="inline-block">
                <div className={`text-6xl font-bold ${readiness.color} mb-2`}>
                  {percentageScore}%
                </div>
                <div className={`inline-block px-6 py-2 ${readiness.bgColor} ${readiness.color} rounded-full font-semibold mb-4`}>
                  {readiness.level}
                </div>
                <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                  {readiness.desc}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Your Growth Profile Across 8 Dimensions</h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Your Score" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 mb-8 text-center">
              <Mail className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Get Your Complete Analysis & PDF Report
              </h3>
              <p className="text-gray-700 mb-6">
                Unlock detailed dimension-by-dimension breakdowns, specific recommendations, and a downloadable PDF report for your leadership team.
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your work email"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleEmailSubmit}
                  disabled={!email || !company}
                  className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center group disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Get My Full Report
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    const topStrengths = [...radarData].sort((a, b) => b.score - a.score).slice(0, 3);
    const topOpportunities = [...radarData].sort((a, b) => a.score - b.score).slice(0, 3);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="text-center mb-10">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Complete Growth Readiness Report
              </h2>
              <p className="text-gray-600 mb-4">
                {company} • Assessment completed with 15 questions across 8 dimensions
              </p>
              <button
                onClick={generatePDF}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF Report
              </button>
            </div>

            <div className="mb-10 text-center">
              <div className="inline-block">
                <div className={`text-6xl font-bold ${readiness.color} mb-2`}>
                  {percentageScore}%
                </div>
                <div className={`inline-block px-6 py-2 ${readiness.bgColor} ${readiness.color} rounded-full font-semibold text-lg mb-4`}>
                  {readiness.level}
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {readiness.desc}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Growth Readiness Profile</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Your Score" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Dimension Scores</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="category" type="category" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span> Top 3 Strengths
                </h3>
                <ul className="space-y-3">
                  {topStrengths.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-800">{item.category}</span>
                      <span className="text-green-700 font-bold text-lg">{item.score}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🚀</span> Top 3 Priority Areas
                </h3>
                <ul className="space-y-3">
                  {topOpportunities.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-800">{item.category}</span>
                      <span className="text-orange-700 font-bold text-lg">{item.score}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Dimension Analysis</h3>
              <div className="space-y-6">
                {Object.keys(categoryScores).map((category, idx) => {
                  const catScore = Math.round((categoryScores[category].total / categoryScores[category].count) * 20);
                  return (
                    <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
                        <span className="text-2xl font-bold text-blue-600">{catScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${catScore}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Based on {categoryScores[category].count} question{categoryScores[category].count > 1 ? 's' : ''} in this dimension
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to Accelerate Your Growth?</h3>
              <p className="text-blue-100 mb-6">
                Our management consulting team specializes in turning insights into action. Let's discuss how we can help you strengthen your priority areas and build on your strengths.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Schedule a Strategy Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GrowthReadinessAssessment;
