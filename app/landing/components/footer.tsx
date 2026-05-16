export default function Footer() {
  return (
    <footer className="w-full bg-[#F9F7F4] border-t border-[#E8E4DF] px-6 md:px-16 lg:px-20 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10 md:mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#2D6A4F] rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M13 2L4.09 12.11a1 1 0 0 0 .86 1.67L11 13l-2 9 8.91-10.11a1 1 0 0 0-.86-1.67L11 11l2-9z" />
                </svg>
              </div>
              <span className="text-[#1A1A2E] font-bold text-lg tracking-tight">
                Momentum
              </span>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Build habits that stick, one day at a time.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 md:gap-20">
            <div className="flex flex-col gap-3">
              <p className="text-[#1A1A2E] font-semibold text-sm mb-1">
                Product
              </p>
              <a href="#features" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Features</a>
              <a href="/dashboard" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Dashboard</a>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Pricing</a>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Changelog</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[#1A1A2E] font-semibold text-sm mb-1">
                Company
              </p>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">About</a>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Blog</a>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Careers</a>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[#1A1A2E] font-semibold text-sm mb-1">Legal</p>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Privacy</a>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Terms</a>
              <a href="#" className="text-[#6B7280] text-sm hover:text-[#2D6A4F] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-[#E8E4DF]">
          <p className="text-[#6B7280] text-sm">
            © 2026 Momentum. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
