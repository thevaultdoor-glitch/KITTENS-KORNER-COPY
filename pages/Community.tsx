
import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Plus, Send, Smile, Lightbulb, X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface Post {
  id: string;
  author: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  commentsList: Comment[];
  isUser?: boolean;
}

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
  isUser: boolean;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: "Kittie Admin",
      time: "2h ago",
      content: "We are loving the energy at Messy Art today! Check out these little Picassos. 🎨🐾 #KittensKorner #Playtime",
      image: "https://picsum.photos/seed/art/600/400",
      likes: 24,
      comments: 5,
      commentsList: [
        { id: 'c1', author: 'Mama Bear', text: 'So cute! 💖', time: '1h ago' }
      ]
    },
    {
      id: '2',
      author: "Mama Jamie",
      time: "5h ago",
      content: "Does anyone have tips for transition from crib to toddler bed? Feeling a bit nervous! 🛌 #MomLife #Help",
      likes: 12,
      comments: 18,
      commentsList: []
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', author: 'Mama Sarah', text: 'Anyone going to the soft play area tomorrow morning?', time: '10:05 AM', isUser: false },
    { id: '2', author: 'Coach Mike', text: 'I’ll be there for the 10 AM session! 🏀', time: '10:12 AM', isUser: false },
    { id: '3', author: 'Mama Jamie', text: 'We might join! My little one loves the ball pit.', time: '10:15 AM', isUser: false },
  ]);

  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestionType, setSuggestionType] = useState<'game' | 'music' | 'video' | 'product' | 'other'>('game');
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionStatus, setSuggestionStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [newChatMessage, setNewChatMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const themedDays = [
    { day: "MON", label: "MCM", theme: "Mom Crush Monday" },
    { day: "TUE", label: "Joke", theme: "Meme Tuesday" },
    { day: "WED", label: "QA", theme: "Inspiration Q&A" },
    { day: "THU", label: "Hack", theme: "Life Hack Thursday" },
    { day: "FRI", label: "FCM", theme: "Father Crush Friday" },
  ];

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: "You",
      time: "Just now",
      content: newPost,
      likes: 0,
      comments: 0,
      commentsList: [],
      isUser: true
    };
    setPosts([post, ...posts]);
    setNewPost('');
    setIsPosting(false);
  };

  const handleSendChatMessage = () => {
    if (!newChatMessage.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      author: 'You',
      text: newChatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    setChatMessages([...chatMessages, msg]);
    setNewChatMessage('');
  };

  const handleAddComment = (postId: string, commentText: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          author: 'You',
          text: commentText,
          time: 'Just now'
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...post.commentsList, newComment]
        };
      }
      return post;
    }));
  };

  const submitSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestionText.trim()) return;
    
    setSuggestionStatus('submitting');
    setTimeout(() => {
      setSuggestionStatus('success');
      setSuggestionText('');
      setTimeout(() => {
        setSuggestionStatus('idle');
        setShowSuggestionForm(false);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="pb-40 animate-in slide-in-from-bottom duration-300 bg-[#FFF9F5]">
      <header className="p-6 bg-white border-b border-pink-50 flex justify-between items-center sticky top-0 z-30">
        <h1 className="text-2xl font-bold text-gray-800">Community</h1>
        <div className="flex gap-2">
           <button 
            onClick={() => setShowSuggestionForm(true)}
            className="bg-orange-100 text-orange-600 p-2 rounded-full shadow-sm hover:bg-orange-200 transition-colors"
          >
            <Lightbulb size={24} />
          </button>
          <button 
            onClick={() => setIsPosting(!isPosting)}
            className={`transition-transform duration-300 rounded-full p-2 shadow-lg ${isPosting ? 'bg-gray-100 text-gray-400 rotate-45' : 'bg-pink-500 text-white'}`}
          >
            <Plus size={24} />
          </button>
        </div>
      </header>

      {/* Predator Protection Banner */}
      <div className="bg-green-50 px-6 py-2 border-b border-green-100 flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-green-500" />
        <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Active Predator Protection Enabled</span>
      </div>

      {/* Suggestion Modal */}
      {showSuggestionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-orange-500 p-6 text-white relative">
              <button onClick={() => setShowSuggestionForm(false)} className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors">
                <X size={16} />
              </button>
              <Lightbulb size={32} className="mb-2" />
              <h2 className="text-xl font-bold">Suggestion Box</h2>
              <p className="text-orange-100 text-xs mt-1">What would you & your little kitten like to see next? 🐾</p>
            </div>

            <div className="p-6">
              {suggestionStatus === 'success' ? (
                <div className="text-center py-8 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Purr-fect Suggestion!</h3>
                  <p className="text-sm text-gray-500 mt-2">Kittie Admin is reviewing it now. Thank you for making our corner better!</p>
                </div>
              ) : (
                <form onSubmit={submitSuggestion} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['game', 'music', 'video', 'product', 'other'] as const).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSuggestionType(type)}
                          className={`py-2 text-[10px] font-bold rounded-xl border transition-all ${
                            suggestionType === type 
                              ? 'bg-orange-500 border-orange-500 text-white shadow-md' 
                              : 'bg-gray-50 border-gray-100 text-gray-500'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Your Idea</label>
                    <textarea
                      placeholder="Share your thoughts..."
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-200 min-h-[100px] resize-none"
                      value={suggestionText}
                      onChange={(e) => setSuggestionText(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={suggestionStatus === 'submitting'}
                    className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {suggestionStatus === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Send to Admin 🐾</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post/Chat Input Area */}
      {isPosting && (
        <div className="px-6 py-4 bg-white border-b border-pink-50 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            <textarea
              placeholder="What's on your mind, Mama?"
              className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-pink-200 text-sm resize-none h-24 font-medium text-gray-700"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex justify-end">
              <button 
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="bg-pink-500 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-md shadow-pink-100"
              >
                <Send size={16} /> Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Themed Days Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto px-6 py-4 no-scrollbar">
        {themedDays.map((day) => (
          <div key={day.day} className="flex-shrink-0 flex flex-col items-center bg-white border border-pink-50 p-3 rounded-2xl shadow-sm min-w-[100px]">
            <span className="text-[10px] font-bold text-pink-500 mb-1">{day.day}</span>
            <span className="text-sm font-bold text-gray-800">{day.label}</span>
            <span className="text-[8px] text-gray-400 mt-1 uppercase text-center font-bold tracking-tighter">{day.theme}</span>
          </div>
        ))}
      </div>

      {/* Social Feed Section */}
      <div className="px-6 space-y-6 mt-2">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 px-1">
          <span className="w-2 h-6 bg-pink-500 rounded-full"></span>
          Family Feed
        </h2>
        
        {!isPosting && (
          <button 
            onClick={() => setIsPosting(true)}
            className="w-full bg-white border border-dashed border-pink-200 p-4 rounded-2xl text-pink-400 text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Plus size={16} /> Share a thought or ask a question...
          </button>
        )}

        {posts.map(post => (
          <PostCard 
            key={post.id}
            post={post}
            onAddComment={(text) => handleAddComment(post.id, text)}
          />
        ))}
      </div>

      {/* Chatroom Section */}
      <div className="mt-12 px-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 px-1 mb-4">
          <span className="w-2 h-6 bg-blue-400 rounded-full"></span>
          Kittie Chatroom
          <span className="ml-auto text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">AI Moderated</span>
        </h2>
        
        <div className="bg-white rounded-[2rem] border border-blue-50 shadow-sm overflow-hidden flex flex-col h-[400px]">
          {/* Internal Safety Banner */}
          <div className="bg-blue-50 p-2 flex items-center justify-center gap-2 border-b border-blue-100">
             <ShieldCheck size={12} className="text-blue-500" />
             <span className="text-[9px] font-bold text-blue-700 uppercase">Your messages are being protected by Kittie's AI Shaperone</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
                {!msg.isUser && <span className="text-[10px] font-bold text-gray-400 ml-2 mb-1">{msg.author}</span>}
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${
                  msg.isUser 
                    ? 'bg-blue-500 text-white rounded-tr-none shadow-md shadow-blue-100' 
                    : 'bg-gray-100 text-gray-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[8px] text-gray-300 mt-1 mx-2 uppercase">{msg.time}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
            <button className="text-gray-400 p-1 hover:text-blue-500">
              <Smile size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Send a kind message..." 
              className="flex-1 bg-white border-none focus:ring-1 focus:ring-blue-300 rounded-full px-4 py-2 text-xs font-medium text-gray-700 shadow-inner"
              value={newChatMessage}
              onChange={(e) => setNewChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
            />
            <button 
              onClick={handleSendChatMessage}
              disabled={!newChatMessage.trim()}
              className="bg-blue-500 text-white p-2 rounded-full shadow-lg shadow-blue-100 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PostCardProps {
  post: Post;
  onAddComment: (text: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const submitComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div className={`bg-white rounded-3xl overflow-hidden border ${post.isUser ? 'border-pink-200 ring-2 ring-pink-50 ring-offset-0' : 'border-pink-50'} shadow-sm animate-in zoom-in-95 duration-300`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${post.isUser ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'} rounded-full flex items-center justify-center text-sm font-bold`}>
            {post.isUser ? 'ME' : '🐱'}
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">{post.author}</h4>
            <p className="text-[10px] text-gray-400 font-medium">{post.time}</p>
          </div>
        </div>
        <button className="text-gray-300 hover:text-gray-500">•••</button>
      </div>
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-600 leading-relaxed font-medium">{post.content}</p>
      </div>
      {post.image && (
        <div className="h-60 bg-gray-100 relative">
          <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
        </div>
      )}
      
      {/* Interaction Buttons */}
      <div className="p-4 flex items-center gap-6 border-t border-gray-50">
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-pink-500 text-xs font-bold transition-colors">
          <Heart size={18} /> {post.likes}
        </button>
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 text-xs font-bold transition-colors">
          <MessageCircle size={18} /> {post.comments}
        </button>
        <button className="ml-auto text-gray-400 hover:text-gray-600">
          <Share2 size={18} />
        </button>
      </div>

      {/* Existing Comments List */}
      {post.commentsList.length > 0 && (
        <div className="px-4 pb-2 space-y-2 bg-gray-50/50 py-2 border-t border-gray-50">
          {post.commentsList.map(comment => (
            <div key={comment.id} className="text-[11px] leading-snug">
              <span className="font-bold text-gray-800 mr-2">{comment.author}</span>
              <span className="text-gray-600">{comment.text}</span>
              <span className="text-gray-400 ml-2 text-[9px]">{comment.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* New Comment Input Section */}
      <div className="p-3 bg-gray-50 flex items-center gap-2 border-t border-gray-100">
        <input 
          type="text"
          placeholder="Write a comment..."
          className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-300 font-medium text-gray-700"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && submitComment()}
        />
        <button 
          onClick={submitComment}
          disabled={!commentText.trim()}
          className="text-pink-500 font-bold text-[11px] uppercase tracking-wider px-2 py-1 disabled:opacity-40 transition-opacity"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default Community;
