
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, X, Plus, Image, Camera, ChevronDown } from 'lucide-react';

// Models
class Post {
  constructor(id, content, imageUrl, categoryId, likes = 0, comments = []) {
    this.id = id;
    this.content = content;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.likes = likes;
    this.comments = comments;
    this.timestamp = new Date();
  }
}

class Category {
  constructor(id, name, description, icon) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
  }
}

class Comment {
  constructor(id, postId, content, author) {
    this.id = id;
    this.postId = postId;
    this.content = content;
    this.author = author;
    this.timestamp = new Date();
  }
}

// Controllers
class PostController {
  constructor() {
    this.posts = [
      new Post(1, "Beautiful sunset at the beach!", "/api/placeholder/400/400", 1, 42, [
        new Comment(1, 1, "Amazing shot!", "John"),
        new Comment(2, 1, "Love this!", "Sarah")
      ]),
      new Post(2, "Coffee and code 💻☕", "/api/placeholder/400/400", 2, 18, [])
    ];
  }

  createPost(postData) {
    const newPost = new Post(
      Date.now(),
      postData.content,
      postData.imageUrl,
      postData.categoryId
    );
    this.posts.unshift(newPost);
    return newPost;
  }

  getPostById(id) {
    return this.posts.find(post => post.id === id);
  }

  updatePost(id, updates) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
      this.posts[postIndex] = { ...this.posts[postIndex], ...updates };
      return this.posts[postIndex];
    }
    return null;
  }

  deletePost(id) {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  getFeed() {
    return this.posts.sort((a, b) => b.timestamp - a.timestamp);
  }

  getPostsByCategory(categoryId) {
    return this.posts.filter(post => post.categoryId === categoryId);
  }

  likePost(id) {
    const post = this.getPostById(id);
    if (post) {
      post.likes += 1;
      return post;
    }
  }
}

class CategoryController {
  constructor() {
    this.categories = [
      new Category(1, "Nature", "Photos of nature and outdoors", "🌿"),
      new Category(2, "Tech", "Technology and programming", "💻"),
      new Category(3, "Food", "Delicious food and recipes", "🍕"),
      new Category(4, "Travel", "Travel experiences and places", "✈️"),
    ];
  }

  createCategory(categoryData) {
    const newCategory = new Category(
      Date.now(),
      categoryData.name,
      categoryData.description,
      categoryData.icon
    );
    this.categories.push(newCategory);
    return newCategory;
  }

  getAllCategories() {
    return this.categories;
  }

  getCategoryById(id) {
    return this.categories.find(category => category.id === id);
  }

  updateCategory(id, updates) {
    const categoryIndex = this.categories.findIndex(category => category.id === id);
    if (categoryIndex !== -1) {
      this.categories[categoryIndex] = { ...this.categories[categoryIndex], ...updates };
      return this.categories[categoryIndex];
    }
    return null;
  }

  deleteCategory(id) {
    this.categories = this.categories.filter(category => category.id !== id);
  }
}

// Modal Manager
class ModalManager {
  constructor() {
    this.activeModals = new Set();
  }

  openModal(modalId) {
    this.activeModals.add(modalId);
    document.body.style.overflow = 'hidden';
  }

  closeModal(modalId) {
    this.activeModals.delete(modalId);
    if (this.activeModals.size === 0) {
      document.body.style.overflow = 'auto';
    }
  }

  isModalOpen(modalId) {
    return this.activeModals.has(modalId);
  }

  closeAllModals() {
    this.activeModals.clear();
    document.body.style.overflow = 'auto';
  }
}

// Modal Components
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const PostCreationModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content || !selectedCategory) return;

    setIsSubmitting(true);
    await onSubmit({
      content,
      imageUrl: imageUrl || '/api/placeholder/400/400',
      categoryId: parseInt(selectedCategory)
    });
    setIsSubmitting(false);
    
    // Reset form
    setContent('');
    setImageUrl('');
    setSelectedCategory('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Post">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <div className="relative">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL here"
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-3">
              <Image className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content || !selectedCategory}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Share'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
    //       <div className="relative">
    //         <input
    //           type="text"
    //           value={imageUrl}
    //           onChange={(e) => setImageUrl(e.target.value)}
    //           placeholder="Paste image URL here"
    //           className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    //         />
    //         <div className="absolute right-3 top-3">
    //           <Image className="w-5 h-5 text-gray-400" />
    //         </div>
    //       </div>
    //     </div>

    //     <div>
    //       <label className="block text-sm font-medium text-gray-700 mb-2">
    //         Category
    //       </label>
    //       <div className="relative">
    //         <select
    //           value={selectedCategory}
    //           onChange={(e) => setSelectedCategory(e.target.value)}
    //           className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
    //           required
    //         >
    //           <option value="">Select a category</option>
    //           {categories.map(category => (
    //             <option key={category.id} value={category.id}>
    //               {category.icon} {category.name}
    //             </option>
    //           ))}
    //         </select>
    //         <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
    //       </div>
    //     </div>

    //     <div className="flex space-x-3 pt-4">
    //       <button
    //         type="button"
    //         onClick={onClose}
    //         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="submit"
    //         disabled={isSubmitting || !content || !selectedCategory}
    //         className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    //       >
    //         {isSubmitting ? 'Posting...' : 'Share'}
    //       </button>
    //     </div>
    //   </form>
    // </Modal>
  // );
// };

// Post Component
const PostCard = ({ post, category, onLike }) => {
  const handleLike = () => {
    onLike(post.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{category?.icon}</span>
            <span className="font-medium text-gray-800">{category?.name}</span>
          </div>
          <span className="text-sm text-gray-500">
            {post.timestamp.toLocaleDateString()}
          </span>
        </div>
      </div>

      {post.imageUrl && (
        <img 
          src={post.imageUrl} 
          alt="Post" 
          className="w-full h-80 object-cover"
        />
      )}

      <div className="p-4">
        <p className="text-gray-800 mb-3">{post.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-full"
            >
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-full">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
            <Share className="w-5 h-5" />
          </button>
        </div>

        {post.comments.length > 0 && (
          <div className="mt-4 space-y-2">
            {post.comments.slice(0, 2).map(comment => (
              <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-500">
                    {comment.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const InstagramApp = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalManager] = useState(new ModalManager());
  const [postController] = useState(new PostController());
  const [categoryController] = useState(new CategoryController());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Initialize data
    setPosts(postController.getFeed());
    setCategories(categoryController.getAllCategories());
  }, []);

  const handleCreatePost = (postData) => {
    const newPost = postController.createPost(postData);
    setPosts(postController.getFeed());
  };

  const handleLikePost = (postId) => {
    postController.likePost(postId);
    setPosts(postController.getFeed());
  };

  const handleCategoryFilter = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setPosts(postController.getFeed());
    } else {
      setSelectedCategory(categoryId);
      setPosts(postController.getPostsByCategory(categoryId));
    }
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    modalManager.openModal('create-post');
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    modalManager.closeModal('create-post');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">InstaClone</h1>
            <button
              onClick={openCreateModal}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => handleCategoryFilter(null)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Create your first post!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              category={categories.find(cat => cat.id === post.categoryId)}
              onLike={handleLikePost}
            />
          ))
        )}
      </div>

      {/* Create Post Modal */}
      <PostCreationModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreatePost}
        categories={categories}
      />
    </div>
  );
};

export default InstagramApp;