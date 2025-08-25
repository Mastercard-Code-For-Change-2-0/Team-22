import { useState } from 'react'; 
 
export default function FeedbackForm() { 
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [submitted, setSubmitted] = useState(false); 
 
  const handleSubmit = e => { 
    e.preventDefault(); 
    // Here you can add API submission logic 
    setSubmitted(true); 
    setEmail(''); 
    setMessage(''); 
  }; 
 
  return ( 
    <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl border 
border-gray-200"> 
      <h2 className="text-2xl font-bold mb-6 text-teal-700">We’d love your feedback!</h2> 
 
      {submitted ? ( 
        <p className="text-green-600 text-lg font-medium mb-4"> 
          Thank you! Your feedback has been received. 
        </p> 
      ) : ( 
        <form onSubmit={handleSubmit} className="flex flex-col gap-5"> 
          {/* Email */} 
          <label className="flex flex-col text-gray-700 font-medium"> 
            Email Address 
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@example.com" 
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 
focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition 
placeholder-gray-400" 
            /> 
          </label> 
 
          {/* Message */} 
          <label className="flex flex-col text-gray-700 font-medium"> 
            Your Feedback 
            <textarea 
              required 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              placeholder="Share your thoughts or suggestions..." 
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 
focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition 
placeholder-gray-400 h-32 resize-none" 
            /> 
          </label> 
 
          {/* Submit Button */} 
          <button 
            type="submit" 
            className="mt-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 
rounded-lg shadow-md transition transform hover:-translate-y-0.5 focus:ring-2 
focus:ring-teal-300" 
          > 
            Submit Feedback 
          </button> 
        </form> 
      )} 
    </div> 
  ); 
} 
 