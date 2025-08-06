import { cloneElement, type JSX, type ReactNode } from 'react';

const KPISection = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className="grid gap-6 mb-6"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      }}
    >
      {children}
    </section>
  );
};

const KPICard = ({ icon, title, value, theme = 'blue' }: { icon: JSX.Element, title: string, value: string, theme?: 'blue' | 'purple' | 'green' | 'yellow' }) => {
    // Mapeamento de temas para classes de cor do Tailwind CSS
    const themes = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
        green: { bg: 'bg-green-100', text: 'text-green-600' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    };

    const selectedTheme = themes[theme] || themes.blue;

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className={`rounded-full p-3 ${selectedTheme.bg}`}>
                {/* Clona o elemento do ícone para injetar as classes de cor e tamanho dinamicamente */}
                {cloneElement(icon, { className: `w-7 h-7 ${selectedTheme.text}` })}
            </div>
            <div>
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <p className="text-gray-900 text-2xl md:text-3xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export { KPISection, KPICard };