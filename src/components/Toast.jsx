import { useEffect } from 'react';
import '../styles/Toast.css';

function Toast({ message, visible, onClose, duration = 2000 }) {
  useEffect(() => {
    if (!visible || !message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, message, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default Toast;
