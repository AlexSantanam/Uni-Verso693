with open('src/components/MultiDeviceMockup.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

target = '''            {/* 1. DESKTOP / iMAC MONITOR (DOMINANTE, CENTRO-IZQUIERDA) */}
            <div className="w-[66%] sm:w-[68%] lg:w-[70%] z-10 flex flex-col items-center">
              {/* Monitor Screen Frame */}
              <div className="w-full bg-[#1A1A1A] rounded-[18px] sm:rounded-[22px] p-2 sm:p-3 pb-0 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-stone-800 relative">
                {/* Top Bezel Camera */}
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mx-auto mb-1.5 ring-1 ring-white/10" />

                {/* Desktop Display Surface */}
                <div
                  ref={desktopRef}
                  className="w-full aspect-[16/10] bg-stone-900 rounded-t-lg sm:rounded-t-xl overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Desktop`}
                    className={`w-[1280px] h-[800px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.desktop})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center group"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
                        Clic para interactuar
                      </div>
                    </div>
                  )}
                </div>

                {/* iMac Lower Aluminum Chin Bar with subtle branding */}
                <div className="h-6 sm:h-9 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-b-lg sm:rounded-b-xl flex items-center justify-center border-t border-white/60 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-500/60 shadow-sm" />
                </div>
              </div>

              {/* iMac Tapered Metallic Stand */}
              <div className="w-16 sm:w-24 h-7 sm:h-11 bg-gradient-to-b from-[#CBD5E1] via-[#94A3B8] to-[#64748B] shadow-inner" style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} />
              {/* Stand Base Plate */}
              <div className="w-36 sm:w-52 h-2 sm:h-2.5 bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#94A3B8] rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.35)]" />
              {/* Soft studio contact shadow on floor */}
              <div className="w-48 sm:w-72 h-3 bg-black/25 blur-md rounded-full mt-1" />
            </div>

            {/* 2. TABLET / iPAD (DE PIE A LA DERECHA, TRASLAPADO) */}
            <div className="absolute right-[5%] sm:right-[7%] lg:right-[10%] bottom-6 sm:bottom-8 w-[28%] sm:w-[27%] lg:w-[25%] z-20 flex flex-col items-center">
              <div className="w-full bg-[#18181B] rounded-[18px] sm:rounded-[24px] p-2 sm:p-2.5 shadow-[0_25px_50px_rgba(0,0,0,0.35)] border border-stone-700/80 ring-1 ring-white/10 relative">
                {/* Tablet Top Camera */}
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mx-auto mb-1 ring-1 ring-white/10" />

                {/* Tablet Screen Surface */}
                <div
                  ref={tabletRef}
                  className="w-full aspect-[3/4] bg-stone-900 rounded-[12px] sm:rounded-[16px] overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Tablet`}
                    className={`w-[768px] h-[1024px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.tablet})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors"
                    />
                  )}
                </div>
              </div>
              {/* Tablet Base Shadow */}
              <div className="w-full h-3 bg-black/35 blur-md rounded-full mt-1" />
            </div>

            {/* 3. SMARTPHONE / iPHONE (EN PRIMER PLANO AL FRENTE DE LA TABLET) */}
            <div className="absolute right-[0%] sm:right-[1%] lg:right-[3%] bottom-0 w-[19%] sm:w-[18%] lg:w-[17%] min-w-[95px] max-w-[170px] z-30 flex flex-col items-center">
              <div className="w-full bg-[#0A0A0A] rounded-[22px] sm:rounded-[32px] p-1.5 sm:p-2 shadow-[0_30px_60px_rgba(0,0,0,0.45)] border-2 border-stone-700 ring-1 ring-white/20 relative">
                {/* iPhone Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-2 sm:h-2.5 bg-black rounded-full z-40 border border-stone-800" />

                {/* Phone Screen Surface */}
                <div
                  ref={phoneRef}
                  className="w-full aspect-[9/19.5] bg-stone-900 rounded-[16px] sm:rounded-[24px] overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Móvil`}
                    className={`w-[375px] h-[812px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.phone})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors"
                    />
                  )}

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 sm:w-14 h-0.5 sm:h-1 bg-white/40 rounded-full z-40 pointer-events-none" />
                </div>
              </div>
              {/* Phone Base Shadow */}
              <div className="w-full h-3.5 bg-black/45 blur-md rounded-full mt-1" />
            </div>'''

replacement = '''            {/* 1. DESKTOP / iMAC MONITOR (IZQUIERDA - BIEN SEPARADO) */}
            <div className="w-[58%] sm:w-[60%] lg:w-[62%] mr-auto z-10 flex flex-col items-center">
              {/* Monitor Screen Frame */}
              <div className="w-full bg-[#1A1A1A] rounded-[18px] sm:rounded-[22px] p-2 sm:p-3 pb-0 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-stone-800 relative">
                {/* Top Bezel Camera */}
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mx-auto mb-1.5 ring-1 ring-white/10" />

                {/* Desktop Display Surface */}
                <div
                  ref={desktopRef}
                  className="w-full aspect-[16/10] bg-stone-900 rounded-t-lg sm:rounded-t-xl overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Desktop`}
                    className={`w-[1280px] h-[800px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.desktop})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center group"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
                        Clic para interactuar
                      </div>
                    </div>
                  )}
                </div>

                {/* iMac Lower Aluminum Chin Bar with subtle branding */}
                <div className="h-6 sm:h-9 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-b-lg sm:rounded-b-xl flex items-center justify-center border-t border-white/60 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-500/60 shadow-sm" />
                </div>
              </div>

              {/* iMac Tapered Metallic Stand */}
              <div className="w-16 sm:w-24 h-6 sm:h-10 bg-gradient-to-b from-[#CBD5E1] via-[#94A3B8] to-[#64748B] shadow-inner" style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} />
              {/* Stand Base Plate */}
              <div className="w-32 sm:w-48 h-2 sm:h-2.5 bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#94A3B8] rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.35)]" />

              {/* Desk Accessories: Magic Keyboard & Mouse (Idéntico a la referencia) */}
              <div className="flex items-center justify-center gap-2.5 mt-1.5 z-20">
                <div className="w-32 sm:w-48 h-2 sm:h-3 bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0] border border-stone-300 rounded-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.08)] flex items-center px-1">
                  <div className="w-full h-0.5 sm:h-1 bg-stone-300/40 rounded-sm" />
                </div>
                <div className="w-3.5 sm:w-5 h-5 sm:h-7 bg-gradient-to-b from-white to-[#E2E8F0] border border-stone-300 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] relative">
                  <div className="w-0.5 h-1.5 bg-stone-300 mx-auto mt-0.5 rounded-full" />
                </div>
              </div>

              {/* Soft studio contact shadow on floor */}
              <div className="w-48 sm:w-72 h-3 bg-black/25 blur-md rounded-full mt-1" />
            </div>

            {/* 2. TABLET / iPAD (A LA DERECHA - COMPLETAMENTE DESPEJADA Y VISIBLE) */}
            <div className="absolute right-0 sm:right-1 lg:right-2 bottom-3 sm:bottom-5 w-[33%] sm:w-[32%] lg:w-[31%] z-20 flex flex-col items-center">
              <div className="w-full bg-[#18181B] rounded-[18px] sm:rounded-[26px] p-2 sm:p-2.5 shadow-[0_25px_50px_rgba(0,0,0,0.35)] border border-stone-700/80 ring-1 ring-white/10 relative">
                {/* Tablet Top Camera */}
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mx-auto mb-1 ring-1 ring-white/10" />

                {/* Tablet Screen Surface */}
                <div
                  ref={tabletRef}
                  className="w-full aspect-[3/4] bg-stone-900 rounded-[12px] sm:rounded-[18px] overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Tablet`}
                    className={`w-[768px] h-[1024px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.tablet})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors"
                    />
                  )}
                </div>
              </div>
              {/* Tablet Base Shadow */}
              <div className="w-full h-3 bg-black/35 blur-md rounded-full mt-1" />
            </div>

            {/* 3. SMARTPHONE / iPHONE (EN EL BORDE INFERIOR-IZQUIERDO DE LA TABLET, SIN TAPARLA) */}
            <div className="absolute right-[24%] sm:right-[24%] lg:right-[25%] bottom-0 w-[14%] sm:w-[13%] lg:w-[12%] min-w-[80px] max-w-[130px] z-30 flex flex-col items-center">
              <div className="w-full bg-[#0A0A0A] rounded-[18px] sm:rounded-[26px] p-1.5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-2 border-stone-700 ring-1 ring-white/20 relative">
                {/* iPhone Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 sm:w-9 h-1.5 sm:h-2 bg-black rounded-full z-40 border border-stone-800" />

                {/* Phone Screen Surface */}
                <div
                  ref={phoneRef}
                  className="w-full aspect-[9/19.5] bg-stone-900 rounded-[14px] sm:rounded-[20px] overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Móvil`}
                    className={`w-[375px] h-[812px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.phone})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors"
                    />
                  )}

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 sm:h-1 bg-white/40 rounded-full z-40 pointer-events-none" />
                </div>
              </div>
              {/* Phone Base Shadow */}
              <div className="w-full h-3 bg-black/45 blur-md rounded-full mt-1" />
            </div>'''

target_norm = target.replace('\r\n', '\n')
text_norm = text.replace('\r\n', '\n')

if target_norm in text_norm:
    text_fixed = text_norm.replace(target_norm, replacement, 1)
    with open('src/components/MultiDeviceMockup.tsx', 'w', encoding='utf-8') as f:
        f.write(text_fixed)
    print("MOCKUP SEPARATION UPDATED SUCCESSFULLY")
else:
    print("TARGET NOT FOUND")

