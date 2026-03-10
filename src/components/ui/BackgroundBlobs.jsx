import React from "react";

const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-accent-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-accent-indigo rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob [animation-delay:2s]" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob [animation-delay:4s]" />
    </div>
  );
};

export default BackgroundBlobs;
