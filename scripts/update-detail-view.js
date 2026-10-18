const fs = require('fs');

const filePath = 'src/components/views/DomainsView.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const detailStartMarker = '        ) : (\n          /* Detail View */';
const detailEndMarker = '        )}\n      </div>\n    </div>\n  );\n};';

const newDetailView = `        ) : (
          /* Detail View: Compact, Harmonious, Optimized Layout without Excess Whitespace */
          <div
            style={{ borderRadius: '22px' }}
            className={\`w-full p-4 sm:p-5 border \${selectedDomain.colorTheme.border} shadow-2xl flex flex-col gap-3.5 relative overflow-hidden text-left glass-panel bg-white/95 backdrop-blur-2xl\`}
          >
            {/* 1. Header Bar: Compact & Integrated */}
            <div className="w-full flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80">
              <div
                className="flex items-center gap-2.5 min-w-0"
                style={{ color: getCardVisualConfig(selectedDomain.id).accentColor }}
              >
                <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center shrink-0">
                  {getDomainBadgeIcon(selectedDomain.id)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
                      Lĩnh vực #{selectedDomain.code}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold tracking-tight font-play text-slate-900 truncate">
                      {selectedDomain.titleVi}
                    </h3>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDomain(null)}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-300 hover:border-rose-300 text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Quay lại danh sách lĩnh vực"
              >
                <svg className="w-3.5 h-3.5 stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Đóng chi tiết</span>
              </button>
            </div>

            {/* 2. Main Content Grid: Balanced 12-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              
              {/* Left Column (5 cols): Hero Pastel Card with 3D Illustration + Experience & Vision */}
              <div
                style={{ background: getCardVisualConfig(selectedDomain.id).cardBg }}
                className={\`theme-pastel-card lg:col-span-5 p-4 rounded-2xl border \${selectedDomain.colorTheme.border} flex flex-col justify-between gap-3 shadow-xs relative overflow-hidden\`}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span
                      className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold shadow-2xs border \${selectedDomain.colorTheme.badgeBg} \${selectedDomain.colorTheme.badgeText}\`}
                    >
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      <span>{selectedDomain.experienceVi}</span>
                    </span>
                    <h4
                      className="text-base sm:text-lg font-black tracking-tight leading-tight font-play"
                      style={{ color: getCardVisualConfig(selectedDomain.id).accentColor }}
                    >
                      {selectedDomain.titleVi}
                    </h4>
                  </div>
                  <div className="w-24 h-24 shrink-0 flex items-center justify-center">
                    {renderCard3DIllustration(selectedDomain.id)}
                  </div>
                </div>

                {/* Vision Box */}
                <div className="p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-wider" style={{ color: getCardVisualConfig(selectedDomain.id).accentColor }}>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                    </svg>
                    <span>TẦM NHÌN & ĐỊNH HƯỚNG VẬN HÀNH</span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug">
                    {selectedDomain.orientationVi}
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Operational Key Specs (3 Cards) + Narrative Overview */}
              <div className="lg:col-span-7 flex flex-col gap-3 justify-between">
                
                {/* 3 Metric Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Role Card */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50/90 via-white/90 to-sky-50/90 border border-sky-200/80 shadow-2xs flex flex-col justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-sky-700">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>VAI TRÒ VẬN HÀNH</span>
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-bold text-slate-800 leading-tight block">
                      {selectedDomain.roleVi}
                    </span>
                  </div>

                  {/* Team Size Card */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-white/90 to-teal-50/90 border border-emerald-200/80 shadow-2xs flex flex-col justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-emerald-700">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>QUY MÔ ĐỘI NGŨ</span>
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-bold text-slate-800 leading-tight block">
                      {selectedDomain.teamSizeVi}
                    </span>
                  </div>

                  {/* Technology Tools Card */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-50/90 via-white/90 to-fuchsia-50/90 border border-purple-200/80 shadow-2xs flex flex-col justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-purple-700">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>CÔNG NGHỆ & HỆ THỐNG</span>
                    </div>
                    <span className="text-xs sm:text-[11.5px] font-bold font-mono text-purple-900 leading-tight block">
                      {selectedDomain.toolsVi}
                    </span>
                  </div>
                </div>

                {/* Narrative Description Card */}
                <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs flex-1 flex flex-col justify-center gap-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-wider text-indigo-700">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span>MÔ TẢ CHI TIẾT NĂNG LỰC & KINH NGHIỆM</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                    {selectedDomain.descVi}
                  </p>
                </div>
              </div>

              {/* Bottom Left (7 cols): Key Accomplishments & Highlights */}
              <div className="lg:col-span-7 p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-emerald-700">
                  <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                  <span>KẾT QUẢ & THÀNH TỰU NỔI BẬT ĐÃ ĐẠT ĐƯỢC</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDomain.highlightsVi.map((item, idx) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 flex items-start gap-2 text-xs font-semibold text-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Right (5 cols): Brands & Partner Ecosystem */}
              <div className="lg:col-span-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-50/90 via-white/95 to-sky-50/80 border border-slate-200/80 shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black tracking-wider text-slate-500 uppercase block">
                      ĐỐI TÁC & THƯƠNG HIỆU
                    </span>
                    <span className="text-xs font-bold text-slate-800 font-play">
                      {selectedDomain.partnersVi}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-200/60">
                  {selectedDomain.logos.map((logo) => (
                    <div
                      key={logo.name}
                      className="h-8 px-2.5 rounded-full bg-white flex items-center gap-1.5 shadow-2xs border border-slate-200 hover:border-sky-300 transition-colors"
                      title={logo.name}
                    >
                      <img src={logo.src} alt={logo.alt} className="w-4 h-4 object-contain rounded-full shrink-0" loading="lazy" />
                      <span className="text-[11px] font-extrabold text-slate-700">{logo.alt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
`;

const startIndex = content.indexOf(detailStartMarker);
if (startIndex !== -1) {
  content = content.substring(0, startIndex) + newDetailView;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated DomainsView.tsx Detail View!');
} else {
  console.error('Could not find detailStartMarker!');
}
