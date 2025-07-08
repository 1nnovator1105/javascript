import React from "react";

interface StudyPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  maxWidth?: "normal" | "wide" | "full";
}

const StudyPageLayout: React.FC<StudyPageLayoutProps> = ({
  title,
  subtitle,
  children,
  maxWidth = "normal",
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "wide":
        return "max-w-6xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-4xl";
    }
  };

  return (
    <main className="font-sans min-h-screen mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-6 max-w-full">
      <div
        className={`bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl md:rounded-2xl p-5 md:p-8 ${getMaxWidthClass()} mx-auto`}
      >
        <div className="text-center mb-8">
          <h1 className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl md:text-3xl">
            {title}
          </h1>
          <p className="text-gray-500 font-normal m-0 text-sm md:text-base">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </main>
  );
};

export default StudyPageLayout;
