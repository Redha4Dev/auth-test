import { useState, useEffect } from 'react';

export default function KindergartenModel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full h-screen transition-all duration-1000 transform ${
      isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    }`}>
      <iframe
        title="3D Kindergarten Model"
        className="w-full h-full pointer-events-none"
        frameBorder="0"
        allowFullScreen
        // mozAllowFullScreen="true"
        webkitAllowFullScreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        src="https://sketchfab.com/models/960054bcc67c445e89bab025222c777c/embed?autostart=1&autospin=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_controls=0&preload=1"
      />
    </div>
  );
}