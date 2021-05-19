if (process.env.NODE_ENV === 'development') {
  module.exports = {
    'SERVER': process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
  };
} else {
  module.exports = {
    'SERVER': `${window.location.origin}/api`
  };
}
